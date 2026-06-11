import { motion } from "framer-motion";

export default function StickyCategoryMenu({ categories, activeCategory, onSelect }) {
  return (
    <div className="sticky top-20 z-30 border-y border-ink-900/10 bg-cream/85 py-3 backdrop-blur-2xl dark:border-white/10 dark:bg-ink-950/80">
      <div className="page-shell no-scrollbar flex gap-3 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={[
              "relative shrink-0 rounded-full px-5 py-3 text-sm font-extrabold transition",
              activeCategory === category
                ? "text-ink-950 dark:text-cream"
                : "text-ink-700 hover:text-flame-600 dark:text-cream/60 dark:hover:text-flame-300",
            ].join(" ")}
          >
            {activeCategory === category ? (
              <motion.span
                layoutId="sticky-category-indicator"
                className="absolute inset-0 rounded-full bg-flame-gradient"
                transition={{ type: "spring", stiffness: 360, damping: 32 }}
              />
            ) : null}
            <span className="relative">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
