import { useMemo, useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
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
  ChartColumn,
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

import logo from "@/assets/logos/Logo.png";

/* ──────────────────────────────────────────────
   NavBadge — handles 1-99+ display
────────────────────────────────────────────── */
function NavBadge({ count, color = "bg-orange-500" }) {
  if (!count) return null;
  const label = count > 99 ? "99+" : count;
  return (
    <span
      className={`
        absolute -top-1.5 -right-1.5
        ${color}
        text-white text-[9px] font-bold leading-none
        min-w-[18px] h-[18px]
        flex items-center justify-center
        px-1 rounded-full
        ring-2 ring-[var(--bg)]
      `}
    >
      {label}
    </span>
  );
}

/* ──────────────────────────────────────────────
   IconButton — consistent icon action button
────────────────────────────────────────────── */
function IconButton({ to, onClick, children, className = "", title }) {
  const base = `
    relative p-2.5 rounded-xl
    text-[var(--text-secondary)]
    hover:text-[var(--text-primary)]
    hover:bg-[var(--surface-2)]
    transition-all duration-150
    ${className}
  `;
  if (to) {
    return (
      <Link to={to} className={base} title={title}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={base} title={title}>
      {children}
    </button>
  );
}

/* ──────────────────────────────────────────────
   SearchBar
────────────────────────────────────────────── */
function SearchBar({ value, onChange, onSubmit, className = "" }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`
        flex items-center gap-2
        h-10 px-3
        rounded-xl
        border border-[var(--border-strong)]
        bg-[var(--surface)]
        transition-all duration-150
        focus-within:border-[var(--primary)]
        focus-within:ring-2 focus-within:ring-[var(--primary)]/20
        ${className}
      `}
    >
      <button type="submit" className="shrink-0 text-[var(--text-secondary)] hover:text-[var(--primary)] transition">
        <Search size={16} />
      </button>
      <input
        type="text"
        placeholder="Search fresh products…"
        value={value}
        onChange={onChange}
        className="
          bg-transparent outline-none border-none focus:ring-0
          text-sm w-40
          text-[var(--text-primary)]
          placeholder:text-[var(--text-secondary)]
        "
      />
    </form>
  );
}

