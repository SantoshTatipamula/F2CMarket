import { NavLink } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "../../../assets/logos/Logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

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

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[var(--text-secondary)]">
            <li>
              <NavLink
                to="/"
                className="hover:text-[var(--primary)] transition"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                className="hover:text-[var(--primary)] transition"
              >
                Products
              </NavLink>
            </li>
            <li>
              <Link
                to="/farmers"
                className="hover:text-[var(--primary)] transition"
              >
                Farmers
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-[var(--primary)] transition"
              >
                About
              </Link>
            </li>
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-[var(--surface-2)] transition">
              <Search size={20} />
            </button>

            <Link
              to="/cart"
              className="p-2 rounded-xl hover:bg-[var(--surface-2)] transition relative"
            >
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

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
                {/* User */}
                <DropdownMenuLabel className="space-y-1">
                  <p className="text-sm font-medium">My Account</p>

                  <p className="text-xs text-[var(--text-secondary)] truncate">
                    {user.email}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* Orders */}
                <DropdownMenuItem asChild>
                  <Link
                    to="/orders"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Package size={16} />
                    My Orders
                  </Link>
                </DropdownMenuItem>

                {/* Profile */}
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <User size={16} />
                  Profile
                </DropdownMenuItem>

                {/* Settings */}
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <Settings size={16} />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2 text-red-500 focus:text-red-500 cursor-pointer"
                >
                  <LogOut size={16} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {<Menu size={26} />}
          </button>
        </nav>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Slide Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-[var(--bg)] z-50 shadow-xl transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-[0.625rem] p-5 border-b">
          <img src={logo} alt="logo" className="h-10" />

          <button onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col p-5 gap-5 text-[16px] font-medium text-[var(--text-secondary)]">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link to="/farmers" onClick={() => setMenuOpen(false)}>
            Farmers
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          {user ? (
            <div className="mt-4 border-t border-[var(--border)] pt-4 space-y-3">
              {/* User Info */}
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

              {/* Orders */}
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition"
              >
                <Package size={18} />
                My Orders
              </Link>

              {/* Profile */}
              <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition">
                <User size={18} />
                Profile
              </button>

              {/* Settings */}
              <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--primary)] transition">
                <Settings size={18} />
                Settings
              </button>

              {/* Logout */}
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-2 text-red-500"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-strong)] hover:bg-[var(--surface)] transition"
            >
              <User size={18} />
              Login
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
