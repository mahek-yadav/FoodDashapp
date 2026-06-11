import { motion } from "framer-motion";
import { ArrowLeft, Bike, Clock, Heart, MapPin, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";
import DishCustomizationModal from "../components/food/DishCustomizationModal";
import DishCard from "../components/food/DishCard";
import StickyCategoryMenu from "../components/food/StickyCategoryMenu";
import { useUser } from "../context/UserContext";
import { useWishlist } from "../context/WishlistContext";
import { getDishesForRestaurant, getRestaurantBySlug } from "../data/mockData";
import { calculateDelivery, distanceFromRestaurant } from "../utils/delivery";
import { formatINR } from "../utils/currency";
import NotFoundPage from "./NotFoundPage";

export default function RestaurantDetailsPage() {
  const { slug } = useParams();
  const restaurant = getRestaurantBySlug(slug);
  const { selectedAddress } = useUser();
  const { isRestaurantSaved, toggleRestaurant } = useWishlist();
  const [activeDish, setActiveDish] = useState(null);
  const [activeCategory, setActiveCategory] = useState("");
  const sectionRefs = useRef({});

  const restaurantDishes = useMemo(
    () => (restaurant ? getDishesForRestaurant(restaurant.id) : []),
    [restaurant],
  );

  const menuCategories = useMemo(
    () => Array.from(new Set(restaurantDishes.map((dish) => dish.category))),
    [restaurantDishes],
  );

  useEffect(() => {
    if (menuCategories.length) setActiveCategory(menuCategories[0]);
  }, [menuCategories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target?.dataset?.category) {
          setActiveCategory(visible.target.dataset.category);
        }
      },
      { rootMargin: "-150px 0px -45% 0px", threshold: 0.2 },
    );

    Object.values(sectionRefs.current).forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [menuCategories]);

  if (!restaurant) return <NotFoundPage />;

  const distanceKm = distanceFromRestaurant(restaurant, selectedAddress);
  const delivery = calculateDelivery({ distanceKm, zone: restaurant.zone, cartValue: 0 });
  const saved = isRestaurantSaved(restaurant.id);

  const scrollToCategory = (category) => {
    setActiveCategory(category);
    sectionRefs.current[category]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-ink-950 text-cream">
        <img src={restaurant.image} alt={restaurant.name} className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
        <div className="page-shell relative py-10 sm:py-16">
          <Link to="/restaurants" className="ghost-button mb-8 border-white/15 bg-white/10 text-cream hover:text-flame-300">
            <ArrowLeft size={17} /> Restaurants
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <span className="pill bg-flame-gradient text-ink-950">{restaurant.offers[0]}</span>
              <h1 className="mt-5 font-display text-5xl font-black leading-tight sm:text-6xl">{restaurant.name}</h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-cream/70">{restaurant.description}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="pill bg-white/10 text-cream">
                  <Star className="text-flame-300" size={16} fill="currentColor" /> {restaurant.rating} · {restaurant.reviews} reviews
                </span>
                <span className="pill bg-white/10 text-cream">
                  <MapPin size={16} /> {restaurant.city}
                </span>
                <span className="pill bg-white/10 text-cream">
                  <Clock size={16} /> {delivery.eta}
                </span>
              </div>
            </div>
            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[30px] border border-white/10 bg-white/10 p-5 backdrop-blur-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-cream/60">Delivery estimate</p>
                  <p className="mt-1 font-display text-3xl font-black">{delivery.eta}</p>
                </div>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-flame-gradient text-ink-950">
                  <Bike size={25} />
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm font-bold">
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-cream/55">Fee</p>
                  <p className="text-lg text-cream">{formatINR(delivery.fee)}</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <p className="text-cream/55">Distance</p>
                  <p className="text-lg text-cream">{distanceKm} km</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleRestaurant(restaurant.id)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-3xl bg-cream px-5 py-4 text-sm font-black text-ink-950"
              >
                <Heart size={18} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save restaurant"}
              </button>
            </motion.aside>
          </div>
        </div>
      </section>

      <StickyCategoryMenu categories={menuCategories} activeCategory={activeCategory} onSelect={scrollToCategory} />

      <section className="section-pad">
        <div className="page-shell">
          {menuCategories.map((category) => {
            const categoryDishes = restaurantDishes.filter((dish) => dish.category === category);
            return (
              <section
                key={category}
                id={category}
                data-category={category}
                ref={(node) => {
                  sectionRefs.current[category] = node;
                }}
                className="scroll-mt-40 pb-12"
              >
                <div className="mb-5 flex items-end justify-between">
                  <div>
                    <p className="text-sm font-black uppercase text-flame-600 dark:text-flame-300">{categoryDishes.length} items</p>
                    <h2 className="font-display text-3xl font-black text-ink-950 dark:text-cream">{category}</h2>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryDishes.map((dish, index) => (
                    <DishCard key={dish.id} dish={dish} index={index} onCustomize={setActiveDish} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <DishCustomizationModal dish={activeDish} onClose={() => setActiveDish(null)} />
    </PageTransition>
  );
}
