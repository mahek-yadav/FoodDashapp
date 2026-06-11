import EmptyState from "../components/common/EmptyState";
import PageTransition from "../components/common/PageTransition";
import SectionHeader from "../components/common/SectionHeader";
import OrderHistoryCard from "../components/food/OrderHistoryCard";
import { useOrders } from "../context/OrdersContext";

export default function OrderHistoryPage() {
  const { orders } = useOrders();

  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Order History"
          title="Recently ordered"
          description="Track active deliveries, reorder favorites, and review past FoodDash orders."
        />
        {orders.length ? (
          <div className="grid gap-4">
            {orders.map((order) => (
              <OrderHistoryCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyState title="No orders yet" description="Your completed and active orders will appear here." />
        )}
      </div>
    </PageTransition>
  );
}
