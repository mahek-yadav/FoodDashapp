import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { reviews } from "../../data/mockData";

export default function ReviewCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const review = reviews[active];

  return (
    <div className="glass-panel relative overflow-hidden rounded-[34px] p-6 sm:p-8">
      <div className="absolute right-6 top-6 text-flame-400/40">
        <Quote size={72} />
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={review.id}
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -36 }}
          transition={{ duration: 0.35 }}
          className="relative"
        >
          <div className="mb-5 flex gap-1 text-flame-400">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={18} fill="currentColor" />
            ))}
          </div>
          <p className="max-w-3xl font-display text-2xl font-black leading-snug text-ink-950 dark:text-cream sm:text-3xl">
            “{review.quote}”
          </p>
          <div className="mt-8">
            <p className="font-bold text-ink-950 dark:text-cream">{review.name}</p>
            <p className="text-sm font-semibold text-ink-700 dark:text-cream/60">{review.city}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => setActive((current) => (current - 1 + reviews.length) % reviews.length)}
          className="grid h-11 w-11 place-items-center rounded-full bg-ink-950 text-cream dark:bg-cream dark:text-ink-950"
          aria-label="Previous review"
        >
          <ChevronLeft size={19} />
        </button>
        <button
          type="button"
          onClick={() => setActive((current) => (current + 1) % reviews.length)}
          className="grid h-11 w-11 place-items-center rounded-full bg-ink-950 text-cream dark:bg-cream dark:text-ink-950"
          aria-label="Next review"
        >
          <ChevronRight size={19} />
        </button>
      </div>
    </div>
  );
}
