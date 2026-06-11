import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function CheckoutStepper({ steps, currentStep, onStepClick }) {
  return (
    <div className="glass-panel rounded-[28px] p-4">
      <div className="grid gap-3 sm:grid-cols-5">
        {steps.map((step, index) => {
          const active = index === currentStep;
          const complete = index < currentStep;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick?.(index)}
              className="relative flex items-center gap-3 rounded-2xl p-3 text-left transition hover:bg-ink-950/5 dark:hover:bg-white/10"
            >
              <span
                className={[
                  "grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-black transition",
                  complete || active
                    ? "bg-flame-gradient text-ink-950"
                    : "bg-ink-950/5 text-ink-700 dark:bg-white/10 dark:text-cream/60",
                ].join(" ")}
              >
                {complete ? <Check size={17} /> : index + 1}
              </span>
              <span>
                <span className="block text-sm font-black text-ink-950 dark:text-cream">{step.label}</span>
                <span className="block text-xs font-semibold text-ink-700 dark:text-cream/55">{step.caption}</span>
              </span>
              {active ? (
                <motion.span
                  layoutId="checkout-step"
                  className="absolute inset-0 rounded-2xl border border-flame-400"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
