import {
  CalendarRange,
  Download,
  Filter,
} from "lucide-react";

export default function AnalyticsFilterBar() {
  return (
    <section
      className="
        flex flex-col gap-5

        rounded-3xl
        border border-black/5

        bg-[var(--surface)]

        p-5

        shadow-sm

        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      
      {/* Left */}
      <div>
        
        <h2
          className="
            text-xl font-bold
            tracking-tight

            text-[var(--text-primary)]
          "
        >
          Analytics Filters
        </h2>

        <p
          className="
            mt-2
            text-sm
            text-[var(--text-secondary)]
          "
        >
          Customize analytics reports,
          chart ranges, and marketplace insights.
        </p>
      </div>

      {/* Right */}
      <div
        className="
          flex flex-wrap
          items-center
          gap-3
        "
      >
        
        {/* From Date */}
        <div
          className="
            flex items-center gap-2

            rounded-2xl
            border border-[var(--border)]

            bg-white

            px-4 py-3
          "
        >
          <CalendarRange
            size={18}
            className="text-[var(--text-secondary)]"
          />

          <input
            type="date"
            className="
              bg-transparent
              text-sm

              text-[var(--text-primary)]

              outline-none
            "
          />
        </div>

        {/* To Date */}
        <div
          className="
            flex items-center gap-2

            rounded-2xl
            border border-[var(--border)]

            bg-white

            px-4 py-3
          "
        >
          <CalendarRange
            size={18}
            className="text-[var(--text-secondary)]"
          />

          <input
            type="date"
            className="
              bg-transparent
              text-sm

              text-[var(--text-primary)]

              outline-none
            "
          />
        </div>

        {/* Filter Button */}
        <button
          className="
            inline-flex items-center gap-2

            rounded-2xl

            border border-[var(--border)]

            bg-white

            px-4 py-3

            text-sm font-medium
            text-[var(--text-primary)]

            transition-all duration-300

            hover:border-[var(--primary)]/20
            hover:text-[var(--primary)]
          "
        >
          <Filter size={18} />

          Apply
        </button>

        {/* Export */}
        <button
          className="
            inline-flex items-center gap-2

            rounded-2xl

            bg-[var(--primary)]

            px-4 py-3

            text-sm font-semibold
            text-white

            transition-all duration-300

            hover:opacity-90
          "
        >
          <Download size={18} />

          Export
        </button>
      </div>
    </section>
  );
}