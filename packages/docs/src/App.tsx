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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}
