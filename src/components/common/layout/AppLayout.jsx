import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NavigationProgress from "@/components/common/ui/NavigationProgress";
import LocationBar from "@/components/common/location/LocationBar"
import ErrorBoundary from "@/components/common/ui/ErrorBoundary";

export default function AppLayout() {
  const location = useLocation();

  return (
    <>
      {/* Green progress bar on every page navigation */}
      <NavigationProgress />

      <Navbar />

      <LocationBar/>
      
      <main className="overflow-x-hidden">
        {/* key={pathname} resets the boundary on navigation, so a crash on
            one page doesn't strand the user — moving to a new route
            (or clicking "Return Home") always shows a fresh page. */}
        <ErrorBoundary key={location.pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>

      <Footer />
    </>
  );
}
