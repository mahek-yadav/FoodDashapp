import { Award, Coins, Mail, Phone } from "lucide-react";
import { useUser } from "../../context/UserContext";

export default function ProfileCard() {
  const { profile } = useUser();

  return (
    <div className="glass-panel rounded-[34px] p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <span className="grid h-24 w-24 place-items-center rounded-[30px] bg-flame-gradient font-display text-3xl font-black text-ink-950">
          {profile.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-4xl font-black text-ink-950 dark:text-cream">{profile.name}</h1>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-ink-700 dark:text-cream/65">
            <Mail size={15} /> {profile.email}
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-ink-700 dark:text-cream/65">
            <Phone size={15} /> {profile.phone}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-[24px] bg-ink-950/5 p-4 dark:bg-white/10">
          <p className="flex items-center gap-2 text-sm font-bold text-ink-700 dark:text-cream/65">
            <Coins size={16} /> DashCoins
          </p>
          <p className="mt-2 font-display text-3xl font-black">{profile.dashCoins}</p>
        </div>
        <div className="rounded-[24px] bg-ink-950/5 p-4 dark:bg-white/10">
          <p className="flex items-center gap-2 text-sm font-bold text-ink-700 dark:text-cream/65">
            <Award size={16} /> Loyalty tier
          </p>
          <p className="mt-2 font-display text-3xl font-black">{profile.loyaltyTier}</p>
        </div>
      </div>
    </div>
  );
}
