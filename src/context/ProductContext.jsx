import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";

import {
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
    let mounted = true;

    async function init() {
      try {
        setLoading(true);

        const data = await loadProducts();

        if (mounted) {
          setProducts(data || []);
        }
      } catch (error) {
        console.error("Failed to load products:", error);

        if (mounted) {
          setProducts([]);
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
  }, [user]);

  // Refresh Products
  const refreshProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await loadProducts();

      setProducts(data || []);
    } catch (error) {
      console.error("Failed to refresh products:", error);

      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create Product
  const createProduct = useCallback(
    async (productData) => {
      await createProductService(productData);
      await refreshProducts();
    },
    [refreshProducts],
  );

  // Update Product
  const updateProduct = useCallback(
    async (productId, updatedData) => {
      await updateProductService(productId, updatedData, user?.id);

      await refreshProducts();
    },
    [user, refreshProducts],
  );

  // Delete Product
  const deleteProduct = useCallback(
    async (productId) => {
      await deleteProductService(productId, user?.id);

      await refreshProducts();
    },
    [user, refreshProducts],
  );

  const value = useMemo(
    () => ({
      products,
      loading,
      refreshProducts,
      createProduct,
      updateProduct,
      deleteProduct,
    }),
    [
      products,
      loading,
      refreshProducts,
      createProduct,
      updateProduct,
      deleteProduct,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
