import { motion } from "framer-motion";
import { Heart, MapPin, Star, Timer, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../context/WishlistContext";
import { formatINR } from "../../utils/currency";

export default function RestaurantCard({ restaurant, index = 0 }) {
  const { isRestaurantSaved, toggleRestaurant } = useWishlist();
  const saved = isRestaurantSaved(restaurant.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ delay: index * 0.04, duration: 0.42 }}
      whileHover={{ y: -6 }}
      className="glass-panel group overflow-hidden rounded-[30px] p-3"
    >
      <div className="relative overflow-hidden rounded-[24px]">
        <Link to={`/restaurants/${restaurant.slug}`} aria-label={`Open ${restaurant.name}`}>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        <button
          type="button"
          onClick={() => toggleRestaurant(restaurant.id)}
          className={[
            "absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full backdrop-blur-xl transition",
            saved ? "bg-masala-500 text-white" : "bg-ink-950/70 text-cream hover:bg-masala-500",
          ].join(" ")}
          aria-label={saved ? "Remove restaurant from wishlist" : "Save restaurant"}
        >
          <Heart size={18} fill={saved ? "currentColor" : "none"} />
        </button>
        <span className="absolute left-3 top-3 pill-brand">
          {restaurant.offers[0]}
        </span>
      </div>

      <div className="p-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link to={`/restaurants/${restaurant.slug}`} className="font-display text-xl font-black text-ink-950 hover:text-flame-600 dark:text-cream">
              {restaurant.name}
            </Link>
            <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-ink-700 dark:text-cream/65">
              <MapPin size={14} /> {restaurant.city}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 chip-brand">
            <Star size={13} fill="currentColor" /> {restaurant.rating}
          </span>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-ink-700 dark:text-cream/65">{restaurant.description}</p>

        <div className="mt-5 grid grid-cols-3 gap-2 text-xs font-bold text-ink-700 dark:text-cream/70">
          <span className="chip-brand">
            <Timer className="mb-1" size={15} /> {restaurant.deliveryTime} min
          </span>
          <span className="chip-brand">
            <Utensils className="mb-1" size={15} /> {restaurant.cuisine[0]}
          </span>
          <span className="chip-brand">
            {formatINR(restaurant.priceForTwo)}
            <span className="block text-[10px]">for two</span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}
