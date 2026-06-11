import { AnimatePresence, motion } from "framer-motion";
import { Filter, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import PageTransition from "../components/common/PageTransition";
import SectionHeader from "../components/common/SectionHeader";
import SkeletonCard from "../components/common/SkeletonCard";
import CategorySlider from "../components/food/CategorySlider";
import RestaurantGrid from "../components/food/RestaurantGrid";
import SearchBar from "../components/food/SearchBar";
import { restaurants } from "../data/mockData";

const initialFilters = {
  cuisine: "All",
  minRating: 0,
  maxPrice: 1000,
  maxDelivery: 60,
  dietary: "All",
  offersOnly: false,
  maxDistance: 10,
  sort: "Popularity",
};

export default function RestaurantsPage() {
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);

  const cuisineOptions = useMemo(
    () => ["All", ...Array.from(new Set(restaurants.flatMap((restaurant) => restaurant.cuisine)))],
    [],
  );

  const filteredRestaurants = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = restaurants.filter((restaurant) => {
      const matchesQuery =
        !normalized ||
        [restaurant.name, restaurant.city, restaurant.description, ...restaurant.cuisine]
          .join(" ")
          .toLowerCase()
          .includes(normalized);
      const matchesCuisine = filters.cuisine === "All" || restaurant.cuisine.includes(filters.cuisine);
      const matchesRating = restaurant.rating >= Number(filters.minRating);
      const matchesPrice = restaurant.priceForTwo <= Number(filters.maxPrice);
      const matchesDelivery = restaurant.deliveryTime <= Number(filters.maxDelivery);
      const matchesDiet =
        filters.dietary === "All" ||
        (filters.dietary === "Pure Veg" && restaurant.pureVeg) ||
        (filters.dietary === "Non-Vegetarian" && !restaurant.pureVeg);
      const matchesOffers = !filters.offersOnly || restaurant.offers.length > 0;
      const matchesDistance = restaurant.distanceKm <= Number(filters.maxDistance);

      return (
        matchesQuery &&
        matchesCuisine &&
        matchesRating &&
        matchesPrice &&
        matchesDelivery &&
        matchesDiet &&
        matchesOffers &&
        matchesDistance
      );
    });

    return [...filtered].sort((a, b) => {
      if (filters.sort === "Rating") return b.rating - a.rating;
      if (filters.sort === "Delivery Time") return a.deliveryTime - b.deliveryTime;
      if (filters.sort === "Price") return a.priceForTwo - b.priceForTwo;
      if (filters.sort === "Distance") return a.distanceKm - b.distanceKm;
      return b.reviews - a.reviews;
    });
  }, [filters, query]);

  useEffect(() => {
    setLoading(true);
    setVisibleCount(6);
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [filters, query]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((current) => Math.min(filteredRestaurants.length, current + 3));
        }
      },
      { rootMargin: "240px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [filteredRestaurants.length]);

  const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);

  const updateFilter = (key, value) => setFilters((current) => ({ ...current, [key]: value }));

  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Restaurant Discovery"
          title="Find Indian restaurants near you"
          description="Explore biryani houses, dosa corners, tandoor kitchens, street food counters, thali palaces, and coastal favorites."
        />

        <div className="space-y-5">
          <SearchBar value={query} onChange={setQuery} onFilterClick={() => setFiltersOpen((open) => !open)} />
          <CategorySlider
            compact
            activeCategory={filters.cuisine}
            onSelect={(category) => updateFilter("cuisine", category.name)}
          />
        </div>

        <AnimatePresence>
          {filtersOpen ? (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-panel mt-5 rounded-[30px] p-5">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <h2 className="flex items-center gap-2 font-display text-2xl font-black">
                    <Filter size={21} /> Filters
                  </h2>
                  <button type="button" onClick={() => setFilters(initialFilters)} className="ghost-button px-4 py-2">
                    <RotateCcw size={16} /> Reset
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <label className="grid gap-2 text-sm font-bold">
                    Cuisine
                    <select value={filters.cuisine} onChange={(event) => updateFilter("cuisine", event.target.value)} className="rounded-2xl border border-ink-900/10 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/10">
                      {cuisineOptions.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Rating {filters.minRating}+
                    <input type="range" min="0" max="5" step="0.1" value={filters.minRating} onChange={(event) => updateFilter("minRating", event.target.value)} />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Price up to ₹{filters.maxPrice}
                    <input type="range" min="250" max="1000" step="50" value={filters.maxPrice} onChange={(event) => updateFilter("maxPrice", event.target.value)} />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Delivery by {filters.maxDelivery} min
                    <input type="range" min="20" max="60" step="5" value={filters.maxDelivery} onChange={(event) => updateFilter("maxDelivery", event.target.value)} />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Dietary
                    <select value={filters.dietary} onChange={(event) => updateFilter("dietary", event.target.value)} className="rounded-2xl border border-ink-900/10 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/10">
                      {["All", "Pure Veg", "Non-Vegetarian"].map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Distance within {filters.maxDistance} km
                    <input type="range" min="1" max="10" step="1" value={filters.maxDistance} onChange={(event) => updateFilter("maxDistance", event.target.value)} />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Sort by
                    <select value={filters.sort} onChange={(event) => updateFilter("sort", event.target.value)} className="rounded-2xl border border-ink-900/10 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/10">
                      {["Popularity", "Rating", "Delivery Time", "Price", "Distance"].map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </label>
                  <label className="flex items-center gap-3 rounded-2xl border border-ink-900/10 bg-white/70 px-4 py-3 text-sm font-bold dark:border-white/10 dark:bg-white/10">
                    <input type="checkbox" checked={filters.offersOnly} onChange={(event) => updateFilter("offersOnly", event.target.checked)} />
                    Offers only
                  </label>
                </div>
              </div>
            </motion.section>
          ) : null}
        </AnimatePresence>

        <div className="mt-8">
          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <RestaurantGrid restaurants={visibleRestaurants} />
          )}
          <div ref={sentinelRef} className="h-14" />
        </div>
      </div>
    </PageTransition>
  );
}
