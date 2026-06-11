import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [dishIds, setDishIds] = useLocalStorage("fooddash-wishlist-dishes", []);
  const [restaurantIds, setRestaurantIds] = useLocalStorage("fooddash-wishlist-restaurants", []);

  const toggleDish = (id) => {
    setDishIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const toggleRestaurant = (id) => {
    setRestaurantIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const value = {
    dishIds,
    restaurantIds,
    toggleDish,
    toggleRestaurant,
    isDishSaved: (id) => dishIds.includes(id),
    isRestaurantSaved: (id) => restaurantIds.includes(id),
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
}
