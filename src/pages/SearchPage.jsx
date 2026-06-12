import { AnimatePresence, motion } from "framer-motion";
import { Filter, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EmptyState from "../components/common/EmptyState";
import PageTransition from "../components/common/PageTransition";
import SectionHeader from "../components/common/SectionHeader";
import CategorySlider from "../components/food/CategorySlider";
import DishCard from "../components/food/DishCard";
import DishCustomizationModal from "../components/food/DishCustomizationModal";
import RestaurantGrid from "../components/food/RestaurantGrid";
import SearchBar from "../components/food/SearchBar";
import { dishes, restaurants } from "../data/mockData";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "";
  const [query, setQuery] = useState(initialCategory);
  const [activeDish, setActiveDish] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    veg: "All",
    spice: "All",
    maxPrice: 500,
    minRating: 0,
  });

  const normalized = query.trim().toLowerCase();
  const matchedDishes = useMemo(
    () =>
      dishes.filter((dish) => {
        const text = [dish.name, dish.category, dish.description, dish.spice, ...dish.tags].join(" ").toLowerCase();
        const matchesQuery = !normalized || text.includes(normalized);
        const matchesVeg =
          filters.veg === "All" ||
          (filters.veg === "Vegetarian" && dish.veg) ||
          (filters.veg === "Non-Vegetarian" && !dish.veg);
        const matchesSpice = filters.spice === "All" || dish.spice === filters.spice;
        return matchesQuery && matchesVeg && matchesSpice && dish.price <= filters.maxPrice && dish.rating >= filters.minRating;
      }),
    [filters, normalized],
  );

  const matchedRestaurants = useMemo(
    () =>
      restaurants.filter((restaurant) =>
        [restaurant.name, restaurant.city, ...restaurant.cuisine].join(" ").toLowerCase().includes(normalized),
      ),
    [normalized],
  );

  const suggestions = ["Hyderabadi Biryani", "Masala Dosa", "Pav Bhaji", "Paneer Butter Masala", "Rasmalai"];

  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Search"
          title="Find dishes, restaurants, and cravings"
          description="Biryani, dosa, chaat, thalis, desserts, city favorites, and chef-led specials."
        />

        <div className="space-y-5">
          <SearchBar value={query} onChange={setQuery} onFilterClick={() => setFiltersOpen((open) => !open)} />
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="pill pill-brand"
              >
                {suggestion}
              </button>
            ))}
          </div>
          <CategorySlider activeCategory={query} compact onSelect={(category) => setQuery(category.name)} />
        </div>

        <AnimatePresence>
          {filtersOpen ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-panel mt-5 rounded-[30px] p-5">
                <h2 className="mb-5 flex items-center gap-2 font-display text-2xl font-black">
                  <Filter size={20} /> Advanced filtering
                </h2>
                <div className="grid gap-4 md:grid-cols-4">
                  <label className="grid gap-2 text-sm font-bold">
                    Vegetarian
                    <select value={filters.veg} onChange={(event) => setFilters((current) => ({ ...current, veg: event.target.value }))} className="rounded-2xl border border-ink-900/10 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/10">
                      {["All", "Vegetarian", "Non-Vegetarian"].map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Spice
                    <select value={filters.spice} onChange={(event) => setFilters((current) => ({ ...current, spice: event.target.value }))} className="rounded-2xl border border-ink-900/10 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/10">
                      {["All", "Mild", "Medium", "Spicy"].map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Price up to ₹{filters.maxPrice}
                    <input type="range" min="50" max="500" step="25" value={filters.maxPrice} onChange={(event) => setFilters((current) => ({ ...current, maxPrice: Number(event.target.value) }))} />
                  </label>
                  <label className="grid gap-2 text-sm font-bold">
                    Rating {filters.minRating}+
                    <input type="range" min="0" max="5" step="0.1" value={filters.minRating} onChange={(event) => setFilters((current) => ({ ...current, minRating: Number(event.target.value) }))} />
                  </label>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <section className="mt-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-sm font-black uppercase text-flame-600 dark:text-flame-300">{matchedDishes.length} dishes</p>
              <h2 className="font-display text-3xl font-black">Menu matches</h2>
            </div>
          </div>
          {matchedDishes.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {matchedDishes.map((dish, index) => (
                <DishCard key={dish.id} dish={dish} index={index} onCustomize={setActiveDish} />
              ))}
            </div>
          ) : (
            <EmptyState title="No dish found" description="Try another food name, category, spice level, or price range." />
          )}
        </section>

        <section className="mt-14">
          <div className="mb-5">
            <p className="text-sm font-black uppercase text-flame-600 dark:text-flame-300">{matchedRestaurants.length} restaurants</p>
            <h2 className="font-display text-3xl font-black">Restaurant matches</h2>
          </div>
          <RestaurantGrid restaurants={normalized ? matchedRestaurants : restaurants.slice(0, 3)} />
        </section>
      </div>
      <DishCustomizationModal dish={activeDish} onClose={() => setActiveDish(null)} />
    </PageTransition>
  );
}
