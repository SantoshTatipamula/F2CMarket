import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NavigationProgress from "@/components/common/ui/NavigationProgress";

export default function AppLayout() {
  return (
    <>
      {/* Green progress bar on every page navigation */}
      <NavigationProgress />

      <Navbar />

      <main className="overflow-x-hidden">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
