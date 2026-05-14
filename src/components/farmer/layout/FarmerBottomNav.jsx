import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  User,
} from "lucide-react";

const navItems = [
  {
    label: "Home",
    to: "/farmer/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    to: "/farmer/products",
    icon: Package,
  },
  {
    label: "Add",
    to: "/farmer/products/add",
    icon: PlusCircle,
    primary: true,
  },
  {
    label: "Orders",
    to: "/farmer/orders",
    icon: ShoppingBag,
  },
  {
    label: "Profile",
    to: "/farmer/profile",
    icon: User,
  },
];

export default function FarmerBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg)]/95 backdrop-blur-2xl">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 text-xs transition ${
                  isActive
                    ? "text-[var(--primary)]"
                    : "text-[var(--text-secondary)]"
                }`
              }
            >
              <div
                className={`flex items-center justify-center rounded-full ${
                  item.primary
                    ? "h-11 w-11 bg-[var(--primary)] text-white shadow-lg"
                    : "h-9 w-9"
                }`}
              >
                <Icon size={20} />
              </div>

              {!item.primary && (
                <span>{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}