import { createContext, useContext, useEffect, useState } from "react";

import {
  getProducts,
  initializeProducts,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "@/services/productService";

import { useAuth } from "@/context/AuthContext";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);

  // Initialize
  useEffect(() => {
    initializeProducts();

    setProducts(getProducts());
  }, []);

  // Refresh Products
  const refreshProducts = () => {
    setProducts(getProducts());
  };

  // Create Product
const createProduct = (productData) => {
  createProductService(productData);

  refreshProducts();
};

  // Update Product
  const updateProduct = (productId, updatedData) => {
    updateProductService(productId, updatedData, user?.id);

    refreshProducts();
  };

  // Delete Product
  const deleteProduct = (productId) => {
    deleteProductService(productId, user?.id);

    refreshProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,

        refreshProducts,

        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
