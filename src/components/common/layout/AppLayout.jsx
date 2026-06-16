import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NavigationProgress from "@/components/common/ui/NavigationProgress";
import LocationBar from "@/components/common/location/LocationBar"

export default function AppLayout() {
  return (
    <>
      {/* Green progress bar on every page navigation */}
      <NavigationProgress />

      <Navbar />

      <LocationBar/>
      
      <main className="overflow-x-hidden">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
