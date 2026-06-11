import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const CartContext = createContext(null);

function makeCartItemId(dish, configuration) {
  const configKey = JSON.stringify(configuration ?? {});
  const suffix = configKey.replace(/[^a-zA-Z0-9]/g, "").slice(0, 28) || "classic";
  return `${dish.id}-${configKey.length}-${suffix}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage("fooddash-cart", []);
  const [cartOpen, setCartOpen] = useLocalStorage("fooddash-cart-open", false);

  const addItem = (dish, configuration = {}, quantity = 1, options = { openCart: true }) => {
    const finalPrice = configuration.finalPrice ?? dish.price;
    const itemId = makeCartItemId(dish, configuration);

    setItems((current) => {
      const existing = current.find((item) => item.cartItemId === itemId);
      if (existing) {
        return current.map((item) =>
          item.cartItemId === itemId
            ? { ...item, quantity: item.quantity + quantity, updatedAt: Date.now() }
            : item,
        );
      }

      return [
        ...current,
        {
          cartItemId: itemId,
          dishId: dish.id,
          restaurantId: dish.restaurantId,
          name: dish.name,
          image: dish.image,
          veg: dish.veg,
          basePrice: dish.price,
          finalPrice,
          configuration,
          quantity,
          addedAt: Date.now(),
          updatedAt: Date.now(),
        },
      ];
    });
    // Defer opening the cart to the next tick to avoid focus/scroll races
    // when callers add items from an active modal/dialog.
    if (options.openCart) {
      setTimeout(() => setCartOpen(true), 0);
    }
  };

  const removeItem = (cartItemId) => {
    setItems((current) => current.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) {
      removeItem(cartItemId);
      return;
    }

    setItems((current) =>
      current.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((total, item) => total + item.finalPrice * item.quantity, 0);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const value = {
    items,
    itemCount,
    subtotal,
    cartOpen,
    setCartOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
