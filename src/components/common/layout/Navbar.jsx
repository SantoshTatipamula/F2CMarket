import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Package,
  Settings,
  LogOut,
  Heart,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

import logo from "@/assets/logos/Logo.png";

/* ─── Small reusable sub-components ───────────────────────────────── */

/** Coloured notification dot on cart / wishlist icons */
function NavBadge({ count, color = "bg-orange-500" }) {
  if (!count) return null;
  return (
    <span
      className={`absolute -top-1 -right-1 ${color} text-white text-[10px] px-1.5 rounded-full`}
    >
      {count}
    </span>
  );
}

/** Shared search bar markup */
function SearchBar({ value, onChange, onSubmit, className = "" }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`flex items-center gap-2 h-11 px-4 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] transition focus-within:border-[var(--primary)] ${className}`}
    >
      <button type="submit">
        <Search size={18} className="text-[var(--text-secondary)]" />
      </button>
      <input
        type="text"
        placeholder="Search fresh products..."
        value={value}
        onChange={onChange}
        className="bg-transparent outline-none border-none focus:ring-0 text-sm w-44 text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
      />
    </form>
  );
}

/* ─── Main Navbar ──────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Farmers", to: "/farmers" },
];

export default function Navbar() {
  const { user, logout } = useAuth();

  const role = user?.role;

  const isConsumer = role === "consumer";
  const isFarmer = role === "farmer";
  const isAdmin = role === "admin";

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    navigate(`/products?search=${trimmed}`);
    setSearchQuery("");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur-2xl border-b border-[var(--border)] shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 lg:px-8 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="F2CMARKET"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[var(--text-secondary)]">
            {NAV_LINKS.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className="hover:text-[var(--primary)] transition"
                >
                  {label}
                </NavLink>
              </li>
            ))}

            {/* Farmer Links */}
            {isFarmer && (
              <>
                <li>
                  <NavLink
                    to="/farmer/dashboard"
                    className="hover:text-[var(--primary)] transition"
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/farmer/products"
                    className="hover:text-[var(--primary)] transition"
                  >
                    My Products
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Links */}
            {isAdmin && (
              <>
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className="hover:text-[var(--primary)] transition"
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/admin/users"
                    className="hover:text-[var(--primary)] transition"
                  >
                    Users
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={handleSearch}
            />

            {isConsumer && (
              <Link
                to="/wishlist"
                className="p-2 rounded-xl hover:bg-[var(--surface-2)] transition relative"
              >
                <Heart size={20} />
                <NavBadge count={wishlistCount} color="bg-red-500" />
              </Link>
            )}

            {isConsumer && (
              <Link
                to="/cart"
                className="p-2 rounded-xl hover:bg-[var(--surface-2)] transition relative"
              >
                <ShoppingCart size={20} />
                <NavBadge count={cartCount} />
              </Link>
            )}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2 hover:bg-[var(--surface-2)] transition">
                    <div className="h-8 w-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-semibold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-56 rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-xl"
                >
                  <DropdownMenuLabel className="space-y-1">
                    <p className="text-sm font-medium">My Account</p>
                    <p className="text-xs text-[var(--text-secondary)] truncate">
                      {user.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isConsumer && (
                    <DropdownMenuItem asChild>
                      <Link
                        to="/orders"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Package size={16} /> My Orders
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {isFarmer && (
                    <DropdownMenuItem asChild>
                      <Link to="/farmer/dashboard">
                        <Package size={16} />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard">
                        <Package size={16} />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <User size={16} /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <Settings size={16} /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center gap-2 text-red-500 focus:text-red-500 cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-strong)] hover:text-[var(--surface)] hover:bg-[var(--primary)] transition text-sm font-medium"
              >
                <User size={18} /> Login
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={26} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeMenu}
      />

      {/* Slide drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-[var(--bg)] z-50 shadow-xl transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between py-[0.625rem] p-5 border-b">
          <img src={logo} alt="logo" className="h-10" />
          <button onClick={closeMenu}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col p-5 gap-5 text-[16px] font-medium text-[var(--text-secondary)]">
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} onClick={closeMenu}>
              {label}
            </Link>
          ))}

          <Link
            to="/wishlist"
            onClick={closeMenu}
            className="flex items-center justify-between hover:text-[var(--primary)] transition"
          >
            <span className="flex items-center gap-2">
              <Heart size={18} /> Wishlist
            </span>
            <NavBadge count={wishlistCount} color="bg-red-500" />
          </Link>

          <Link
            to="/cart"
            onClick={closeMenu}
            className="flex items-center justify-between hover:text-[var(--primary)] transition"
          >
            <span className="flex items-center gap-2">
              <ShoppingCart size={18} /> Cart
            </span>
            <NavBadge count={cartCount} />
          </Link>

          {user ? (
            <div className="mt-4 border-t border-[var(--border)] pt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-semibold">
                  {user.email?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    My Account
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] truncate max-w-[180px]">
                    {user.email}
                  </p>
                </div>
              </div>

              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSubmit={(e) => {
                  handleSearch(e);
                  closeMenu();
                }}
                className="w-full"
              />

              <Link
                to="/orders"
                onClick={closeMenu}
                className="flex items-center gap-2 hover:text-[var(--primary)] transition"
              >
                <Package size={18} /> My Orders
              </Link>
              <button className="flex items-center gap-2 hover:text-[var(--primary)] transition">
                <User size={18} /> Profile
              </button>
              <button className="flex items-center gap-2 hover:text-[var(--primary)] transition">
                <Settings size={18} /> Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-strong)] hover:bg-[var(--primary)] transition"
            >
              <User size={18} /> Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
