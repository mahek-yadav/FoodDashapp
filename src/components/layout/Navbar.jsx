import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  Heart,
  Home,
  MapPin,
  Menu,
  Moon,
  Search,
  ShoppingBag,
  Store,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useNotifications } from "../../context/NotificationsContext";
import { useTheme } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/restaurants", label: "Restaurants", icon: Store },
  { to: "/search", label: "Search", icon: Search },
  { to: "/offers", label: "Offers", icon: ShoppingBag },
];

function navClass({ isActive }) {
  return [
    "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition",
    isActive
      ? "bg-ink-950 text-cream dark:bg-cream dark:text-ink-950"
      : "text-ink-800 hover:bg-ink-950/5 dark:text-cream/75 dark:hover:bg-white/10",
  ].join(" ");
}

export default function Navbar() {
  const { itemCount, setCartOpen } = useCart();
  const { unreadCount } = useNotifications();
  const { theme, toggleTheme } = useTheme();
  const { selectedAddress } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-cream/80 backdrop-blur-2xl dark:border-white/10 dark:bg-ink-950/75">
      <div className="page-shell flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl brand-icon text-xl font-black">
            FD
          </span>
          <span className="hidden sm:block">
            <span className="block font-display text-xl font-black text-ink-950 dark:text-cream">FoodDash</span>
            <span className="flex items-center gap-1 text-xs font-semibold text-ink-700 dark:text-cream/65">
              <MapPin size={13} /> {selectedAddress?.label ?? "Home"}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center rounded-full border border-ink-900/10 bg-white/60 p-1 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] lg:flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={navClass}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/wishlist"
            className="focus-ring relative hidden h-11 w-11 place-items-center rounded-full bg-white/70 text-ink-900 transition hover:text-masala-500 dark:bg-white/10 dark:text-cream md:grid"
            aria-label="Wishlist"
          >
            <Heart size={19} />
          </Link>
          <Link
            to="/notifications"
            className="focus-ring relative hidden h-11 w-11 place-items-center rounded-full bg-white/70 text-ink-900 transition hover:text-flame-600 dark:bg-white/10 dark:text-cream md:grid"
            aria-label="Notifications"
          >
            <Bell size={19} />
            {unreadCount ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-masala-500 px-1 text-[10px] font-black text-white">
                {unreadCount}
              </span>
            ) : null}
          </Link>
         <button
          className="focus-ring h-11 w-11 rounded-full bg-white/70 text-ink-900 transition hover:text-flame-600 dark:bg-white/10 dark:text-cream"
          onClick={toggleTheme}
          aria-label="Toggle theme"
         >
         {theme === "dark" ? <Sun className="mx-auto" size={19} /> : <Moon className="mx-auto" size={19} />}
        </button>
          <button
           className="focus-ring relative hidden h-11 w-11 rounded-full bg-white/70 text-ink-900 transition hover:text-flame-600 dark:bg-white/10 dark:text-cream md:block"
           onClick={() => setCartOpen(true)}
           aria-label="Open cart"
          >
           <ShoppingBag className="mx-auto" size={19} />
           {itemCount ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-flame-400 px-1 text-[10px] font-black text-ink-950">
             {itemCount}
            </span>
           ) : null}
          </button>
          <Link
            to="/profile"
            className="focus-ring hidden h-11 w-11 place-items-center rounded-full bg-white/70 text-ink-900 dark:bg-white/10 dark:text-cream md:grid"
            aria-label="Profile"
          >
            <User size={19} />
          </Link>
          <button
            className="focus-ring grid h-11 w-11 place-items-center rounded-full bg-white/70 text-ink-900 dark:bg-white/10 dark:text-cream lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-ink-900/10 bg-cream/95 dark:border-white/10 dark:bg-ink-950/95 lg:hidden"
          >
            <div className="page-shell grid gap-2 py-4">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink key={to} to={to} className={navClass}>
                  <Icon size={17} />
                  {label}
                </NavLink>
              ))}
              <NavLink to="/wishlist" className={navClass}>
                <Heart size={17} /> Wishlist
              </NavLink>
              <NavLink to="/notifications" className={navClass}>
                <Bell size={17} /> Notifications
              </NavLink>
              <NavLink to="/profile" className={navClass}>
                <User size={17} /> Profile
              </NavLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
