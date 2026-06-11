import { Link, useParams } from "react-router-dom";
import DeliveryTracker from "../components/checkout/DeliveryTracker";
import EmptyState from "../components/common/EmptyState";
import PageTransition from "../components/common/PageTransition";
import { useOrders } from "../context/OrdersContext";

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const { getOrderById, orders } = useOrders();
  const order = getOrderById(orderId) ?? orders[0];

  if (!order) {
    return (
      <PageTransition className="section-pad">
        <EmptyState title="No active order" description="Place an order to open the live delivery tracker." to="/restaurants" />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        {order.id !== orderId ? (
          <div className="mb-5 rounded-2xl bg-flame-400/15 px-4 py-3 text-sm font-bold text-ink-800 dark:text-flame-200">
            Showing your latest order. <Link to={`/tracking/${order.id}`} className="underline">Open direct tracking link</Link>
          </div>
        ) : null}
        <DeliveryTracker order={order} />
      </div>
    </PageTransition>
  );
}
