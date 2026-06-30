import { Star, BadgeCheck, ThumbsUp, MessageCircle } from "lucide-react";

export default function TestimonialCard({ item }) {
  const name = item.consumerName || item.name || "Anonymous User";

  const avatar =
    item.consumerAvatar ||
    item.avatar ||
    "https://ui-avatars.com/api/?name=User";

  const location = item.location || item.role || "F2CMARKET Customer";

  const review = item.review || item.quote || "";

  const verified = item.verified !== undefined ? item.verified : true;

  return (
    <div className="group h-full rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-start gap-3">
          <img
            src={avatar}
            alt={name}
            className="h-12 w-12 rounded-full border-2 border-[var(--border)] object-cover"
          />

          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-[var(--text-primary)]">{name}</p>

              {verified && <BadgeCheck size={16} className="text-green-600" />}
            </div>

            <p className="text-xs text-[var(--text-muted)]">{location}</p>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="mb-3 flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={16}
            fill={index < item.rating ? "#F59E0B" : "none"}
            className={index < item.rating ? "text-amber-500" : "text-gray-300"}
          />
        ))}
      </div>

      {/* Review */}
      <p className="mb-4 text-sm leading-relaxed text-[var(--text-secondary)]">
        "{review}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-[var(--border)] pt-4">
        <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)]">
          <ThumbsUp size={16} />
          <span>Verified Purchase</span>
        </div>

        <button className="flex items-center gap-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--primary)]">
          <MessageCircle size={16} />
          <span>Read More</span>
        </button>
      </div>
    </div>
  );
}
