import { createContext, useContext, useEffect, useState } from "react";

import {
  getProducts,
  initializeProducts,
  loadProducts,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "@/services/productService";

import { useAuth } from "@/context/AuthContext";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const { user } = useAuth();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize
  useEffect(() => {
  initializeProducts();

  let mounted = true;

  async function init() {
    try {
      const data = await loadProducts();

      if (mounted) {
        setProducts(data || []);
      }
    } catch (error) {
      console.error(
        "Failed to load products from Firestore:",
        error
      );

      if (mounted) {
        setProducts(getProducts());
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  }

  init();

  return () => {
    mounted = false;
  };
}, []);

  // Refresh Products
  const refreshProducts = async () => {
    setLoading(true);
    try {
      const data = await loadProducts();
      setProducts(data || []);
    } catch (error) {
      console.error("Failed to refresh products:", error);
      setProducts(getProducts());
    } finally {
      setLoading(false);
    }
  };

  // Create Product
  const createProduct = async (productData) => {
    await createProductService(productData);
    await refreshProducts();
  };

  // Update Product
  const updateProduct = async (productId, updatedData) => {
    await updateProductService(productId, updatedData, user?.id);
    await refreshProducts();
  };

  // Delete Product
  const deleteProduct = async (productId) => {
    await deleteProductService(productId, user?.id);
    await refreshProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
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