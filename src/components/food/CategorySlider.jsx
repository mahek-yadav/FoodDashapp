import { motion } from "framer-motion";
import { categories } from "../../data/mockData";

export default function CategorySlider({ activeCategory, onSelect, compact = false }) {
  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
      {categories.map((category) => {
        const active = activeCategory === category.name || activeCategory === category.id;
        return (
          <motion.button
            key={category.id}
            whileTap={{ scale: 0.96 }}
            whileHover={{ y: -3 }}
            onClick={() => onSelect?.(category)}
            className={[
              "relative flex shrink-0 items-center gap-3 rounded-full border px-3 py-2 transition",
              active
                ? "border-flame-400 bg-ink-950 text-cream shadow-glow dark:bg-cream dark:text-ink-950"
                : "border-ink-900/10 bg-white/70 text-ink-900 hover:border-flame-400 dark:border-white/10 dark:bg-white/[0.065] dark:text-cream",
            ].join(" ")}
          >
            <img src={category.image} alt="" className={compact ? "h-8 w-8 rounded-full object-cover" : "h-11 w-11 rounded-full object-cover"} />
            <span className="pr-2 text-sm font-extrabold">{category.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
