import { Heart, Home, Search, ShoppingBag, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/cart", label: "Cart", icon: ShoppingBag },
  { to: "/orders", label: "Orders", icon: Heart },
  { to: "/profile", label: "Profile", icon: UserRound },
];

export default function BottomNavigation() {
  const { itemCount } = useCart();

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 rounded-[28px] border border-white/20 bg-ink-950/90 p-2 shadow-card backdrop-blur-2xl md:hidden">
      <div className="grid grid-cols-5">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                "relative flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold transition",
                isActive ? "bg-cream text-ink-950" : "text-cream/70",
              ].join(" ")
            }
          >
            <Icon size={18} />
            <span>{label}</span>
            {to === "/cart" && itemCount ? (
              <span className="absolute right-3 top-1 grid h-5 min-w-5 place-items-center rounded-full bg-flame-400 px-1 text-[10px] text-ink-950">
                {itemCount}
              </span>
            ) : null}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
