

export default function IconCard({
  icon: Icon,
  title,
  desc,
  bg,
  color,
}) {
  return (
    <div className="h-full bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">

      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${bg}`}
      >
        <Icon size={26} className={color} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-slate-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-slate-600 leading-relaxed flex-grow">
        {desc}
      </p>

    </div>
  );
}