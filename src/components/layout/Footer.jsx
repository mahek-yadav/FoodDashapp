import { ArrowRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/10 bg-ink-950 text-cream dark:border-white/10">
      <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1.3fr_.8fr_.8fr_.8fr]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl brand-icon font-black">
              FD
            </span>
            <span className="font-display text-2xl font-black">FoodDash</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-cream/65">
            India&apos;s Fastest Way To Satisfy Your Cravings, built around premium Indian restaurants,
            seamless checkout, and live order tracking.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Mail, Phone].map((Icon) => (
              <span key={Icon.displayName ?? Icon.name} className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
                <Icon size={18} />
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-bold">Explore</h3>
          {["Restaurants", "Offers", "Search", "Wishlist"].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="mb-3 flex items-center gap-2 text-sm text-cream/65 hover:text-flame-300">
              <ArrowRight size={14} /> {item}
            </Link>
          ))}
        </div>
        <div>
          <h3 className="mb-4 font-bold">Account</h3>
          {[
            ["Profile", "/profile"],
            ["Saved Addresses", "/addresses"],
            ["Order History", "/orders"],
            ["Settings", "/settings"],
          ].map(([label, to]) => (
            <Link key={to} to={to} className="mb-3 flex items-center gap-2 text-sm text-cream/65 hover:text-flame-300">
              <ArrowRight size={14} /> {label}
            </Link>
          ))}
        </div>
        <div>
          <h3 className="mb-4 font-bold">Contact</h3>
          <p className="mb-3 flex items-start gap-2 text-sm text-cream/65">
            <MapPin className="mt-0.5 shrink-0" size={15} /> Mumbai, Bengaluru, Delhi, Hyderabad, and more.
          </p>
          <p className="flex items-center gap-2 text-sm text-cream/65">
            <Phone size={15} /> +91 80000 12345
          </p>
        </div>
      </div>
    </footer>
  );
}
