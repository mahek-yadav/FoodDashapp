import { CartProvider } from "./CartContext";
import { NotificationsProvider } from "./NotificationsContext";
import { OrdersProvider } from "./OrdersContext";
import { ThemeProvider } from "./ThemeContext";
import { UserProvider } from "./UserContext";
import { WishlistProvider } from "./WishlistContext";

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationsProvider>
          <OrdersProvider>
            <WishlistProvider>
              <CartProvider>{children}</CartProvider>
            </WishlistProvider>
          </OrdersProvider>
        </NotificationsProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
