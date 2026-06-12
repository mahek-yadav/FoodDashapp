import { Bell, Heart, Home, Settings, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";
import SectionHeader from "../components/common/SectionHeader";
import ProfileCard from "../components/food/ProfileCard";

const links = [
  { to: "/orders", label: "Order History", icon: ShoppingBag },
  { to: "/addresses", label: "Saved Addresses", icon: Home },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function ProfilePage() {
  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        <SectionHeader eyebrow="Profile" title="Your FoodDash account" />
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <ProfileCard />
          <div className="grid gap-4 sm:grid-cols-2">
            {links.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} className="glass-panel rounded-[28px] p-5 transition hover:-translate-y-1">
                <span className="grid h-12 w-12 place-items-center rounded-2xl icon-brand-bg text-ink-950">
                  <Icon size={22} />
                </span>
                <h2 className="mt-5 font-display text-2xl font-black">{label}</h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
