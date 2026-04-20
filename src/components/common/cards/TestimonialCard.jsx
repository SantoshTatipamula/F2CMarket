import { Star } from "lucide-react";

export default function TestimonialCard({ item }) {
  return (
    <div className="h-full bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(item.rating)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className="fill-orange-400 text-orange-400"
          />
        ))}
      </div>

      {/* Review */}
      <p className="text-slate-600 leading-relaxed flex-grow">
        "{item.review}"
      </p>

      {/* User */}
      <div className="mt-6 flex items-center gap-4">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold text-slate-900">
            {item.name}
          </h4>
          <p className="text-sm text-slate-500">
            {item.location}
          </p>
        </div>
      </div>
    </div>
  );
}