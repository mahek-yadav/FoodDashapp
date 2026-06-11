import { AnimatePresence, motion } from "framer-motion";
import { CalendarClock, CheckCircle2, CreditCard, Home, MapPin, MessageSquareText, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckoutStepper from "../components/checkout/CheckoutStepper";
import EmptyState from "../components/common/EmptyState";
import PageTransition from "../components/common/PageTransition";
import { useCart } from "../context/CartContext";
import { useNotifications } from "../context/NotificationsContext";
import { useOrders } from "../context/OrdersContext";
import { useUser } from "../context/UserContext";
import { formatINR } from "../utils/currency";
import { calculateDelivery } from "../utils/delivery";

const steps = [
  { id: "address", label: "Address", caption: "Where to deliver" },
  { id: "slot", label: "Slot", caption: "Delivery window" },
  { id: "payment", label: "Payment", caption: "Choose method" },
  { id: "review", label: "Review", caption: "Confirm order" },
  { id: "confirmation", label: "Done", caption: "Track live" },
];

const slots = ["ASAP · 25-35 min", "Today · 7:00 PM", "Today · 8:30 PM", "Tomorrow · 12:30 PM"];
const payments = ["UPI", "Credit Card", "FoodDash Wallet", "Cash on Delivery"];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { addresses, selectedAddressId, selectedAddress, setSelectedAddressId } = useUser();
  const { placeOrder } = useOrders();
  const { pushNotification } = useNotifications();
  const [currentStep, setCurrentStep] = useState(0);
  const [slot, setSlot] = useState(slots[0]);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [error, setError] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const totals = useMemo(() => {
    const delivery = calculateDelivery({ distanceKm: 3.4, zone: selectedAddress?.zone, cartValue: subtotal });
    const platformFee = items.length ? 9 : 0;
    const taxes = Math.round(subtotal * 0.05);
    return {
      subtotal,
      deliveryFee: delivery.fee,
      deliveryEta: delivery.eta,
      platformFee,
      taxes,
      total: subtotal + delivery.fee + platformFee + taxes,
    };
  }, [items.length, selectedAddress?.zone, subtotal]);
  const visibleTotals = confirmedOrder?.totals ?? totals;

  const goNext = () => {
    setError("");
    if (currentStep === 0 && !selectedAddress) {
      setError("Choose a delivery address.");
      return;
    }
    if (currentStep === 2 && !paymentMethod) {
      setError("Choose a payment method.");
      return;
    }
    setCurrentStep((step) => Math.min(steps.length - 1, step + 1));
  };

  const placeFoodDashOrder = () => {
    const order = placeOrder({
      items,
      totals,
      address: selectedAddress,
      slot,
      paymentMethod,
      specialInstructions,
    });
    pushNotification({
      type: "order",
      title: "Order placed",
      body: `${order.id} is now being prepared.`,
      time: "Just now",
    });
    clearCart();
    setConfirmedOrder(order);
    setCurrentStep(4);
  };

  if (!items.length && !confirmedOrder) {
    return (
      <PageTransition className="section-pad">
        <EmptyState title="Checkout needs a cart" description="Add dishes before starting the guided checkout flow." />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-[calc(100vh-5rem)] py-8">
      <div className="page-shell">
        <div className="mb-6">
          <h1 className="font-display text-4xl font-black text-ink-950 dark:text-cream sm:text-5xl">Guided checkout</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-700 dark:text-cream/65">
            Confirm your address, slot, payment, and order total.
          </p>
        </div>
        <CheckoutStepper steps={steps} currentStep={currentStep} onStepClick={(index) => index <= currentStep && setCurrentStep(index)} />

        {error ? (
          <div className="mt-5 rounded-2xl bg-masala-500 px-4 py-3 text-sm font-bold text-white">{error}</div>
        ) : null}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="glass-panel min-h-[460px] rounded-[34px] p-5 sm:p-7">
            <AnimatePresence mode="wait">
              {currentStep === 0 ? (
                <motion.div key="address" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                  <h2 className="flex items-center gap-2 font-display text-3xl font-black">
                    <MapPin size={24} /> Delivery Address
                  </h2>
                  <div className="mt-6 grid gap-4">
                    {addresses.map((address) => (
                      <button
                        type="button"
                        key={address.id}
                        onClick={() => setSelectedAddressId(address.id)}
                        className={[
                          "rounded-[26px] border p-5 text-left transition",
                          selectedAddressId === address.id
                            ? "border-flame-400 bg-flame-400/15"
                            : "border-ink-900/10 bg-white/65 dark:border-white/10 dark:bg-white/[0.06]",
                        ].join(" ")}
                      >
                        <span className="flex items-center gap-2 font-display text-xl font-black">
                          <Home size={19} /> {address.label}
                        </span>
                        <span className="mt-2 block text-sm font-semibold text-ink-700 dark:text-cream/65">{address.line}</span>
                        <span className="mt-1 block text-sm font-semibold text-ink-700 dark:text-cream/65">{address.instructions}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : null}

              {currentStep === 1 ? (
                <motion.div key="slot" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                  <h2 className="flex items-center gap-2 font-display text-3xl font-black">
                    <CalendarClock size={24} /> Delivery Slot Selection
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {slots.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setSlot(item)}
                        className={[
                          "rounded-[26px] border p-5 text-left font-bold transition",
                          slot === item
                            ? "border-flame-400 bg-flame-400/15"
                            : "border-ink-900/10 bg-white/65 dark:border-white/10 dark:bg-white/[0.06]",
                        ].join(" ")}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : null}

              {currentStep === 2 ? (
                <motion.div key="payment" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                  <h2 className="flex items-center gap-2 font-display text-3xl font-black">
                    <CreditCard size={24} /> Payment Method
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {payments.map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => setPaymentMethod(item)}
                        className={[
                          "rounded-[26px] border p-5 text-left font-bold transition",
                          paymentMethod === item
                            ? "border-flame-400 bg-flame-400/15"
                            : "border-ink-900/10 bg-white/65 dark:border-white/10 dark:bg-white/[0.06]",
                        ].join(" ")}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 rounded-[24px] bg-ink-950 p-5 text-cream">
                    <p className="flex items-center gap-2 font-bold text-flame-300">
                      <ShieldCheck size={18} /> Secure payment
                    </p>
                    <p className="mt-2 text-sm leading-6 text-cream/65">FoodDash mock payments validate your checkout path without processing money.</p>
                  </div>
                </motion.div>
              ) : null}

              {currentStep === 3 ? (
                <motion.div key="review" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
                  <h2 className="flex items-center gap-2 font-display text-3xl font-black">
                    <CheckCircle2 size={24} /> Review Order
                  </h2>
                  <div className="mt-6 space-y-4">
                    {items.map((item) => (
                      <div key={item.cartItemId} className="flex items-center gap-4 rounded-[24px] bg-white/70 p-3 dark:bg-white/[0.06]">
                        <img src={item.image} alt={item.name} className="h-20 w-20 rounded-2xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm text-ink-700 dark:text-cream/60">Qty {item.quantity}</p>
                        </div>
                        <p className="font-display text-xl font-black">{formatINR(item.finalPrice * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                  <label className="mt-6 block">
                    <span className="mb-2 flex items-center gap-2 text-sm font-extrabold">
                      <MessageSquareText size={17} /> Special Instructions
                    </span>
                    <textarea
                      rows={4}
                      value={specialInstructions}
                      onChange={(event) => setSpecialInstructions(event.target.value)}
                      placeholder="Extra spicy, less oil, no onion, separate packaging, less sugar..."
                      className="w-full resize-none rounded-3xl border border-ink-900/10 bg-white/80 p-4 text-sm font-semibold outline-none focus:border-flame-400 dark:border-white/10 dark:bg-white/[0.06]"
                    />
                  </label>
                </motion.div>
              ) : null}

              {currentStep === 4 ? (
                <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} className="grid min-h-[380px] place-items-center text-center">
                  <div>
                    <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mint-500 text-white">
                      <CheckCircle2 size={38} />
                    </span>
                    <h2 className="mt-6 font-display text-4xl font-black">Order confirmed</h2>
                    <p className="mt-3 text-sm font-semibold text-ink-700 dark:text-cream/65">
                      {confirmedOrder?.id} is on the kitchen screen.
                    </p>
                    <button type="button" onClick={() => navigate(`/tracking/${confirmedOrder.id}`)} className="flame-button mt-7 rounded-3xl px-7 py-4">
                      Track order live
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {currentStep < 4 ? (
              <div className="mt-8 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
                  disabled={currentStep === 0}
                  className="ghost-button disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Back
                </button>
                {currentStep === 3 ? (
                  <button type="button" onClick={placeFoodDashOrder} className="flame-button">
                    Place order
                  </button>
                ) : (
                  <button type="button" onClick={goNext} className="flame-button">
                    Continue
                  </button>
                )}
              </div>
            ) : null}
          </section>

          <aside className="glass-panel h-fit rounded-[34px] p-5 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-black">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm font-semibold text-ink-700 dark:text-cream/65">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(visibleTotals.subtotal)}</span></div>
              <div className="flex justify-between"><span>Delivery · {visibleTotals.deliveryEta}</span><span>{formatINR(visibleTotals.deliveryFee)}</span></div>
              <div className="flex justify-between"><span>Platform fee</span><span>{formatINR(visibleTotals.platformFee)}</span></div>
              <div className="flex justify-between"><span>Taxes</span><span>{formatINR(visibleTotals.taxes)}</span></div>
            </div>
            <div className="mt-5 border-t border-ink-900/10 pt-5 dark:border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-bold">Total</span>
                <span className="font-display text-3xl font-black">{formatINR(visibleTotals.total)}</span>
              </div>
            </div>
            <Link to="/cart" className="ghost-button mt-5 w-full">
              Edit cart
            </Link>
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}
