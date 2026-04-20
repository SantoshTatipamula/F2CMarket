import logo from "../../../assets/logos/Logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
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
          <ul className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-slate-700">
            <li>
              <Link to="/" className="hover:text-green-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-green-600 transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/farmers" className="hover:text-green-600 transition">
                Farmers
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-600 transition">
                About
              </Link>
            </li>
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-slate-100 transition">
              <Search size={20} />
            </button>

            <button className="p-2 rounded-xl hover:bg-slate-100 transition relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] px-1.5 rounded-full">
                0
              </span>
            </button>

            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 transition"
            >
              <User size={18} />
              Login
            </Link>
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
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-50 shadow-xl transform transition-transform duration-300 ${
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
        <div className="flex flex-col p-5 gap-5 text-[16px] font-medium text-slate-700">
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
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 transition"
          >
            <User size={18} />
            Login
          </Link>
        </div>
      </div>
    </>
  );
}
