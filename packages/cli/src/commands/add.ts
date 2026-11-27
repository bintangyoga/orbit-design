import { Command } from "commander";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import { OrbitUIConfig, readConfig } from "../config";
import { RegistryItem, resolveDependencies } from "../registry";
import { getRegistry } from "../registry/fetch";
import { detectPackageManager, installDeps } from "../utils/package-manager";

export function addCommand(): Command {
  return new Command("add")
    .description("Add a component to your project")
    .argument("[components...]", "component names to add")
    .option("-a, --all", "Add all available components")
    .option("-o, --overwrite", "Overwrite existing files")
    .action(async (componentNames: string[], options) => {
      let config: OrbitUIConfig;
      try {
        config = await readConfig();
      } catch {
        console.error(chalk.red("\n  Glass Orbit is not initialized."));
        console.log(chalk.gray("  Run ") + chalk.cyan("npx glass-orbit init") + chalk.gray(" first.\n"));
        process.exit(1);
      }

      const pm = detectPackageManager();
      const spinner = ora("Loading registry...").start();

      try {
        const registry = await getRegistry();

        let targets: string[];

        if (options.all) {
          targets = Array.from(registry.keys());
        } else if (componentNames.length > 0) {
          targets = componentNames;
        } else {
          spinner.stop();
          const available = Array.from(registry.keys());
          const { selected } = await import("inquirer").then((m) =>
            m.default.prompt([
              {
                type: "checkbox",
                name: "selected",
                message: "Which components do you want to add?",
                choices: available.map((name) => {
                  const item = registry.get(name)!;
                  return {
                    name: `${name} ${chalk.gray(`— ${item.type}`)}`,
                    value: name,
                  };
                }),
              },
            ])
          );
          targets = selected;
        }

        if (targets.length === 0) {
          spinner.info("No components selected.");
          return;
        }

        const resolved = new Set<string>();
        const allItems: RegistryItem[] = [];

        for (const name of targets) {
          if (!registry.has(name)) {
            spinner.warn(chalk.yellow(`Component "${name}" not found. Skipping.`));
            continue;
          }
          allItems.push(...resolveDependencies(name, registry, resolved));
        }

        const componentsDir = resolveAliasDir(config.aliases.components);
        const utilsDir = resolveAliasDir(config.aliases.utils);

        const allDeps: string[] = [];

        for (const item of allItems) {
          spinner.text = `Adding ${chalk.cyan(item.name)}...`;

          for (const file of item.files) {
            const targetPath = path.join(
              file.type === "registry:lib" || file.type === "registry:style"
                ? utilsDir
                : componentsDir,
              file.path
            );

            if ((await fs.pathExists(targetPath)) && !options.overwrite) {
              const { overwrite } = await import("inquirer").then((m) =>
                m.default.prompt([
                  {
                    type: "confirm",
                    name: "overwrite",
                    message: `${targetPath} already exists. Overwrite?`,
                    default: false,
                  },
                ])
              );
              if (!overwrite) {
                spinner.info(`Skipped ${chalk.gray(targetPath)}`);
                continue;
              }
            }

            await fs.ensureDir(path.dirname(targetPath));
            await fs.writeFile(targetPath, file.content);
          }

          if (item.tailwind?.css) {
            const added = await appendCss(config.tailwind.css, item.tailwind.css);
            if (added) spinner.info(`Added ${chalk.cyan(item.name)} styles to ${chalk.cyan(config.tailwind.css)}`);
          }

          if (item.dependencies && item.dependencies.length > 0) {
            allDeps.push(...item.dependencies);
          }
        }

        // Install all deps at once
        if (allDeps.length > 0) {
          const uniqueDeps = [...new Set(allDeps)];
          spinner.text = `Installing dependencies with ${chalk.cyan(pm)}: ${chalk.gray(uniqueDeps.join(", "))}`;
          installDeps(uniqueDeps);
        }

        spinner.succeed(
          chalk.green(`Added ${allItems.length} component(s)! ✨`)
        );

        for (const item of allItems) {
          console.log(chalk.gray(`  ✓ ${item.name}`));
        }
        console.log();
      } catch (err: any) {
        spinner.fail(chalk.red("Failed to add components"));
        console.error(err.message);
        process.exit(1);
      }
    });
}

/**
 * Appends a registry CSS block to the user's global CSS, once.
 * The block's first line is its marker comment, used to detect it later.
 */
async function appendCss(cssPath: string, css: string): Promise<boolean> {
  const marker = css.trimStart().split("\n")[0].trim();
  const existing = (await fs.pathExists(cssPath)) ? await fs.readFile(cssPath, "utf-8") : "";
  if (marker && existing.includes(marker)) return false;
  await fs.ensureFile(cssPath);
  await fs.appendFile(cssPath, `${existing.length ? "\n\n" : ""}${css.trim()}\n`);
  return true;
}

function resolveAliasDir(alias: string): string {
  const aliasPath = alias.replace(/^@\//, "src/");
  return path.resolve(process.cwd(), aliasPath);
}
