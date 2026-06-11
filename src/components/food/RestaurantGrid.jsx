import EmptyState from "../common/EmptyState";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantGrid({ restaurants }) {
  if (!restaurants.length) {
    return (
      <EmptyState
        title="No restaurants match"
        description="Try a different cuisine, rating, delivery time, or offer filter."
        actionLabel="Reset discovery"
        to="/restaurants"
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {restaurants.map((restaurant, index) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} index={index} />
      ))}
    </div>
  );
}