/* ──────────────────────────────────────────────
   Role Chip (mobile drawer)
────────────────────────────────────────────── */
function RoleChip({ role }) {
  const map = {
    consumer: { label: "Consumer", color: "bg-emerald-100 text-emerald-700" },
    farmer:   { label: "Farmer",   color: "bg-amber-100 text-amber-700" },
    admin:    { label: "Admin",    color: "bg-violet-100 text-violet-700" },
  };
  const chip = map[role];
  if (!chip) return null;
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${chip.color}`}>
      {chip.label}
    </span>
  );
}

/* ──────────────────────────────────────────────
   Nav links config per role
────────────────────────────────────────────── */
function useNavLinks(role) {
  return useMemo(() => {
    switch (role) {
      case "consumer":
        return [
          { label: "Home",     to: "/" },
          { label: "Products", to: "/products" },
          { label: "Farmers",  to: "/farmers" },
          { label: "Orders",   to: "/orders" },
        ];
      case "farmer":
        return [
          { label: "Home",     to: "/" },
          { label: "Marketplace",  to: "/products" },
          { label: "My Products",  to: "/farmer/products" },
          { label: "Orders",       to: "/farmer/orders" },
        ];
      case "admin":
        return [
          { label: "Home",      to: "/" },
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "Users",     to: "/admin/users" },
          { label: "Reports",   to: "/admin/reports" },
        ];
      default: // guest
        return [
          { label: "Home",     to: "/" },
          { label: "Products", to: "/products" },
          { label: "Farmers",  to: "/farmers" },
        ];
    }
  }, [role]);
}

/* ──────────────────────────────────────────────
   Main Navbar
────────────────────────────────────────────── */
export default function Navbar() {
  const { user, logout }             = useAuth();
  const { cartCount }                = useCart();
  const { wishlistCount }            = useWishlist();
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate                     = useNavigate();

  const [menuOpen, setMenuOpen]     = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const mobileSearchRef             = useRef(null);
  const closeMenu = () => setMenuOpen(false);

  // Auto-focus mobile search input when it opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => mobileSearchRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const role       = user?.role;
  const isConsumer = role === "consumer";
  const isFarmer   = role === "farmer";
  const isAdmin    = role === "admin";

  // FIX: both consumer AND farmer always show cart/wishlist (desktop & mobile)
  const showCartWishlist = isConsumer || isFarmer;

  const navLinks = useNavLinks(role);

  // FIX: search now navigates to products with query param
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  /* Active link style */
  const navLinkClass = ({ isActive }) =>
    `relative pb-0.5 transition-colors duration-150 ${
      isActive
        ? "text-[var(--primary)] after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:rounded-full after:bg-[var(--primary)]"
        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
    }`;

  /* Shared drawer link style */
  const drawerLinkClass =
    "flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-[var(--surface-2)] hover:text-[var(--primary)] transition-all duration-150 text-[var(--text-secondary)]";

  return (
    <>
      {/* ── Header ─────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur-2xl border-b border-[var(--border)] shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-[60px] flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center">
            <img src={logo} alt="F2CMARKET" className="h-11 w-auto object-contain" />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-7 text-[14px] font-medium">
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} className={navLinkClass} end={to === "/"}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={handleSearch}
            />

            {/* Guest Buttons */}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-strong)] text-sm font-medium hover:text-white hover:bg-[var(--primary)] transition-all duration-150"
                >
                  <User size={16} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-all duration-150"
                >
                  Register
                </Link>
              </>
            )}

            {/* FIX: Cart & Wishlist for BOTH consumer and farmer */}
            {showCartWishlist && (
              <>
                <IconButton to="/wishlist" title="Wishlist">
                  <Heart size={20} />
                  <NavBadge count={wishlistCount} color="bg-red-500" />
                </IconButton>
                <IconButton to="/cart" title="Cart">
                  <ShoppingCart size={20} />
                  <NavBadge count={cartCount} />
                </IconButton>
              </>
            )}

            {/* User Dropdown */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-9 w-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/40 focus:ring-offset-2">
                    {user.email?.charAt(0).toUpperCase()}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-xl">
                  <DropdownMenuLabel className="space-y-1 pb-2">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold">{user.name || "My Account"}</p>
                      <RoleChip role={role} />
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] truncate">{user.email}</p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {/* FIX: Profile now navigates */}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User size={16} /> Profile
                    </Link>
                  </DropdownMenuItem>

                  {isFarmer && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/farmer/products/add" className="flex items-center gap-2 cursor-pointer">
                          <Plus size={16} /> Add Product
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/farmer/dashboard" className="flex items-center gap-2 cursor-pointer">
                          <ChartColumn size={16} /> Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  {/* FIX: Settings now navigates */}
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                      <Settings size={16} /> Settings
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 text-red-500 focus:text-red-500 cursor-pointer">
                    <LogOut size={16} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile: search icon + hamburger only */}
          <div className="lg:hidden flex items-center gap-1">
            <IconButton onClick={() => { setSearchOpen(true); setMenuOpen(false); }} title="Search">
              <Search size={22} />
            </IconButton>
            <button
              className="p-2 rounded-xl hover:bg-[var(--surface-2)] transition"
              onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </nav>

        {/* ── Mobile Full-Width Search Bar ────────── */}
        <div
          className={`
            lg:hidden overflow-hidden
            transition-all duration-300 ease-in-out
            ${searchOpen ? "max-h-[72px] border-t border-[var(--border)]" : "max-h-0"}
          `}
        >
          <form
            onSubmit={(e) => { handleSearch(e); setSearchOpen(false); }}
            className="flex items-center gap-3 px-4 py-3 bg-[var(--bg)]"
          >
            <Search size={18} className="shrink-0 text-[var(--text-secondary)]" />
            <input
              ref={mobileSearchRef}
              type="text"
              placeholder="Search fresh products…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="
                flex-1 bg-transparent outline-none border-none focus:ring-0
                text-sm text-[var(--text-primary)]
                placeholder:text-[var(--text-secondary)]
              "
            />
            <button
              type="button"
              onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
              className="shrink-0 p-1 rounded-lg hover:bg-[var(--surface-2)] transition text-[var(--text-secondary)]"
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </form>
        </div>
      </header>

      {/* ── Mobile Overlay ──────────────────────── */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeMenu}
      />

      {/* ── Mobile Drawer ───────────────────────── */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[300px]
          bg-[var(--bg)] z-50 shadow-2xl
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <img src={logo} alt="logo" className="h-9" />
          <button
            onClick={closeMenu}
            className="p-1.5 rounded-lg hover:bg-[var(--surface-2)] transition"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Body — no scroll, no search bar */}
        <div className="flex-1 overflow-hidden p-5 space-y-1">

          {/* Nav Links */}
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-xl text-[15px] font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          {/* Cart & Wishlist — consumer & farmer */}
          {showCartWishlist && (
            <>
              <div className="pt-2 pb-1">
                <div className="h-px bg-[var(--border)]" />
              </div>
              <Link to="/wishlist" onClick={closeMenu} className={drawerLinkClass}>
                <Heart size={18} />
                <span className="flex-1">Wishlist</span>
                {!!wishlistCount && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" onClick={closeMenu} className={drawerLinkClass}>
                <ShoppingCart size={18} />
                <span className="flex-1">Cart</span>
                {!!cartCount && (
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </>
          )}

          {/* Guest Buttons */}
          {!user && (
            <div className="flex flex-col gap-3 pt-4">
              <Link to="/login" onClick={closeMenu} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-strong)] text-sm font-medium hover:bg-[var(--surface-2)] transition">
                <User size={18} /> Login
              </Link>
              <Link to="/register" onClick={closeMenu} className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Drawer Footer — user section */}
        {user && (
          <div className="border-t border-[var(--border)] p-5 space-y-1">
            {/* User info */}
            <div className="flex items-center gap-3 px-3 py-2 mb-2">
              <div className="h-9 w-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-sm shrink-0">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user.name || "My Account"}</p>
                  <RoleChip role={role} />
                </div>
                <p className="text-xs text-[var(--text-secondary)] truncate">{user.email}</p>
              </div>
            </div>

            {/* FIX: Profile navigates */}
            <Link to="/profile" onClick={closeMenu} className={drawerLinkClass}>
              <User size={18} /> Profile
            </Link>

            {isFarmer && (
              <>
                <Link to="/farmer/products/add" onClick={closeMenu} className={drawerLinkClass}>
                  <Plus size={18} /> Add Product
                </Link>
                <Link to="/farmer/dashboard" onClick={closeMenu} className={drawerLinkClass}>
                  <ChartColumn size={18} /> Analytics
                </Link>
              </>
            )}

            {/* FIX: Settings navigates */}
            <Link to="/settings" onClick={closeMenu} className={drawerLinkClass}>
              <Settings size={18} /> Settings
            </Link>

            <button
              onClick={() => { logout(); closeMenu(); }}
              className="flex items-center gap-3 py-2 px-3 rounded-xl w-full text-red-500 hover:bg-red-50 transition-all duration-150"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}