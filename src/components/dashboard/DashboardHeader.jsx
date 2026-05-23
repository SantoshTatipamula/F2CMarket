import {
  CalendarDays,
  LayoutDashboard,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuth();

  const isFarmer =
    user?.role === "farmer";

  const isAdmin =
    user?.role === "admin";

  const isConsumer =
    user?.role === "consumer";

  /* Role Title */
  const roleTitle = isFarmer
    ? "Farmer Workspace"
    : isAdmin
    ? "Admin Workspace"
    : "Consumer Workspace";

  /* Description */
  const roleDescription =
    isFarmer
      ? "Manage your marketplace products, orders, and customer engagement."
      : isAdmin
      ? "Monitor platform activity, marketplace growth, and management operations."
      : "Track your marketplace activity, orders, and personalized recommendations.";

  /* Current Date */
  const currentDate =
    new Date().toLocaleDateString(
      "en-IN",
      {
        weekday: "long",
        month: "long",
        day: "numeric",
      }
    );

  return (
    <section
      className="
        overflow-hidden
        rounded-[32px]
        border border-black/5
        bg-[var(--surface)]
        shadow-sm
      "
    >
      
      {/* Gradient Hero */}
      <div
        className="
          relative overflow-hidden

          bg-gradient-to-br
          from-[var(--primary)]
          via-[var(--primary)]/90
          to-emerald-500

          px-6 py-8
          md:px-8 md:py-10
        "
      >
        
        {/* Glow */}
        <div
          className="
            absolute right-0 top-0

            h-40 w-40

            rounded-full
            bg-white/10
            blur-3xl
          "
        />

        {/* Content */}
        <div
          className="
            relative z-10

            flex flex-col gap-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          
          {/* Left */}
          <div className="max-w-2xl">
            
            {/* Badge */}
            <div
              className="
                inline-flex items-center gap-2

                rounded-full
                bg-white/10

                px-4 py-2

                text-sm font-semibold
                text-white

                backdrop-blur-md
              "
            >
              <LayoutDashboard size={16} />

              {roleTitle}
            </div>

            {/* Heading */}
            <h1
              className="
                mt-6

                text-3xl font-bold
                tracking-tight

                text-white

                md:text-4xl
              "
            >
              Welcome back,
              {" "}
              {user?.name || "User"}
            </h1>

            {/* Description */}
            <p
              className="
                mt-4

                max-w-2xl

                text-sm leading-relaxed
                text-white/80

                md:text-base
              "
            >
              {roleDescription}
            </p>
          </div>

          {/* Right */}
          <div
            className="
              inline-flex items-center gap-3

              self-start

              rounded-2xl
              border border-white/10
              bg-white/10

              px-5 py-4

              text-white

              backdrop-blur-md
            "
          >
            
            <div
              className="
                flex h-12 w-12
                items-center justify-center

                rounded-2xl
                bg-white/10
              "
            >
              <CalendarDays size={22} />
            </div>

            <div>
              
              <p className="text-xs text-white/70">
                Today
              </p>

              <p className="mt-1 text-sm font-semibold">
                {currentDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}