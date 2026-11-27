import { Command } from "commander";
import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import ora from "ora";
import {
  OrbitTheme,
  orbitDark,
  orbitLight,
  generateThemeCSS,
  themeToCSS,
} from "../theme";
import { OrbitUIConfig, readConfig } from "../config";

export function themeCommand(): Command {
  return new Command("theme")
    .description("Manage and customize your Glass Orbit theme")
    .addCommand(
      new Command("generate")
        .description("Generate a new theme from prompts")
        .action(async () => {
          console.log(chalk.cyan("\n🎨 Create your custom Glass Orbit theme\n"));

          const answers = await inquirer.prompt([
            {
              type: "input",
              name: "themeName",
              message: "Theme name:",
              default: "my-custom-theme",
            },
            {
              type: "list",
              name: "baseTheme",
              message: "Base your theme on:",
              choices: [
                { name: "Glass Orbit Dark (dark with cyan-blue accents)", value: "dark" },
                { name: "Glass Orbit Light (light with blue accents)", value: "light" },
                { name: "From scratch", value: "scratch" },
              ],
            },
            {
              type: "input",
              name: "background",
              message: "Background color:",
              default: "#0a0a0f",
              when: (a) => a.baseTheme === "scratch",
            },
            {
              type: "input",
              name: "foreground",
              message: "Text color:",
              default: "#fafafa",
              when: (a) => a.baseTheme === "scratch",
            },
            {
              type: "input",
              name: "primary",
              message: "Primary / accent color:",
              default: "#3087ed",
            },
            {
              type: "input",
              name: "gradientColor",
              message: "Gradient glass color:",
              default: "#3087ed",
            },
            {
              type: "input",
              name: "gradientHighlight",
              message: "Gradient highlight (lighter):",
              default: "#3dc3fb",
            },
            {
              type: "input",
              name: "gradientShadow",
              message: "Gradient shadow (darker):",
              default: "#015ecb",
            },
            {
              type: "number",
              name: "gradientOpacity",
              message: "Gradient opacity (0-1):",
              default: 0.6,
            },
            {
              type: "number",
              name: "glowIntensity",
              message: "Glow intensity (0-1):",
              default: 0.3,
            },
            {
              type: "number",
              name: "highlightOpacity",
              message: "Top highlight opacity (0-1):",
              default: 0.08,
            },
            {
              type: "input",
              name: "borderRadius",
              message: "Border radius:",
              default: "0.75rem",
            },
          ]);

          // Build the theme
          const base: OrbitTheme = answers.baseTheme === "dark"
            ? { ...orbitDark }
            : answers.baseTheme === "light"
              ? { ...orbitLight }
              : { ...orbitDark, colors: { ...orbitDark.colors, background: answers.background || "#0a0a0f", foreground: answers.foreground || "#fafafa" } };

          base.name = answers.themeName;
          // The answers below set each color explicitly, so no brand derivation
          base.brand = undefined;
          base.colors.primary = answers.primary;
          base.colors.ring = answers.primary;
          base.gradient.gradient = answers.gradientColor;
          base.gradient["gradient-highlight"] = answers.gradientHighlight;
          base.gradient["gradient-shadow"] = answers.gradientShadow;
          base.gradient["gradient-opacity"] = answers.gradientOpacity;
          base.gradient["glow-intensity"] = answers.glowIntensity;
          base.depth["highlight-opacity"] = answers.highlightOpacity;
          base.radius = answers.borderRadius;

          // Save theme file
          const themePath = `glass-orbit-theme-${answers.themeName}.json`;
          await fs.writeJSON(themePath, base, { spaces: 2 });

          console.log(chalk.green(`\n✓ Theme saved to ${chalk.cyan(themePath)}`));
          console.log(chalk.gray("  Apply it with: ") + chalk.cyan(`npx glass-orbit theme apply ${themePath}`));
          console.log();
        })
    )
    .addCommand(
      new Command("apply")
        .description("Apply a custom theme file to your project")
        .argument("<theme-file>", "Path to theme JSON file")
        .action(async (themeFile: string) => {
          const spinner = ora("Applying theme...").start();

          try {
            // Load config
            let config: OrbitUIConfig;
            try {
              config = await readConfig();
            } catch {
              spinner.fail(chalk.red("Glass Orbit is not initialized."));
              console.log(chalk.gray("  Run ") + chalk.cyan("npx glass-orbit init") + chalk.gray(" first."));
              process.exit(1);
            }

            // Load theme
            // A theme file can be as small as { "brand": "#e11d48" }
            const theme: Partial<OrbitTheme> = await fs.readJSON(themeFile);
            // Without "brand", the file's own colors are used as written
            const darkTheme: OrbitTheme = { ...orbitDark, ...theme, brand: theme.brand } as OrbitTheme;
            // The brand color applies to light mode too
            const lightTheme: OrbitTheme = theme.brand
              ? { ...orbitLight, brand: theme.brand }
              : orbitLight;

            // Generate and write CSS
            const css = generateThemeCSS(darkTheme, lightTheme);
            const cssPath = config.tailwind.css;

            if (await fs.pathExists(cssPath)) {
              const existing = await fs.readFile(cssPath, "utf-8");
              // Replace existing theme block (also matches the old orbit-ui marker)
              // (comment lines, blank lines, then the :root and .dark blocks)
              const pattern = /\/\* (?:glass-orbit|orbit-ui) theme[^\n]*\*\/\n(?:\/\*[^\n]*\*\/\n|\s*\n)*:root\s*\{[^}]*\}\s*\.dark\s*\{[^}]*\}/;
              if (pattern.test(existing)) {
                const updated = existing.replace(pattern, css);
                await fs.writeFile(cssPath, updated);
              } else {
                await fs.appendFile(cssPath, `\n\n${css}`);
              }
            } else {
              await fs.ensureFile(cssPath);
              await fs.writeFile(cssPath, css);
            }

            spinner.succeed(chalk.green(`Theme "${theme.name ?? theme.brand ?? themeFile}" applied! 🎨`));
            console.log(chalk.gray(`  Updated: ${config.tailwind.css}`));
            console.log();
          } catch (err: any) {
            spinner.fail(chalk.red("Failed to apply theme"));
            console.error(err.message);
            process.exit(1);
          }
        })
    )
    .addCommand(
      new Command("show")
        .description("Show the current theme CSS variables")
        .action(async () => {
          try {
            const config = await readConfig();
            const cssPath = config.tailwind.css;
            const css = await fs.readFile(cssPath, "utf-8");

            // Extract orbit variables
            const varRegex = /--orbit-[^:]+:\s*[^;]+;/g;
            const vars = css.match(varRegex);

            if (vars) {
              console.log(chalk.cyan("\n🎨 Current Glass Orbit theme:\n"));
              for (const v of vars) {
                const [name, value] = v.split(":").map((s) => s.trim().replace(";", ""));
                console.log(`  ${chalk.bold(name)}: ${chalk.hex(value?.replace("#", "") || "ffffff")(value || "")} ${chalk.gray(value)}`);
              }
              console.log();
            } else {
              console.log(chalk.yellow("No Glass Orbit theme variables found."));
            }
          } catch {
            console.error(chalk.red("Glass Orbit is not initialized."));
          }
        })
    );
}
