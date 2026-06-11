import { Clock, RotateCcw, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { formatINR } from "../../utils/currency";

export default function OrderHistoryCard({ order }) {
  return (
    <article className="glass-panel rounded-[28px] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-bold text-flame-600 dark:text-flame-300">Order {order.id}</p>
          <h3 className="mt-1 font-display text-2xl font-black text-ink-950 dark:text-cream">
            {order.items.map((item) => item.name).slice(0, 2).join(", ")}
          </h3>
          <p className="mt-2 flex items-center gap-2 text-sm text-ink-700 dark:text-cream/60">
            <Clock size={15} /> {new Date(order.placedAt).toLocaleString("en-IN")}
          </p>
        </div>
        <span className="pill pill-brand">
          <Truck size={16} /> {order.status}
        </span>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-2xl font-black">{formatINR(order.totals.total)}</p>
        <div className="flex gap-3">
          <Link to={`/tracking/${order.id}`} className="ghost-button px-4 py-2">
            Track
          </Link>
          <Link to="/restaurants" className="flame-button px-4 py-2">
            <RotateCcw size={16} /> Reorder
          </Link>
        </div>
      </div>
    </article>
  );
}
