import { createContext, useContext } from "react";
import { orderStatuses } from "../data/mockData";
import { useLocalStorage } from "../hooks/useLocalStorage";

const OrdersContext = createContext(null);

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useLocalStorage("fooddash-orders", []);

  const placeOrder = ({ items, totals, address, slot, paymentMethod, specialInstructions }) => {
    const order = {
      id: `FD-${Date.now().toString().slice(-7)}`,
      items,
      totals,
      address,
      slot,
      paymentMethod,
      specialInstructions,
      status: orderStatuses[0],
      placedAt: new Date().toISOString(),
      rider: {
        name: "Ravi Sharma",
        phone: "+91 90000 11223",
        vehicle: "Electric scooter",
      },
    };

    setOrders((current) => [order, ...current]);
    return order;
  };

  const updateOrderStatus = (id, status) => {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, status } : order)));
  };

  const value = {
    orders,
    placeOrder,
    updateOrderStatus,
    getOrderById: (id) => orders.find((order) => order.id === id),
  };

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used within OrdersProvider");
  return context;
}
