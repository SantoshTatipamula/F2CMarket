import { useMemo, useState } from "react";
import { Search, Trash2, Package } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { deleteProductAsAdmin } from "@/services/productService";
import { parsePrice } from "@/utils/parsePrice";
import Breadcrumb from "@/components/common/ui/Breadcrumb";
import PageHeader from "@/components/common/ui/PageHeader";
import EmptyState from "@/components/common/ui/EmptyState";

export default function AdminProducts() {
  const { products, loading, refreshProducts } = useProducts();
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null);


const filtered = useMemo(() => {
  return products.filter(
    (p) =>
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.sellerName?.toLowerCase().includes(search.toLowerCase()) ||
      p.farmer?.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase())
  );
}, [products, search]);

  const handleDelete = async (id) => {
    await deleteProductAsAdmin(id);
    await refreshProducts();
    setConfirm(null);
  };

  return (
    <section className="min-h-screen bg-[var(--surface)] py-8">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <Breadcrumb
          items={[
            { label: "Admin", href: "/admin/dashboard" },
            { label: "Products" },
          ]}
        />
        <PageHeader
          title="Manage Products"
          subtitle={`${products.length} total products on the platform`}
        />

        <div className="flex items-center gap-2 h-11 px-4 rounded-xl border border-[var(--border)] bg-white mb-6 max-w-sm">
          <Search size={16} className="text-[var(--text-muted)] shrink-0" />
          <input
            type="text"
            placeholder="Search by name, farmer or category…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-[var(--text-muted)]"
          />
        </div>

        {loading && (
          <p className="text-sm text-[var(--text-muted)] py-4 text-center">
            Loading products…
          </p>
        )}

        {filtered.length === 0 && !loading ? (
          <EmptyState
            icon={Package}
            title="No Products Found"
            description="No products match your search."
          />
        ) : (
          <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--surface)] border-b border-[var(--border)]">
                    {[
                      "Product",
                      "Category",
                      "Farmer",
                      "Price",
                      "Stock",
                      "Action",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left px-5 py-3 font-semibold text-[var(--text-secondary)] whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filtered.map((product) => (
                    <tr
                      key={product.id}
                      className="hover:bg-[var(--surface)] transition"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-10 w-10 rounded-lg object-cover border border-[var(--border)] shrink-0"
                            />
                          )}
                          <span className="font-medium text-[var(--text-primary)] truncate max-w-[160px]">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">
                        {product.category || "—"}
                      </td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">
                        {product.sellerName || product.farmer || "—"}
                      </td>
                      <td className="px-5 py-3 font-semibold text-[var(--primary)]">
                        ₹{parsePrice(product.price)}
                      </td>
                      <td className="px-5 py-3 text-[var(--text-secondary)]">
                        {product.stock != null
                          ? `${product.stock} ${product.stockUnit || "kg"}`
                          : "—"}
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => setConfirm(product.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold transition"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {confirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setConfirm(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-[var(--text-primary)] text-center mb-2">
              Delete Product?
            </h3>
            <p className="text-sm text-[var(--text-secondary)] text-center mb-6 leading-6">
              This will permanently remove the product from the platform.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setConfirm(null)}
                className="h-11 rounded-xl border border-[var(--border)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--surface)] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirm)}
                className="h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}