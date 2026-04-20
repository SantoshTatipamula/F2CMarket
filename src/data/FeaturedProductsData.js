import tomato from "../assets/images/products/tomatos.jpeg";
import carrot from "../assets/images/products/carrot.jpeg";
import mango from "../assets/images/products/mangos.jpeg";
import rice from "../assets/images/products/rice grain.jpeg";

export const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    farmer: "Ravi Farms",
    price: "₹40",
    oldPrice: "₹55",
    rating: 4.8,
    image: tomato,
    badge: "10% OFF",
  },
  {
    id: 2,
    name: "Organic Carrots",
    farmer: "Green Valley",
    price: "₹60",
    oldPrice: "₹75",
    rating: 4.7,
    image: carrot,
    badge: "Fresh",
  },
  {
    id: 3,
    name: "Sweet Mangoes",
    farmer: "Sunrise Farm",
    price: "₹120",
    oldPrice: "₹150",
    rating: 4.9,
    image: mango,
    badge: "Popular",
  },
  {
    id: 4,
    name: "Premium Rice",
    farmer: "Nature Fields",
    price: "₹90",
    oldPrice: "₹110",
    rating: 4.6,
    image: rice,
    badge: "Best Seller",
  },
];