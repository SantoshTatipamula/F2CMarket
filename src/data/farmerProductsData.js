import tomatoes from "@/assets/images/products/tomatos.jpeg";
import spinach from "@/assets/images/products/Spinach.webp";
import onions from "@/assets/images/products/Onions.webp";
import potato from "@/assets/images/products/Potato.webp";
import coriander from "@/assets/images/products/Coriander.webp";

export const farmerProductsData = [
  {
    id: 1,
    farmerId: 101,
    farmerName: "Green Valley Farm",

    name: "Organic Tomatoes",
    category: "Vegetables",

    price: 40,
    stock: 120,

    unit: "kg",

    image: tomatoes,

    description:
      "Fresh organic tomatoes directly harvested from local farms.",

    status: "active",

    totalOrders: 42,

    createdAt: "2026-05-01",
  },

  {
    id: 2,
    farmerId: 101,
    farmerName: "Green Valley Farm",

    name: "Fresh Spinach",
    category: "Leafy Greens",

    price: 25,
    stock: 80,

    unit: "kg",

    image: spinach,

    description:
      "Naturally grown fresh spinach rich in nutrients.",

    status: "active",

    totalOrders: 31,

    createdAt: "2026-05-04",
  },

  {
    id: 3,
    farmerId: 101,
    farmerName: "Green Valley Farm",

    name: "Farm Onions",
    category: "Vegetables",

    price: 35,
    stock: 140,

    unit: "kg",

    image: onions,

    description:
      "Premium quality onions directly from farmers.",

    status: "active",

    totalOrders: 54,

    createdAt: "2026-05-07",
  },

  {
    id: 4,
    farmerId: 101,
    farmerName: "Green Valley Farm",

    name: "Organic Potatoes",
    category: "Vegetables",

    price: 30,
    stock: 200,

    unit: "kg",

    image: potato,

    description:
      "Fresh potatoes harvested from natural farms.",

    status: "low-stock",

    totalOrders: 28,

    createdAt: "2026-05-09",
  },

  {
    id: 5,
    farmerId: 101,
    farmerName: "Green Valley Farm",

    name: "Fresh Coriander",
    category: "Herbs",

    price: 15,
    stock: 45,

    unit: "bundles",

    image: coriander,

    description:
      "Fresh coriander leaves with natural aroma.",

    status: "active",

    totalOrders: 19,

    createdAt: "2026-05-10",
  },
];