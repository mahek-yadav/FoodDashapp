import { motion } from "framer-motion";

export default function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className="mb-7 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="mb-3 text-sm font-extrabold uppercase text-flame-600 dark:text-flame-300">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl font-black text-ink-950 dark:text-cream sm:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-700 dark:text-cream/70 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </motion.div>
  );
}
