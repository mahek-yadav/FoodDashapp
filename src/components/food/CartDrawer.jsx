import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { formatINR } from "../../utils/currency";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, items, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const location = useLocation();

  useEffect(() => {
    setCartOpen(false);
  }, [location.pathname, setCartOpen]);

  return (
    <AnimatePresence>
      {cartOpen ? (
        <motion.div
          className="fixed inset-0 z-50 bg-ink-950/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={() => setCartOpen(false)}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="ml-auto flex h-full w-full max-w-md flex-col bg-cream text-ink-950 shadow-card dark:bg-ink-900 dark:text-cream"
          >
            <div className="flex items-center justify-between border-b border-ink-900/10 p-5 dark:border-white/10">
              <div>
                <p className="text-sm font-bold text-ink-700 dark:text-cream/65">Permanent cart</p>
                <h2 className="font-display text-2xl font-black">Your FoodDash bag</h2>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full bg-ink-950 text-cream dark:bg-cream dark:text-ink-950"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {items.length ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <article key={item.cartItemId} className="rounded-[24px] border border-ink-900/10 bg-white/75 p-3 dark:border-white/10 dark:bg-white/[0.06]">
                      <div className="flex gap-3">
                        <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-bold">{item.name}</h3>
                              <p className="mt-1 text-xs font-semibold text-ink-700 dark:text-cream/60">
                                {item.configuration?.summary?.slice(0, 3).join(", ") || "Classic"}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.cartItemId)}
                              className="text-masala-500"
                              aria-label="Remove item"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="font-display text-lg font-black">{formatINR(item.finalPrice)}</span>
                            <div className="flex items-center gap-2 rounded-full bg-ink-950/5 p-1 dark:bg-white/10">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                className="grid h-8 w-8 place-items-center rounded-full bg-white dark:bg-ink-950"
                                aria-label="Decrease item quantity"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-5 text-center text-sm font-black">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                className="grid h-8 w-8 place-items-center rounded-full bg-flame-gradient text-ink-950"
                                aria-label="Increase item quantity"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-flame-gradient text-ink-950">
                      <ShoppingBag size={28} />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-black">Your cart is empty</h3>
                    <p className="mt-2 text-sm text-ink-700 dark:text-cream/65">Add a favorite dish and it will stay here across routes.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-ink-900/10 p-5 dark:border-white/10">
              <div className="mb-4 flex items-center justify-between font-bold">
                <span>{itemCount} item{itemCount === 1 ? "" : "s"}</span>
                <span className="font-display text-2xl font-black">{formatINR(subtotal)}</span>
              </div>
              <Link
                to={items.length ? "/checkout" : "/restaurants"}
                onClick={() => setCartOpen(false)}
                className="flame-button w-full rounded-3xl py-4"
              >
                {items.length ? "Checkout now" : "Find restaurants"}
              </Link>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
