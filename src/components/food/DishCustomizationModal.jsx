import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import { customizationGroups } from "../../data/mockData";
import { formatINR } from "../../utils/currency";

function getInitialSelections() {
  return customizationGroups.reduce((acc, group) => {
    acc[group.id] = group.type === "radio" ? group.options[0].id : [];
    return acc;
  }, {});
}

function getSelectedLabels(selections) {
  return customizationGroups.flatMap((group) => {
    const selected = selections[group.id];
    const ids = Array.isArray(selected) ? selected : [selected];
    return group.options
      .filter((option) => ids.includes(option.id))
      .map((option) => option.label);
  });
}

function getSelectionPrice(selections) {
  return customizationGroups.reduce((total, group) => {
    const selected = selections[group.id];
    const ids = Array.isArray(selected) ? selected : [selected];
    return (
      total +
      group.options
        .filter((option) => ids.includes(option.id))
        .reduce((sum, option) => sum + option.price, 0)
    );
  }, 0);
}

export default function DishCustomizationModal({ dish, onClose }) {
  const { addItem, setCartOpen } = useCart();
  const [selections, setSelections] = useState(getInitialSelections);
  const [quantity, setQuantity] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    if (dish) {
      setSelections(getInitialSelections());
      setQuantity(1);
      setSpecialRequests("");
      setCartOpen(false);
    }
  }, [dish, setCartOpen]);

  const selectedLabels = useMemo(() => getSelectedLabels(selections), [selections]);
  const unitPrice = dish ? dish.price + getSelectionPrice(selections) : 0;
  const totalPrice = unitPrice * quantity;

  const toggleOption = (group, optionId) => {
    setSelections((current) => {
      if (group.type === "radio") {
        return { ...current, [group.id]: optionId };
      }

      const selected = current[group.id] ?? [];
      return {
        ...current,
        [group.id]: selected.includes(optionId)
          ? selected.filter((id) => id !== optionId)
          : [...selected, optionId],
      };
    });
  };

  const handleAdd = (event) => {
    event.preventDefault();
    event.stopPropagation();

    addItem(
      dish,
      {
        selections,
        summary: selectedLabels,
        specialRequests,
        finalPrice: unitPrice,
      },
      quantity,
      { openCart: false },
    );
    onClose();
    window.setTimeout(() => setCartOpen(true), 360);
  };

  return (
    <AnimatePresence>
      {dish ? (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-end p-0 sm:place-items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close customization"
            className="absolute inset-0 h-full w-full cursor-default bg-ink-950/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: 80, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            className={
              "pointer-events-auto relative z-10 max-h-[94vh] w-full overflow-hidden rounded-t-[34px] bg-cream text-ink-950 shadow-card dark:bg-ink-900 dark:text-cream sm:max-w-5xl sm:rounded-[34px]"
            }
            role="dialog"
            aria-modal="true"
          >
            <div className="grid max-h-[94vh] overflow-y-auto lg:grid-cols-[.9fr_1.1fr]">
              <div className="relative min-h-72 bg-ink-950">
                <img src={dish.image} alt={dish.name} className="h-full min-h-72 w-full object-cover" />
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-ink-950/70 text-cream backdrop-blur-xl"
                  aria-label="Close customization"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4 right-4 rounded-[24px] bg-ink-950/75 p-4 text-cream backdrop-blur-xl">
                  <p className="text-xs font-black uppercase text-flame-300">{dish.category}</p>
                  <h2 className="mt-1 font-display text-3xl font-black">{dish.name}</h2>
                  <p className="mt-2 text-sm leading-6 text-cream/70">{dish.description}</p>
                </div>
              </div>

              <form className="p-5 sm:p-7" onSubmit={handleAdd}>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-ink-700 dark:text-cream/65">Customize your dish</p>
                    <p className="font-display text-3xl font-black">{formatINR(unitPrice)}</p>
                  </div>
                  <div className="flex items-center gap-3 rounded-full bg-ink-950/5 p-1 dark:bg-white/10">
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                      className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink-950 dark:bg-ink-950 dark:text-cream"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-7 text-center font-black">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => current + 1)}
                      className="grid h-10 w-10 place-items-center rounded-full bg-flame-gradient text-ink-950"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {customizationGroups.map((group) => (
                    <fieldset key={group.id}>
                      <legend className="mb-3 text-sm font-extrabold text-ink-950 dark:text-cream">{group.title}</legend>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {group.options.map((option) => {
                          const selected = Array.isArray(selections[group.id])
                            ? selections[group.id].includes(option.id)
                            : selections[group.id] === option.id;
                          return (
                            <button
                              type="button"
                              key={option.id}
                              onClick={() => toggleOption(group, option.id)}
                              className={[
                                "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-bold transition",
                                selected
                                  ? "border-flame-400 bg-flame-400/15 text-ink-950 dark:text-cream"
                                  : "border-ink-900/10 bg-white/60 text-ink-800 hover:border-flame-300 dark:border-white/10 dark:bg-white/[0.06] dark:text-cream/75",
                              ].join(" ")}
                            >
                              <span>{option.label}</span>
                              <span className="text-xs text-flame-600 dark:text-flame-300">
                                {option.price ? `+${formatINR(option.price)}` : "Included"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>

                <label className="mt-6 block">
                  <span className="mb-2 block text-sm font-extrabold">Special Instructions</span>
                  <textarea
                    value={specialRequests}
                    onChange={(event) => setSpecialRequests(event.target.value)}
                    rows={3}
                    placeholder="Extra spicy, less oil, no onion, separate packaging..."
                    className="w-full resize-none rounded-3xl border border-ink-900/10 bg-white/80 p-4 text-sm font-semibold text-ink-950 outline-none focus:border-flame-400 dark:border-white/10 dark:bg-white/[0.06] dark:text-cream"
                  />
                </label>

                <div className="sticky bottom-0 z-20 -mx-5 mt-6 bg-cream/95 px-5 pb-5 pt-3 backdrop-blur-xl dark:bg-ink-900/95 sm:-mx-7 sm:px-7 sm:pb-7">
                  <button
                    type="submit"
                    className="flame-button w-full justify-between rounded-3xl px-6 py-4"
                    aria-label={`Add customized ${dish.name} to cart`}
                  >
                  <span className="flex items-center gap-2">
                    <ShoppingBag size={20} /> Add customized dish
                  </span>
                  <span>{formatINR(totalPrice)}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
