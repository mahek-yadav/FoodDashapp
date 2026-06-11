import { Home, MapPin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import PageTransition from "../components/common/PageTransition";
import SectionHeader from "../components/common/SectionHeader";
import { useUser } from "../context/UserContext";

export default function SavedAddressesPage() {
  const { addresses, selectedAddressId, setSelectedAddressId, addAddress, removeAddress } = useUser();
  const [form, setForm] = useState({ label: "", line: "", phone: "", instructions: "" });

  const submit = (event) => {
    event.preventDefault();
    if (!form.label || !form.line) return;
    addAddress({
      ...form,
      coordinates: { lat: 19.076, lng: 72.8777 },
      zone: "standard",
    });
    setForm({ label: "", line: "", phone: "", instructions: "" });
  };

  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        <SectionHeader eyebrow="Saved Addresses" title="Delivery locations" />
        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <section className="grid gap-4">
            {addresses.map((address) => (
              <article key={address.id} className="glass-panel rounded-[28px] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="flex items-center gap-2 font-display text-2xl font-black">
                      <Home size={20} /> {address.label}
                    </h2>
                    <p className="mt-2 flex gap-2 text-sm leading-6 text-ink-700 dark:text-cream/65">
                      <MapPin className="mt-1 shrink-0" size={15} /> {address.line}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink-700 dark:text-cream/60">{address.instructions}</p>
                  </div>
                  <button type="button" onClick={() => removeAddress(address.id)} className="text-masala-500" aria-label="Remove address">
                    <Trash2 size={19} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAddressId(address.id)}
                  className={selectedAddressId === address.id ? "flame-button mt-5 px-4 py-2" : "ghost-button mt-5 px-4 py-2"}
                >
                  {selectedAddressId === address.id ? "Selected" : "Deliver here"}
                </button>
              </article>
            ))}
          </section>

          <form onSubmit={submit} className="glass-panel h-fit rounded-[34px] p-5 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-black">Add address</h2>
            <div className="mt-5 grid gap-3">
              {[
                ["label", "Label"],
                ["line", "Address line"],
                ["phone", "Phone"],
                ["instructions", "Delivery instructions"],
              ].map(([key, label]) => (
                <label key={key} className="grid gap-2 text-sm font-bold">
                  {label}
                  <input
                    value={form[key]}
                    onChange={(event) => setForm((current) => ({ ...current, [key]: event.target.value }))}
                    className="rounded-2xl border border-ink-900/10 bg-white/80 px-4 py-3 outline-none focus:border-flame-400 dark:border-white/10 dark:bg-white/10"
                  />
                </label>
              ))}
            </div>
            <button type="submit" className="flame-button mt-5 w-full">
              <Plus size={18} /> Save address
            </button>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}
