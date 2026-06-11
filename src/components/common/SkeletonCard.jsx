export default function SkeletonCard() {
  return (
    <div className="glass-panel overflow-hidden rounded-[28px] p-4">
      <div className="relative h-44 overflow-hidden rounded-3xl bg-ink-900/10 dark:bg-white/10">
        <div className="absolute inset-y-0 left-0 w-1/2 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
      <div className="mt-5 space-y-3">
        <div className="h-4 w-3/4 rounded-full bg-ink-900/10 dark:bg-white/10" />
        <div className="h-4 w-1/2 rounded-full bg-ink-900/10 dark:bg-white/10" />
        <div className="h-10 rounded-full bg-ink-900/10 dark:bg-white/10" />
      </div>
    </div>
  );
}
