import {
  Leaf,
  Apple,
  Wheat,
  Milk,
  Sprout,
  ShoppingBasket,
} from "lucide-react";

export const categories = [
  {
    id: 1,
    title: "Vegetables",
    icon: Leaf,
    bg: "bg-green-100",
    color: "text-[var(--primary)]",
  },
  {
    id: 2,
    title: "Fruits",
    icon: Apple,
    bg: "bg-orange-100",
    color: "text-orange-500",
  },
  {
    id: 3,
    title: "Grains",
    icon: Wheat,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    id: 4,
    title: "Dairy",
    icon: Milk,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    id: 5,
    title: "Organic",
    icon: Sprout,
    bg: "bg-emerald-100",
    color: "text-emerald-600",
  },
  {
    id: 6,
    title: "Daily Needs",
    icon: ShoppingBasket,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
];