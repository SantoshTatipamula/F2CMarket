import { useMemo, useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Settings,
  LogOut,
  Heart,
  Plus,
  BarChart2,
  LayoutDashboard,
  Package,
  ClipboardList,
  Home,
  Store,
  Users,
  Info,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSearch } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import NotificationBell from "@/components/common/ui/NotificationBell";
import logo from "@/assets/logos/Logo.png";

/* ── NavBadge ──────────────────────────────────────────── */
function NavBadge({ count, color = "bg-orange-500" }) {
  if (!count) return null;
  return (
    <span
      className={`absolute -top-1.5 -right-1.5 ${color} text-white text-[9px] font-bold leading-none min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full ring-2 ring-[var(--bg)]`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

/* ── IconButton ────────────────────────────────────────── */
function IconButton({ to, onClick, children, title }) {
  const cls =
    "relative p-2.5 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] transition-all duration-150 flex items-center justify-center";
  if (to)
    return (
      <Link to={to} className={cls} title={title}>
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} className={cls} title={title}>
      {children}
    </button>
  );
}

/* ── SearchBar (desktop) ───────────────────────────────── */
function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 h-9 px-3 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/20 transition-all"
    >
      <button
        type="submit"
        className="shrink-0 text-[var(--text-secondary)] hover:text-[var(--primary)] transition"
      >
        <Search size={14} />
      </button>
      <input
        type="text"
        placeholder="Search…"
        value={value}
        onChange={onChange}
        className="bg-transparent outline-none border-none focus:ring-0 text-sm w-24 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
      />
    </form>
  );
}

