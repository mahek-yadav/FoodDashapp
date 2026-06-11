import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { formatINR } from "../../utils/currency";

export default function WishlistCard({ item, type, onRemove }) {
  const to = type === "restaurant" ? `/restaurants/${item.slug}` : "/search";

  return (
    <article className="glass-panel flex gap-4 rounded-[28px] p-3">
      <img src={item.image} alt={item.name} className="h-28 w-28 shrink-0 rounded-[22px] object-cover" />
      <div className="min-w-0 flex-1 py-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={to} className="font-display text-xl font-black text-ink-950 dark:text-cream">
              {item.name}
            </Link>
            <p className="mt-1 text-sm font-semibold text-ink-700 dark:text-cream/60">
              {type === "restaurant" ? item.city : item.category}
            </p>
          </div>
          <button type="button" onClick={onRemove} className="grid h-10 w-10 place-items-center rounded-full bg-masala-500 text-white" aria-label="Remove saved item">
            <Heart size={17} fill="currentColor" />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-black">
          <span className="pill pill-brand px-3 py-1">
            <Star size={13} fill="currentColor" /> {item.rating}
          </span>
          <span className="pill pill-brand px-3 py-1">
            {type === "restaurant" ? `${item.deliveryTime} min` : formatINR(item.price)}
          </span>
        </div>
      </div>
    </article>
  );
}
