import { motion } from "framer-motion";
import { Copy, Gift } from "lucide-react";

export default function OfferBanner({ offer, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${offer.gradient} p-6 text-ink-950 shadow-glow`}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/25" />
      <div className="absolute -bottom-16 left-10 h-36 w-36 rounded-full bg-ink-950/10" />
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/75">
        <Gift size={23} />
      </span>
      <h3 className="mt-5 font-display text-2xl font-black">{offer.title}</h3>
      <p className="mt-2 text-sm font-bold">{offer.value}</p>
      <div className="mt-6 flex items-center justify-between rounded-full bg-white/75 px-4 py-3">
        <span className="text-sm font-black">{offer.code}</span>
        <Copy size={17} />
      </div>
    </motion.article>
  );
}
