import { motion } from "framer-motion";
import { Copy, Gift } from "lucide-react";

const palettes = [
  ["#FFB84C", "#FF6A3D"],
  ["#43D07A", "#FFD36F"],
  ["#FF7A5A", "#FFCD69"],
  ["#8A5AFF", "#FF7A3D"],
];

export default function OfferBanner({ offer, index = 0 }) {
  const palette = palettes[index % palettes.length];
  const bg = `linear-gradient(135deg, ${palette[0]}, ${palette[1]})`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-[36px] p-6 text-ink-950 shadow-glow flex flex-col justify-between"
      style={{ background: bg }}
    >
      {/* moving reel background: a horizontally scrolling decorative strip */}
      <div className="absolute inset-x-0 top-0 h-24 overflow-hidden pointer-events-none">
        <div className="offer-reel">
          <div className="offer-reel-track">
            {/* repeated decorative cells - simple circles to give motion */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="offer-reel-cell" />
            ))}
          </div>
          <div className="offer-reel-track" aria-hidden>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="offer-reel-cell" />
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex items-start gap-4 flex-grow">
        <span className="grid h-14 w-14 place-items-center rounded-3xl bg-white/90 shadow-sm">
          <Gift size={24} />
        </span>
        <div>
          <h3 className="font-display text-2xl font-black text-ink-950">{offer.title}</h3>
          <p className="mt-1 text-sm font-bold text-ink-900/80">{offer.value}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="rounded-full bg-white/95 px-4 py-3 font-black shadow-md shimmer-pill" style={{ minWidth: 160 }}>
          <span className="text-sm">{offer.code}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="grid h-11 w-11 place-items-center rounded-full bg-white/90 shadow-sm"
          aria-label={`Copy ${offer.code}`}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(offer.code);
            } catch (e) {
              /* ignore clipboard errors silently */
            }
          }}
        >
          <Copy size={18} />
        </motion.button>
      </div>
    </motion.article>
  );
}
