import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, Package, ShoppingBag, Info, Trash2 } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "@/services/notificationService";

const TYPE_ICON = {
  order_placed:    { icon: ShoppingBag, bg: "bg-green-100",  color: "text-green-600"  },
  order_cancelled: { icon: Package,     bg: "bg-red-100",    color: "text-red-600"    },
  order_status:    { icon: Package,     bg: "bg-blue-100",   color: "text-blue-600"   },
  general:         { icon: Info,        bg: "bg-gray-100",   color: "text-gray-600"   },
};

export default function NotificationBell() {
  const { user }            = useAuth();
  const navigate            = useNavigate();
  const [open, setOpen]     = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const ref                 = useRef(null);

  const load = () => {
    if (!user?.id) return;
    setNotifications(getNotifications(user.id));
    setUnread(getUnreadCount(user.id));
  };

  useEffect(() => {
    load();
    /* Poll every 5s so status changes from farmer reflect here */
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [user]);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleRead = (n) => {
    if (!n.read) {
      markAsRead(n.id);
      load();
    }
    if (n.orderId) {
      navigate("/orders");
      setOpen(false);
    }
  };

  const handleMarkAll = () => {
    markAllAsRead(user.id);
    load();
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    deleteNotification(id);
    load();
  };

  if (!user) return null;

  return (
    <div ref={ref} className="relative">
      {/* Bell button */}
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-xl hover:bg-[var(--surface-2)] transition"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-12 z-50 w-[340px] sm:w-[380px] bg-white border border-[var(--border)] rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
            <div>
              <h3 className="font-bold text-[var(--text-primary)]">Notifications</h3>
              {unread > 0 && (
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{unread} unread</p>
              )}
            </div>
            {unread > 0 && (
              <button
                onClick={handleMarkAll}
                className="flex items-center gap-1.5 text-xs font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] transition"
              >
                <CheckCheck size={14} />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-[var(--border)]">
            {notifications.length === 0 ? (
              <div className="py-12 text-center">
                <Bell size={28} className="mx-auto text-[var(--text-muted)] mb-3" />
                <p className="text-sm text-[var(--text-muted)]">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => {
                const config = TYPE_ICON[n.type] || TYPE_ICON.general;
                const Icon   = config.icon;

                return (
                  <div
                    key={n.id}
                    onClick={() => handleRead(n)}
                    className={`flex items-start gap-3 px-5 py-4 cursor-pointer transition hover:bg-[var(--surface)] ${
                      !n.read ? "bg-green-50/50" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div className={`shrink-0 h-9 w-9 rounded-xl flex items-center justify-center ${config.bg}`}>
                      <Icon size={16} className={config.color} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold leading-tight ${
                        !n.read ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
                      }`}>
                        {n.title}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-1 leading-5 line-clamp-2">
                        {n.message}
                      </p>
                      <p className="text-[10px] text-[var(--text-muted)] mt-1.5">
                        {new Date(n.createdAt).toLocaleString("en-IN", {
                          day: "numeric", month: "short",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* Unread dot + delete */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      {!n.read && (
                        <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                      )}
                      <button
                        onClick={(e) => handleDelete(e, n.id)}
                        className="p-1 rounded-lg text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 transition"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-5 py-3 border-t border-[var(--border)] text-center">
              <button
                onClick={() => { navigate("/orders"); setOpen(false); }}
                className="text-xs font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] transition"
              >
                View all orders →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
