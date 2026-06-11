import { Bell, CheckCircle2, Gift, Truck } from "lucide-react";

const icons = {
  offer: Gift,
  order: Truck,
  loyalty: CheckCircle2,
};

export default function NotificationCard({ notification, onRead }) {
  const Icon = icons[notification.type] ?? Bell;

  return (
    <button
      type="button"
      onClick={onRead}
      className={[
        "glass-panel flex w-full items-start gap-4 rounded-[26px] p-4 text-left transition hover:-translate-y-1",
        notification.read ? "opacity-70" : "ring-1 ring-flame-400/60",
      ].join(" ")}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-flame-gradient text-ink-950">
        <Icon size={20} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-ink-950 dark:text-cream">{notification.title}</span>
        <span className="mt-1 block text-sm leading-6 text-ink-700 dark:text-cream/65">{notification.body}</span>
        <span className="mt-2 block text-xs font-bold text-flame-600 dark:text-flame-300">{notification.time}</span>
      </span>
    </button>
  );
}
