import { Link } from "react-router-dom";

export default function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-5">
        {title}
      </h3>

      <ul className="space-y-3">
        {links.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className="text-slate-300 hover:text-white transition"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}