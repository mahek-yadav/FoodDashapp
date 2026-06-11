import { motion } from "framer-motion";
import { Heart, Leaf, Plus, Star } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { formatINR } from "../../utils/currency";

export default function DishCard({ dish, onCustomize, index = 0, compact = false }) {
  const { isDishSaved, toggleDish } = useWishlist();
  const saved = isDishSaved(dish.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.035, duration: 0.38 }}
      whileHover={{ y: -5 }}
      className="glass-panel overflow-hidden rounded-[28px] p-3"
    >
      <div className="relative overflow-hidden rounded-[22px]">
        <img src={dish.image} alt={dish.name} className={compact ? "h-36 w-full object-cover" : "h-48 w-full object-cover"} loading="lazy" />
        <button
          type="button"
          onClick={() => toggleDish(dish.id)}
          className={[
            "absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full backdrop-blur-xl transition",
            saved ? "bg-masala-500 text-white" : "bg-ink-950/70 text-cream hover:bg-masala-500",
          ].join(" ")}
          aria-label={saved ? "Remove dish from wishlist" : "Save dish"}
        >
          <Heart size={17} fill={saved ? "currentColor" : "none"} />
        </button>
        {dish.bestseller ? (
          <span className="absolute left-3 top-3 pill-brand">
            Best Seller
          </span>
        ) : null}
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase text-mint-500">
              {dish.veg ? <Leaf size={14} /> : null}
              {dish.veg ? "Pure Veg" : "Non-Veg"} · {dish.category}
            </p>
            <h3 className="mt-2 font-display text-xl font-black text-ink-950 dark:text-cream">{dish.name}</h3>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-ink-950 px-3 py-1 text-xs font-black text-cream dark:bg-cream dark:text-ink-950">
            <Star size={13} fill="currentColor" /> {dish.rating}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-ink-700 dark:text-cream/65">{dish.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-display text-2xl font-black text-ink-950 dark:text-cream">{formatINR(dish.price)}</span>
          <button type="button" onClick={() => onCustomize(dish)} className="flame-button px-4 py-2">
            <Plus size={18} /> Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
