import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function StickyCategoryMenu({ categories, activeCategory, onSelect }) {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Pin the menu bar as soon as the user scrolls past 400px (the typical banner height)
      if (window.scrollY > 400) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={[
        "left-0 w-full z-50 border-y border-ink-900/10 bg-cream/95 py-3 backdrop-blur-2xl shadow-sm dark:border-white/10 dark:bg-ink-950/95 transition-all",
        isFixed 
          ? "fixed top-0 animate-fade-in" 
          : "relative"
      ].join(" ")}
    >
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