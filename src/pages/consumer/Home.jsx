

import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <main className="overflow-x-hidden">

      <Hero />

      <Categories />

      <FeaturedProducts />

      <WhyChooseUs />

      <Testimonials />

      <Newsletter />

    </main>
  );
}