import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function ProductForm({
  initialData = {},
  onSubmit,
  submitLabel = "Save Product",
}) {
  const [form, setForm] = useState({
    name: initialData.name || "",
    category: initialData.category || "",
    price: initialData.price || "",
    stock: initialData.stock || "",
    image: initialData.image || "",
    description:
      initialData.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...form,
      id: Date.now(),
      status: "active",
      totalOrders: 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      
      {/* Product Name */}
      <div>
        <label className="text-sm font-medium">
          Product Name
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="mt-2 w-full h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 outline-none focus:border-[var(--primary)]"
          required
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-medium">
          Category
        </label>

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Vegetables, Fruits..."
          className="mt-2 w-full h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 outline-none focus:border-[var(--primary)]"
          required
        />
      </div>

      {/* Price + Stock */}
      <div className="grid grid-cols-2 gap-4">
        
        <div>
          <label className="text-sm font-medium">
            Price
          </label>

          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="₹40"
            className="mt-2 w-full h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 outline-none focus:border-[var(--primary)]"
            required
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="100"
            className="mt-2 w-full h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 outline-none focus:border-[var(--primary)]"
            required
          />
        </div>
      </div>

      {/* Image URL */}
      <div>
        <label className="text-sm font-medium">
          Product Image URL
        </label>

        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Paste image URL"
          className="mt-2 w-full h-11 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 outline-none focus:border-[var(--primary)]"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium">
          Description
        </label>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Write product description..."
          className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none focus:border-[var(--primary)] resize-none"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full h-11 rounded-xl"
      >
        {submitLabel}
      </Button>
    </form>
  );
}