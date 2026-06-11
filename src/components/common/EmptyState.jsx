import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({ title, description, actionLabel = "Explore restaurants", to = "/restaurants" }) {
  return (
    <div className="glass-panel mx-auto flex max-w-xl flex-col items-center rounded-[28px] p-8 text-center">
      <span className="mb-5 grid h-16 w-16 place-items-center rounded-full bg-flame-gradient text-ink-950">
        <SearchX size={28} />
      </span>
      <h2 className="font-display text-2xl font-black text-ink-950 dark:text-cream">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-ink-700 dark:text-cream/70">{description}</p>
      <Link to={to} className="flame-button mt-6">
        {actionLabel}
      </Link>
    </div>
  );
}
