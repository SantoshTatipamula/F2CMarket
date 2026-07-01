import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAuth } from "@/context/AuthContext";
import {
  getWishlistFromFirestore,
  saveWishlistToFirestore,
} from "@/services/wishlistFirestoreService";

const WishlistContext = createContext();

// function mergeWishlistItems(localItems, remoteItems) {
//   const remoteIds = new Set(remoteItems.map((item) => String(item.id)));
//   const merged = [...remoteItems];

//   for (const localItem of localItems) {
//     if (!remoteIds.has(String(localItem.id))) {
//       merged.push(localItem);
//     }
//   }

//   return merged;
// }

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useLocalStorage("f2c-wishlist", []);
  const [remoteWishlistLoaded, setRemoteWishlistLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadRemoteWishlist() {
      if (!user?.id) {
        setRemoteWishlistLoaded(false);
        return;
      }

      try {
        const remoteItems = await getWishlistFromFirestore(user.id);

        if (!mounted) return;

        // Firebase is the source of truth
        setWishlistItems(remoteItems || []);

        setRemoteWishlistLoaded(true);
      } catch (error) {
        console.error("Failed to load wishlist from Firestore:", error);
        if (mounted) {
          setRemoteWishlistLoaded(true);
        }
      }
    }

    loadRemoteWishlist();

    return () => {
      mounted = false;
    };
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id || !remoteWishlistLoaded) return;

    saveWishlistToFirestore(user.id, wishlistItems).catch((error) => {
      console.error("Failed to sync wishlist to Firestore:", error);
    });
  }, [user?.id, wishlistItems, remoteWishlistLoaded]);

 const toggleWishlist = useCallback((product) => {
  setWishlistItems((prev) => {
    const exists = prev.find(
      (item) => String(item.id) === String(product.id)
    );

    return exists
      ? prev.filter(
          (item) => String(item.id) !== String(product.id)
        )
      : [...prev, product];
  });
}, [setWishlistItems]);

  const isInWishlist = useCallback(
  (id) =>
    wishlistItems.some(
      (item) => String(item.id) === String(id)
    ),
  [wishlistItems]
);

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);


  const value = useMemo(
  () => ({
    wishlistItems,
    toggleWishlist,
    isInWishlist,
    wishlistCount,
  }),
  [
    wishlistItems,
    toggleWishlist,
    isInWishlist,
    wishlistCount,
  ]
);
  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
