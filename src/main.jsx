import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./utils/leafletConfig";

import App from "./App";

import { AuthProvider }    from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider }    from "./context/CartContext";
import { WishlistProvider} from "./context/WishlistContext";
import { SearchProvider }  from "./context/SearchContext";
import { LocationProvider } from "./context/LocationContext";

import { initSeedData } from "@/data/initSeedData";

import "./styles/globals.css";
import "./styles/variables.css";

/* Initialize temp seed data on first load */
initSeedData();

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <LocationProvider>
                <App />
              </LocationProvider>
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);