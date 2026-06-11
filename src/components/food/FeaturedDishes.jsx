import { useState } from "react";
import { dishes } from "../../data/mockData";
import SectionHeader from "../common/SectionHeader";
import DishCard from "./DishCard";
import DishCustomizationModal from "./DishCustomizationModal";

export default function FeaturedDishes({ title = "Trending Dishes", subtitle, limit = 6, filter }) {
  const [activeDish, setActiveDish] = useState(null);
  const visibleDishes = dishes
    .filter((dish) => (filter ? filter(dish) : dish.bestseller || dish.rating >= 4.6))
    .slice(0, limit);

  return (
    <section className="section-pad">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Recommended For You"
          title={title}
          description={subtitle ?? "Chef-picked dishes with rich flavors, fast prep times, and FoodDash best-seller signals."}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDishes.map((dish, index) => (
            <DishCard key={dish.id} dish={dish} index={index} onCustomize={setActiveDish} />
          ))}
        </div>
      </div>
      <DishCustomizationModal dish={activeDish} onClose={() => setActiveDish(null)} />
    </section>
  );
}
