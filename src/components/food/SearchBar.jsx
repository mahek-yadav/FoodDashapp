import { motion } from "framer-motion";
import { SlidersHorizontal, Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, onFilterClick, placeholder = "Search biryani, dosa, restaurants..." }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel flex items-center gap-3 rounded-full p-2"
    >
      <span className="ml-3 text-ink-700 dark:text-cream/70">
        <Search size={20} />
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent py-3 text-sm font-semibold text-ink-950 outline-none placeholder:text-ink-700/60 dark:text-cream dark:placeholder:text-cream/45"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          className="grid h-10 w-10 place-items-center rounded-full bg-ink-950/5 text-ink-800 dark:bg-white/10 dark:text-cream"
          aria-label="Clear search"
        >
          <X size={17} />
        </button>
      ) : null}
      {onFilterClick ? (
        <button
          type="button"
          onClick={onFilterClick}
          className="grid h-10 w-10 place-items-center rounded-full bg-flame-gradient text-ink-950"
          aria-label="Open filters"
        >
          <SlidersHorizontal size={18} />
        </button>
      ) : null}
    </motion.div>
  );
}
