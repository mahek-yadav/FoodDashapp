import PageTransition from "../components/common/PageTransition";
import SectionHeader from "../components/common/SectionHeader";
import NotificationCard from "../components/food/NotificationCard";
import { useNotifications } from "../context/NotificationsContext";

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllRead } = useNotifications();

  return (
    <PageTransition className="section-pad">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Notifications"
          title="Latest updates"
          description={`${unreadCount} unread FoodDash update${unreadCount === 1 ? "" : "s"}`}
          action={
            notifications.length ? (
              <button type="button" onClick={markAllRead} className="ghost-button">
                Mark all read
              </button>
            ) : null
          }
        />
        <div className="grid gap-4">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onRead={() => markAsRead(notification.id)}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
