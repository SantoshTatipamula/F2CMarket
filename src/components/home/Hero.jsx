import { motion } from "framer-motion";
import {
  fadeUp,
  fadeLeft,
  fadeRight,
  floating,
} from "../../utils/animations";

import { Search } from "lucide-react";
import heroImg from "../../assets/images/farmer.webp";
import delevery from "../../assets/icons/fast-delivery.png";
import vegitables from "../../assets/icons/vegetable.png";
import money from "../../assets/icons/money.png";
import herbal from "../../assets/icons/herbs.png";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-orange-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left Content */}
        <motion.div initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeLeft}>
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold my-3">
            <span>
              <img src={herbal} alt="Herbal Leaves" className="w-5" />
            </span>{" "}
            Fresh Farm Delivery
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-slate-900">
            Straight from the Soil, <br />
            Right to Your <span className="text-green-600">Table.</span>
          </h1>

          {/* Paragraph */}
          <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-xl">
            Buy vegetables, fruits and organic products directly from trusted
            farmers.
          </p>

          {/* Search */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative w-full">
              <Search
                size={20}
                className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search fresh products..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-300 focus:border-green-500 outline-none"
              />
            </div>

            <button className="bg-green-600 hover:bg-green-700 text-white px-7 py-4 rounded-2xl font-semibold transition">
              Search
            </button>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-2xl font-semibold transition">
              Shop Now
            </button>

            <button className="border border-slate-300 hover:bg-slate-50 px-7 py-4 rounded-2xl font-semibold transition">
              Explore Farmers
            </button>
          </motion.div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600 font-medium">
            <span className="flex items-center justify-center gap-2">
              {" "}
              <img src={delevery} alt="Fast Delivery" className="w-6" />
              <p>Fast Delivery</p>
            </span>
            <span className="flex items-center justify-center gap-2">
              {" "}
              <img src={vegitables} alt="Fast Delivery" className="w-5" />
              <p>100% Fresh</p>
            </span>
            <span className="flex items-center justify-center gap-2">
              {" "}
              <img src={money} alt="Fast Delivery" className="w-5" />
              <p>Fair Prices</p>
            </span>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true}}
      variants={fadeRight} className="relative flex justify-center items-center">
          {/* Radial Gradient Background */}
          <div className="absolute w-[320px] h-[420px]  rounded-full bg-[radial-gradient(circle,_rgba(22,163,74,0.22)_0%,_rgba(132,204,22,0.16)_35%,_rgba(245,158,11,0.12)_65%,_transparent_80%)] blur-3xl"></div>

          {/* Image */}
          <div className="relative  z-10">
            <img
              src={heroImg}
              alt="Fresh Products"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Floating Cards */}
          <motion.div variants={floating} animate="animate" className="hidden md:block absolute top-10 left-0 bg-white shadow-xl rounded-2xl px-5 py-4 z-20">
            <p className="text-sm text-slate-500">Today's Offer</p>
            <h4 className="font-bold text-green-600">Up to 30% Off</h4>
          </motion.div>

          <motion.div variants={floating} transition={{delay:1}} animate="animate" className="hidden md:block absolute bottom-10 right-0 bg-white shadow-xl rounded-2xl px-5 py-4 z-20">
            <p className="text-sm text-slate-500">Trusted Farmers</p>
            <h4 className="font-bold text-orange-500">500+ Sellers</h4>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
