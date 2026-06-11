import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import PageTransition from "../components/common/PageTransition";
import SectionHeader from "../components/common/SectionHeader";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { calculateDelivery } from "../utils/delivery";
import { formatINR } from "../utils/currency";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const { selectedAddress } = useUser();
  const delivery = calculateDelivery({ distanceKm: 3.4, zone: selectedAddress?.zone, cartValue: subtotal });
  const platformFee = items.length ? 9 : 0;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + delivery.fee + platformFee + taxes;

  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Cart"
          title="Your permanent shopping cart"
          description="Your selected dishes, add-ons, quantities, and notes are ready for checkout."
          action={
            items.length ? (
              <button type="button" onClick={clearCart} className="ghost-button">
                Clear cart
              </button>
            ) : null
          }
        />
        {items.length ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
            <section className="space-y-4">
              {items.map((item) => (
                <article key={item.cartItemId} className="glass-panel rounded-[30px] p-4">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <img src={item.image} alt={item.name} className="h-40 w-full rounded-[24px] object-cover sm:w-44" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-black uppercase text-mint-500">{item.veg ? "Pure Veg" : "Non-Veg"}</p>
                          <h2 className="mt-1 font-display text-2xl font-black">{item.name}</h2>
                          <p className="mt-2 text-sm leading-6 text-ink-700 dark:text-cream/60">
                            {item.configuration?.summary?.join(", ") || "Classic"}
                          </p>
                          {item.configuration?.specialRequests ? (
                            <p className="mt-2 rounded-2xl bg-ink-950/5 p-3 text-sm font-semibold text-ink-700 dark:bg-white/10 dark:text-cream/65">
                              {item.configuration.specialRequests}
                            </p>
                          ) : null}
                        </div>
                        <button type="button" onClick={() => removeItem(item.cartItemId)} className="text-masala-500" aria-label="Remove item">
                          <Trash2 size={19} />
                        </button>
                      </div>
                      <div className="mt-5 flex items-center justify-between">
                        <p className="font-display text-2xl font-black">{formatINR(item.finalPrice * item.quantity)}</p>
                        <div className="flex items-center gap-2 rounded-full bg-ink-950/5 p-1 dark:bg-white/10">
                          <button type="button" onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="grid h-10 w-10 place-items-center rounded-full bg-white dark:bg-ink-950" aria-label="Decrease quantity">
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-black">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="grid h-10 w-10 place-items-center rounded-full bg-flame-gradient text-ink-950" aria-label="Increase quantity">
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="glass-panel h-fit rounded-[34px] p-5 lg:sticky lg:top-28">
              <h2 className="font-display text-2xl font-black">Bill summary</h2>
              <div className="mt-5 space-y-3 text-sm font-semibold text-ink-700 dark:text-cream/65">
                <div className="flex justify-between"><span>Items ({itemCount})</span><span>{formatINR(subtotal)}</span></div>
                <div className="flex justify-between"><span>Delivery · {delivery.eta}</span><span>{formatINR(delivery.fee)}</span></div>
                <div className="flex justify-between"><span>Platform fee</span><span>{formatINR(platformFee)}</span></div>
                <div className="flex justify-between"><span>Taxes</span><span>{formatINR(taxes)}</span></div>
              </div>
              <div className="mt-5 border-t border-ink-900/10 pt-5 dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-display text-3xl font-black">{formatINR(total)}</span>
                </div>
                <Link to="/checkout" className="flame-button mt-5 w-full rounded-3xl py-4">
                  <ShoppingBag size={19} /> Continue checkout
                </Link>
              </div>
            </aside>
          </div>
        ) : (
          <EmptyState title="Your cart is empty" description="Add a dish from any restaurant to begin your FoodDash order." />
        )}
      </div>
    </PageTransition>
  );
}
