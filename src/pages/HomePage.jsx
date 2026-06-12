import { motion } from "framer-motion";
import { ArrowRight, Bike, Clock, Gift, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AnimatedCounter from "../components/common/AnimatedCounter";
import PageTransition from "../components/common/PageTransition";
import SectionHeader from "../components/common/SectionHeader";
import CategorySlider from "../components/food/CategorySlider";
import ChefCard from "../components/food/ChefCard";
import FeaturedDishes from "../components/food/FeaturedDishes";
import OfferBanner from "../components/food/OfferBanner";
import RestaurantGrid from "../components/food/RestaurantGrid";
import ReviewCarousel from "../components/food/ReviewCarousel";
import { assets, chefs, offers, restaurants } from "../data/mockData";

export default function HomePage() {
  const navigate = useNavigate();
  const featuredRestaurants = restaurants.slice(0, 6);

  return (
    <PageTransition>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-warm" />
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{ backgroundImage: `url(${assets.heroFeast})`, backgroundPosition: 'right center' }}
          aria-hidden="true"
        />
        {/* left-side fade overlay for contrast */}
        <div className="absolute inset-0 hero-left-fade" aria-hidden="true" />
        <div className="page-shell relative grid min-h-[calc(100vh-5rem)] items-center gap-10 py-12 lg:grid-cols-[.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="pill mb-5 pill-illustrious backdrop-blur-xl">
              India&apos;s Fastest Way To Satisfy Your Cravings
            </span>
            <h1 className="font-display text-5xl font-black leading-tight text-cream sm:text-6xl lg:text-7xl">
              Discover India&apos;s Most Loved Food
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-cream/72 sm:text-lg">
              Premium Indian restaurants, dish customization, instant checkout, and live rider tracking in one elegant FoodDash experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/restaurants" className="flame-button rounded-2xl px-6 py-4">
                Order Now <ArrowRight size={19} />
              </Link>
              <Link to="/search" className="ghost-button rounded-2xl border-white/15 bg-white/10 px-6 py-4 text-cream hover:text-flame-300">
                Explore Menu
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {[
                ["Orders", 120, "k+"],
                ["Restaurants", 10, "+"],
                ["Avg ETA", 24, "m"],
              ].map(([label, value, suffix]) => (
                <div key={label} className="rounded-[24px] border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl">
                  <p className="font-display text-3xl font-black text-cream">
                    <AnimatedCounter value={value} suffix={suffix} />
                  </p>
                  <p className="mt-1 text-xs font-bold text-cream/55">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Overlays above the background */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-2 bottom-8 rounded-[26px] border border-white/15 bg-ink-950/80 p-4 text-cream shadow-card backdrop-blur-xl sm:left-4"
            >
              <p className="flex items-center gap-2 text-sm font-bold text-flame-300">
                <Bike size={17} /> Express delivery
              </p>
              <p className="mt-1 font-display text-2xl font-black">18-32 min</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-8 rounded-[26px] border border-white/15 bg-cream p-4 text-ink-950 shadow-card sm:right-8"
            >
              <p className="flex items-center gap-2 text-sm font-black">
                <Star className="text-flame-500" size={17} fill="currentColor" /> 4.9
              </p>
              <p className="mt-1 text-xs font-bold text-ink-700">Loved by foodies</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Food Categories"
            title="Choose your craving"
            description="North Indian thalis, crisp dosas, smoky tandoor plates, chaat, biryani, desserts, and more."
          />
          <CategorySlider onSelect={(category) => navigate(`/search?category=${encodeURIComponent(category.name)}`)} />
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="page-shell">
          <SectionHeader
            eyebrow="Popular Near You"
            title="Featured Restaurants"
            description="Indian restaurants with fast delivery windows, high ratings, and active FoodDash offers."
            action={
              <Link to="/restaurants" className="ghost-button">
                View all <ArrowRight size={17} />
              </Link>
            }
          />
          <RestaurantGrid restaurants={featuredRestaurants} />
        </div>
      </section>

      <FeaturedDishes />

      <section className="section-pad pt-0">
        <div className="page-shell">
          <SectionHeader eyebrow="Limited-Time Offers" title="Special Offers" />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {offers.map((offer, index) => (
              <OfferBanner key={offer.id} offer={offer} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="page-shell">
          <SectionHeader eyebrow="Chef Recommendations" title="Meet Our Chefs" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {chefs.map((chef, index) => (
              <ChefCard key={chef.id} chef={chef} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="page-shell">
          <SectionHeader eyebrow="Customer Reviews" title="Food lovers trust FoodDash" />
          <ReviewCarousel />
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="page-shell">
          <div className="grid items-center gap-8 overflow-hidden rounded-[40px] bg-ink-950 p-6 text-cream shadow-card lg:grid-cols-[1fr_.8fr] lg:p-10">
            <div>
              <span className="pill pill-brand">
                <Gift size={16} /> Download App
              </span>
              <h2 className="mt-5 font-display text-4xl font-black sm:text-5xl">FoodDash in your pocket.</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/65">
                Lunch runs, late-night cravings, festival specials, and family dinners all move faster with a focused mobile plate.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  [Clock, "Fast checkout"],
                  [ShieldCheck, "Secure payments"],
                  [Bike, "Live rider map"],
                ].map(([Icon, label]) => (
                  <span key={label} className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold">
                    <Icon size={17} /> {label}
                  </span>
                ))}
              </div>
            </div>
            <img src={assets.appPhone} alt="FoodDash mobile app preview" className="mx-auto max-h-[520px] w-full max-w-sm object-contain" />
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
