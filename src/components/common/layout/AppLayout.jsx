import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout() {
  const location = useLocation();

  const hideLayoutRoutes = [
    "/login",
    "/signup",
    "/admin",
  ];

  const hideLayout = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <main className="overflow-x-hidden">
        <Outlet />
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}