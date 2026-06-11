import { motion } from "framer-motion";
import { Bike, CheckCircle2, Clock, MapPin, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { orderStatuses } from "../../data/mockData";
import { formatINR } from "../../utils/currency";

export default function DeliveryTracker({ order }) {
  const [statusIndex, setStatusIndex] = useState(() =>
    Math.max(0, orderStatuses.indexOf(order?.status ?? orderStatuses[0])),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((current) => Math.min(orderStatuses.length - 1, current + 1));
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  const progress = useMemo(() => (statusIndex / (orderStatuses.length - 1)) * 100, [statusIndex]);

  if (!order) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <section className="glass-panel overflow-hidden rounded-[34px] p-5 sm:p-7">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-flame-600 dark:text-flame-300">Order {order.id}</p>
            <h1 className="font-display text-3xl font-black text-ink-950 dark:text-cream">Live delivery tracking</h1>
          </div>
          <span className="pill bg-mint-500 text-white">
            <Clock size={16} /> {orderStatuses[statusIndex]}
          </span>
        </div>

        <div className="relative mt-8 h-[420px] overflow-hidden rounded-[30px] bg-ink-950">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="absolute left-[12%] top-[16%] rounded-2xl bg-cream px-4 py-3 text-sm font-black text-ink-950">
            <MapPin className="mb-1 text-masala-500" size={18} /> Restaurant
          </div>
          <div className="absolute bottom-[14%] right-[10%] rounded-2xl bg-flame-400 px-4 py-3 text-sm font-black text-ink-950">
            <MapPin className="mb-1" size={18} /> You
          </div>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M18 26 C 38 22, 42 48, 56 52 S 73 70, 86 78" stroke="#ffb703" strokeWidth="1.3" strokeDasharray="3 3" fill="none" />
          </svg>
          <motion.div
            className="absolute grid h-14 w-14 place-items-center rounded-full bg-flame-gradient text-ink-950 shadow-glow"
            animate={{
              left: `${12 + progress * 0.72}%`,
              top: `${24 + progress * 0.48}%`,
              rotate: [0, 4, -4, 0],
            }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Bike size={25} />
          </motion.div>
        </div>
      </section>

      <aside className="space-y-5">
        <div className="glass-panel rounded-[30px] p-5">
          <h2 className="font-display text-2xl font-black text-ink-950 dark:text-cream">Delivery timeline</h2>
          <div className="mt-5 space-y-4">
            {orderStatuses.map((status, index) => {
              const done = index <= statusIndex;
              return (
                <div key={status} className="flex gap-3">
                  <span className={done ? "text-mint-500" : "text-ink-700/35 dark:text-cream/25"}>
                    <CheckCircle2 size={20} fill={done ? "currentColor" : "none"} />
                  </span>
                  <div>
                    <p className="font-bold text-ink-950 dark:text-cream">{status}</p>
                    <p className="text-sm text-ink-700 dark:text-cream/60">{done ? "Updated live" : "Coming up"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="glass-panel rounded-[30px] p-5">
          <h2 className="font-display text-2xl font-black text-ink-950 dark:text-cream">Rider</h2>
          <p className="mt-3 font-bold">{order.rider.name}</p>
          <p className="text-sm text-ink-700 dark:text-cream/60">{order.rider.vehicle}</p>
          <a href={`tel:${order.rider.phone}`} className="ghost-button mt-5 w-full">
            <Phone size={17} /> Call rider
          </a>
        </div>
        <div className="glass-panel rounded-[30px] p-5">
          <h2 className="font-display text-2xl font-black text-ink-950 dark:text-cream">Order total</h2>
          <p className="mt-3 font-display text-3xl font-black">{formatINR(order.totals.total)}</p>
          <p className="mt-2 text-sm text-ink-700 dark:text-cream/60">{order.address?.line}</p>
        </div>
      </aside>
    </div>
  );
}
