import { Gift, Share2, Sparkles, Trophy } from "lucide-react";
import PageTransition from "../components/common/PageTransition";
import SectionHeader from "../components/common/SectionHeader";
import OfferBanner from "../components/food/OfferBanner";
import { offers } from "../data/mockData";

export default function OffersPage() {
  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Offers"
          title="Coupons, referrals, and festival specials"
          description="Use premium FoodDash rewards across Indian favorites, limited-time menus, and repeat orders."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {offers.map((offer, index) => (
            <OfferBanner key={offer.id} offer={offer} index={index} />
          ))}
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {[
            [Trophy, "Loyalty Program", "Gold members earn 2x DashCoins on chef specials and weekend carts."],
            [Share2, "Referral Rewards", "Invite friends and unlock wallet credits after their first FoodDash order."],
            [Sparkles, "AI Recommendations", "Get offer pairings around your recent dishes, saved restaurants, and cravings."],
          ].map(([Icon, title, body]) => (
            <article key={title} className="glass-panel rounded-[30px] p-6">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-flame-gradient text-ink-950">
                <Icon size={22} />
              </span>
              <h2 className="mt-5 font-display text-2xl font-black">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-ink-700 dark:text-cream/65">{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[34px] bg-ink-950 p-8 text-cream">
          <p className="flex items-center gap-2 text-sm font-black uppercase text-flame-300">
            <Gift size={17} /> Limited-Time Offers
          </p>
          <h2 className="mt-4 font-display text-4xl font-black">Festival thalis, biryani weeks, and dessert bundles.</h2>
        </div>
      </div>
    </PageTransition>
  );
}
