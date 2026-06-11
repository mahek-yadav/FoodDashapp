import EmptyState from "../components/common/EmptyState";
import PageTransition from "../components/common/PageTransition";
import SectionHeader from "../components/common/SectionHeader";
import WishlistCard from "../components/food/WishlistCard";
import { useWishlist } from "../context/WishlistContext";
import { dishes, restaurants } from "../data/mockData";

export default function WishlistPage() {
  const { dishIds, restaurantIds, toggleDish, toggleRestaurant } = useWishlist();
  const savedRestaurants = restaurants.filter((restaurant) => restaurantIds.includes(restaurant.id));
  const savedDishes = dishes.filter((dish) => dishIds.includes(dish.id));
  const hasSaved = savedRestaurants.length || savedDishes.length;

  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Wishlist"
          title="Saved cravings"
          description="Return to the restaurants and plates you love most."
        />
        {hasSaved ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {savedRestaurants.map((restaurant) => (
              <WishlistCard
                key={restaurant.id}
                item={restaurant}
                type="restaurant"
                onRemove={() => toggleRestaurant(restaurant.id)}
              />
            ))}
            {savedDishes.map((dish) => (
              <WishlistCard key={dish.id} item={dish} type="dish" onRemove={() => toggleDish(dish.id)} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No saved items yet"
            description="Heart a dish or restaurant while browsing to collect favorites here."
            actionLabel="Browse restaurants"
            to="/restaurants"
          />
        )}
      </div>
    </PageTransition>
  );
}
