import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { getPageMeta } from "@/site";
import Home from "@/pages/home";
import Introduction from "@/pages/docs/introduction";
import Installation from "@/pages/docs/installation";
import Theming from "@/pages/docs/theming";
import ButtonPage from "@/pages/docs/components/button";
import ResponsiveSheetPage from "@/pages/docs/components/responsive-sheet";
import BadgePage from "@/pages/docs/components/badge";
import CardPage from "@/pages/docs/components/card";
import DialogPage from "@/pages/docs/components/dialog";
import DropdownMenuPage from "@/pages/docs/components/dropdown-menu";
import InputPage from "@/pages/docs/components/input";
import TabsPage from "@/pages/docs/components/tabs";
import NotFound from "@/pages/not-found";

/** Keeps the tab title right during client-side use (prerendered pages already have it). */
function TitleSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = getPageMeta(pathname).title;
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <>
      <TitleSync />
      <Navbar />
      <Sidebar />
      <main className="ml-64 mt-16 min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Introduction />} />
          <Route path="/docs/installation" element={<Installation />} />
          <Route path="/docs/theming" element={<Theming />} />
          <Route path="/docs/components/button" element={<ButtonPage />} />
          <Route
            path="/docs/components/responsive-sheet"
            element={<ResponsiveSheetPage />}
          />
          <Route path="/docs/components/badge" element={<BadgePage />} />
          <Route path="/docs/components/card" element={<CardPage />} />
          <Route path="/docs/components/dialog" element={<DialogPage />} />
          <Route path="/docs/components/dropdown-menu" element={<DropdownMenuPage />} />
          <Route path="/docs/components/input" element={<InputPage />} />
          <Route path="/docs/components/tabs" element={<TabsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
