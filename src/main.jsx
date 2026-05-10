import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";

import "./styles/globals.css";
import "./styles/variables.css";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);