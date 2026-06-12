import { motion } from "framer-motion";
import { Award, Star } from "lucide-react";

export default function ChefCard({ chef, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass-panel overflow-hidden rounded-[28px] p-3"
    >
  <img src={chef.image} alt={chef.name} className="h-48 w-full rounded-[22px] object-cover object-top" loading="lazy" />
      <div className="p-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-black text-ink-950 dark:text-cream">{chef.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-ink-700 dark:text-cream/65">
              <Award size={15} /> {chef.speciality}
            </p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-mint-500 px-3 py-1 text-xs font-black text-white">
            <Star size={13} fill="currentColor" /> {chef.rating}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
