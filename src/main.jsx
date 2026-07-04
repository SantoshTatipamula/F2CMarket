import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import ErrorBoundary from "./components/common/ui/ErrorBoundary";

import { AuthProvider }    from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider }    from "./context/CartContext";
import { WishlistProvider} from "./context/WishlistContext";
import { SearchProvider }  from "./context/SearchContext";
import { LocationProvider } from "./context/LocationContext";

import "./styles/globals.css";
import "./styles/variables.css";

if ("scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackTitle="F2CMARKET hit a snag"
      fallbackMessage="The app ran into an unexpected error while starting up. Reloading usually fixes this."
    >
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
    </ErrorBoundary>
  </React.StrictMode>
);