/* ── RoleChip ──────────────────────────────────────────── */
function RoleChip({ role }) {
  const map = {
    consumer: "bg-emerald-100 text-emerald-700",
    farmer: "bg-amber-100 text-amber-700",
    admin: "bg-violet-100 text-violet-700",
  };
  if (!map[role]) return null;
  return (
    <span
      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${map[role]}`}
    >
      {role}
    </span>
  );
}

/* ── Nav links per role ────────────────────────────────── */
/*
  Navbar (primary actions — used constantly):
    Guest/Consumer : Home · Marketplace · Farmers · About
    Farmer         : Home · Marketplace · Dashboard · Add Product
    Admin          : Home · Dashboard · Users · Farmers · Products

  Profile dropdown (account + occasional tools):
    All roles      : Profile · My Products* · Orders* · Settings · Logout
    (* shown per role)
*/
function useNavLinks(role, user) {
  return useMemo(() => {
    switch (role) {
      case "farmer":
        if (user?.verificationStatus === "pending") {
          return [
            { label: "Home", to: "/", icon: Home },
            {
              label: "My Account",
              to: "/farmer/pending",
              icon: LayoutDashboard,
            },
          ];
        }
        return [
          { label: "Home", to: "/", icon: Home },
          { label: "Marketplace", to: "/products", icon: Store },
          {
            label: "Dashboard",
            to: "/farmer/dashboard",
            icon: LayoutDashboard,
          },
          { label: "Add Product", to: "/farmer/products/add", icon: Plus },
        ];
      case "admin":
        return [
          { label: "Home", to: "/", icon: Home },
          { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
          { label: "Users", to: "/admin/users", icon: Users },
          { label: "Farmers", to: "/admin/farmers", icon: Store },
          { label: "Products", to: "/admin/products", icon: Package },
        ];
      default: // guest + consumer
        return [
          { label: "Home", to: "/", icon: Home },
          { label: "Marketplace", to: "/products", icon: Store },
          { label: "Farmers", to: "/farmers", icon: Users },
          { label: "About", to: "/about", icon: Info },
        ];
    }
  }, [role, user?.verificationStatus]);
}

/* ── Dropdown items per role ───────────────────────────── */
function useDropdownItems(role, user) {
  return useMemo(() => {
    switch (role) {
      case "farmer":
        if (user?.verificationStatus === "pending") {
          return [
            { label: "My Account", to: "/farmer/pending", icon: User },
            { label: "Settings", to: "/profile/settings", icon: Settings },
          ];
        }
        return [
          { label: "Profile", to: "/profile", icon: User },
          { label: "My Products", to: "/farmer/products", icon: Package },
          { label: "Orders", to: "/farmer/orders", icon: ClipboardList },
          { label: "Analytics", to: "/farmer/analytics", icon: BarChart2 },
          { label: "Settings", to: "/profile/settings", icon: Settings },
        ];
      case "admin":
        return [
          { label: "Profile", to: "/profile", icon: User },
          { label: "Settings", to: "/profile/settings", icon: Settings },
        ];
      default: // consumer
        return [
          { label: "Profile", to: "/profile", icon: User },
          { label: "Orders", to: "/orders", icon: ClipboardList },
          { label: "Settings", to: "/profile/settings", icon: Settings },
        ];
    }
  }, [role, user?.verificationStatus]);
}

/* ── Main Navbar ───────────────────────────────────────── */
export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const mobileSearchRef = useRef(null);

  /* Close drawer on every route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const role = user?.role;
  const isAdmin = role === "admin";
  const showCartWishlist = !isAdmin;

  const navLinks = useNavLinks(role);
  const dropdownItems = useDropdownItems(role, user);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim())
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const navLinkCls = ({ isActive }) =>
    `relative pb-0.5 text-[13px] font-medium transition-colors duration-150 whitespace-nowrap ${
      isActive
        ? "text-[var(--primary)] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-[var(--primary)]"
        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
    }`;

  const drawerNavCls = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-medium transition-all min-h-[44px] ${
      isActive
        ? "bg-[var(--primary)]/10 text-[var(--primary)]"
        : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
    }`;

  const drawerLinkCls =
    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[15px] font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--primary)] transition-all min-h-[44px]";

  return (
    <>
      {/* ══ Header ════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur-2xl border-b border-[var(--border)] shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-[60px] flex items-center justify-between gap-2">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src={logo}
              alt="F2CMARKET"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* ── Desktop Nav Links ── */}
          <ul className="hidden lg:flex items-center gap-5">
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} className={navLinkCls} end={to === "/"}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Desktop Actions ── */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={handleSearch}
            />

            {/* Guest buttons */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="h-9 px-3 rounded-xl border border-[var(--border-strong)] text-sm font-medium flex items-center gap-1.5 hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all"
                >
                  <User size={14} /> Login
                </Link>
                <Link
                  to="/register"
                  className="h-9 px-3 rounded-xl bg-[var(--primary)] text-white text-sm font-medium flex items-center hover:bg-[var(--primary-hover)] transition-all"
                >
                  Register
                </Link>
              </>
            )}

            {/* Bell */}
            {user && <NotificationBell />}

            {/* Wishlist + Cart */}
            {showCartWishlist && (
              <>
                <IconButton to="/wishlist" title="Wishlist">
                  <Heart size={18} />
                  <NavBadge count={wishlistCount} color="bg-red-500" />
                </IconButton>
                <IconButton to="/cart" title="Cart">
                  <ShoppingCart size={18} />
                  <NavBadge count={cartCount} />
                </IconButton>
              </>
            )}

            {/* Avatar + Dropdown */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="
    h-9 w-9
    overflow-hidden
    rounded-full
    border border-[var(--border)]
    bg-[var(--surface-2)]
    hover:opacity-90
    transition
    focus:outline-none
  "
                  >
                    <img
                      src={
                        user?.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user?.name || "User",
                        )}`
                      }
                      alt={user?.name}
                      className="h-full w-full object-cover"
                    />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-52 rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-xl p-1"
                >
                  {/* User info */}
                  <DropdownMenuLabel className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold leading-tight truncate">
                        {user.name || "My Account"}
                      </p>
                      <RoleChip role={role} />
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] truncate mt-0.5">
                      {user.email}
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {dropdownItems.map(({ label, to, icon: Icon }) => (
                    <DropdownMenuItem key={to} asChild>
                      <Link
                        to={to}
                        className="flex items-center gap-2 cursor-pointer rounded-xl"
                      >
                        <Icon size={15} /> {label}
                      </Link>
                    </DropdownMenuItem>
                  ))}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-2 text-red-500 focus:text-red-500 cursor-pointer rounded-xl"
                  >
                    <LogOut size={15} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* ── Mobile Top Bar ──────────────────────────────
              Only 3 items: Bell + Cart + Hamburger
              Logo ~120px + 3×40px + padding = safe for 360px
          ── */}
          <div className="lg:hidden flex items-center gap-0.5">
            {user && <NotificationBell />}

            {showCartWishlist && (
              <IconButton to="/cart" title="Cart">
                <ShoppingCart size={21} />
                <NavBadge count={cartCount} />
              </IconButton>
            )}

            <button
              onClick={() => setMenuOpen((m) => !m)}
              className="p-2.5 rounded-xl hover:bg-[var(--surface-2)] transition flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ══ Overlay ═══════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* ══ Drawer ════════════════════════════════════════ */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-[var(--bg)] z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <img src={logo} alt="F2CMARKET" className="h-9 w-auto" />
          <button
            onClick={() => setMenuOpen(false)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-[var(--surface-2)] transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search inside drawer */}
        <div className="px-3 pt-3">
          <form
            onSubmit={(e) => {
              handleSearch(e);
              setMenuOpen(false);
            }}
            className="flex items-center gap-2 h-11 px-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] focus-within:border-[var(--primary)] transition"
          >
            <Search
              size={15}
              className="shrink-0 text-[var(--text-secondary)]"
            />
            <input
              ref={mobileSearchRef}
              type="text"
              placeholder="Search fresh products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none focus:ring-0 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
            />
          </form>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-3 pt-2 space-y-0.5">
          {/* Nav links */}
          {navLinks.map(({ label, to, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === "/"} className={drawerNavCls}>
              {Icon && <Icon size={17} className="shrink-0" />}
              {label}
            </NavLink>
          ))}

          {/* Wishlist + Cart */}
          {showCartWishlist && (
            <>
              <div className="h-px bg-[var(--border)] my-2 mx-1" />
              <Link to="/wishlist" className={drawerLinkCls}>
                <Heart size={17} className="shrink-0" />
                <span className="flex-1">Wishlist</span>
                {!!wishlistCount && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className={drawerLinkCls}>
                <ShoppingCart size={17} className="shrink-0" />
                <span className="flex-1">Cart</span>
                {!!cartCount && (
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* Guest CTA */}
          {!user && (
            <div className="pt-4 px-1 space-y-2">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 h-11 rounded-xl border border-[var(--border-strong)] text-sm font-medium hover:bg-[var(--surface-2)] transition"
              >
                <User size={16} /> Login
              </Link>
              <Link
                to="/register"
                className="flex items-center justify-center gap-2 h-11 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Drawer Footer — logged-in user */}
        {user && (
          <div className="border-t border-[var(--border)] p-3 space-y-0.5">
            {/* Avatar + name + role */}
            <div className="flex items-center gap-3 px-3 py-2 mb-1">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-2)]">
                <img
                  src={
                    user?.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.name || "User",
                    )}`
                  }
                  alt={user?.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                    {user.name || "My Account"}
                  </p>
                  <RoleChip role={role} />
                </div>
                <p className="text-xs text-[var(--text-secondary)] truncate">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Dropdown items mirrored in drawer */}
            {dropdownItems.map(({ label, to, icon: Icon }) => (
              <Link key={to} to={to} className={drawerLinkCls}>
                <Icon size={17} /> {label}
              </Link>
            ))}

            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-red-500 hover:bg-red-50 transition min-h-[44px] text-[15px] font-medium"
            >
              <LogOut size={17} /> Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
