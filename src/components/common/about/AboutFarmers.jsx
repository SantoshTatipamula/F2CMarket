import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { farmersData } from "@/data/farmersData";

const AboutFarmers = () => {
  return (
    <section className="bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div className="max-w-2xl">
            <span className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">
              Our Farmers
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-[var(--text-primary)] md:text-4xl">
              Meet The People Behind The Fresh Produce
            </h2>

            <p className="mt-5 text-[15px] leading-8 text-[var(--text-secondary)] md:text-base">
              F2CMARKET works closely with local farmers who are committed to
              quality farming, fresh products, and sustainable agricultural
              practices.
            </p>
          </div>

          <Link
            to="/farmers"
            className="
              inline-flex items-center gap-2
              text-sm font-medium text-[var(--primary)]
              transition-colors duration-300
              hover:text-[var(--primary-hover)]
            "
          >
            View All Farmers
            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>

        {/* Farmers Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {farmersData.map((farmer) => (
            <div
              key={farmer.id}
              className="
                overflow-hidden rounded-[var(--radius-lg)]
                border border-[var(--border)]
                bg-white
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[var(--shadow-sm)]
              "
            >

              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={farmer.image}
                  alt={farmer.name}
                  className="
                    h-full w-full object-cover
                    transition-transform duration-500
                    hover:scale-105
                  "
                />
              </div>

              {/* Content */}
              <div className="p-6">

  <div className="flex items-center justify-between">
    <p className="text-sm text-[var(--text-muted)]">
      {farmer.location}
    </p>

    <span className="text-sm font-medium text-[var(--primary)]">
      ★ {farmer.rating}
    </span>
  </div>

  <h3 className="mt-3 text-xl font-semibold text-[var(--text-primary)]">
    {farmer.name}
  </h3>

  <p className="mt-2 text-sm text-[var(--text-secondary)]">
    {farmer.specialty}
  </p>

  <div className="mt-5 flex items-center gap-4 text-sm text-[var(--text-muted)]">
    <span>{farmer.experience}</span>
    <span>•</span>
    <span>{farmer.products} Products</span>
  </div>

</div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default AboutFarmers;