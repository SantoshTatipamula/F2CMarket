import herbal from "../../../assets/icons/herbs.png";

import HeroSearch from "./HeroSearch";
import { Navigate, useNavigate } from "react-router-dom";



export default function HeroContent() {
  const navigate = useNavigate();
  return (
    <>
      {/* Badge */}
      <span className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full text-sm font-semibold my-3">
        <img loading="lazy" src={herbal} alt="Fresh Farm" className="w-5" />
        Fresh Farm Delivery
      </span>

      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[var(--text-primary)]">
        Straight from the Soil, <br />
        Right to Your <span className="text-[var(--primary)]">Table.</span>
      </h1>

      {/* Paragraph */}
      <p className="mt-6 text-[var(--text-secondary)] text-lg leading-relaxed max-w-xl">
        Buy vegetables, fruits and organic products directly from trusted farmers.
      </p>

      {/* Search */}
      <HeroSearch />

      {/* CTA Buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button onClick={()=> navigate("/Products")} className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-2xl font-semibold transition">
          Shop Now
        </button>

        <button onClick={()=> navigate("/farmers")} className="border border-[var(--border-strong)] hover:bg-[var(--surface)] px-7 py-4 rounded-2xl font-semibold transition">
          Explore Farmers
        </button>
      </div>
    </>
  );
}