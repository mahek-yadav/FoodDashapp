import { Outlet, useLocation } from "react-router-dom";
import CartDrawer from "../food/CartDrawer";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import MobileFloatingCartButton from "./MobileFloatingCartButton";
import Navbar from "./Navbar";

export default function AppLayout() {
  const location = useLocation();
  const isCheckout = location.pathname.startsWith("/checkout");

  return (
    <div className="min-h-screen overflow-x-hidden bg-cream text-ink-950 dark:bg-radial-warm dark:text-cream">
      <Navbar />
      <Outlet />
      {!isCheckout ? <Footer /> : null}
      <CartDrawer />
      <MobileFloatingCartButton />
      <BottomNavigation />
    </div>
  );
}
