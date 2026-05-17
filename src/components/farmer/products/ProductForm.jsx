import { useState } from "react";

import {
  Package,
  Layers3,
  IndianRupee,
  Boxes,
  FileText,
  ImagePlus,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

    description: initialData.description || "",

    location: initialData.location || "",
  });

  const [uploading, setUploading] = useState(false);

  const [preview, setPreview] = useState(initialData.image || "");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    // Fake Upload Delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);

    setForm((prev) => ({
      ...prev,
      image: imageUrl,
    }));

    setUploading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (uploading) return;

    onSubmit({
      ...form,
      id: Date.now(),
      status: "active",
      totalOrders: 0,
    });
  };

  const fieldStyles = `
    h-12 rounded-2xl
    border border-black/5
    bg-white
    shadow-sm
    pl-12
    transition-all duration-200
    hover:border-black/10
    focus-visible:ring-2
    focus-visible:ring-[var(--primary)]/15
    focus-visible:border-[var(--primary)]/20
    focus-visible:outline-none
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      {/* Product Name */}
      <div className="space-y-2.5">
        <Label className="text-sm font-medium text-[var(--text-primary)]">
          Product Name
        </Label>

        <div className="relative">
          <Package
            size={18}
            className="
              absolute left-4 top-1/2
              -translate-y-1/2
              text-[var(--text-secondary)]
            "
          />

          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Fresh Organic Tomatoes"
            className={fieldStyles}
            required
          />
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2.5">
        <Label className="text-sm font-medium text-[var(--text-primary)]">
          Category
        </Label>

        <div className="relative">
          <Layers3
            size={18}
            className="
              absolute left-4 top-1/2
              z-10 -translate-y-1/2
              text-[var(--text-secondary)]
            "
          />

          <Select
            value={form.category}
            onValueChange={(value) =>
              setForm((prev) => ({
                ...prev,
                category: value,
              }))
            }
          >
            <SelectTrigger
              className={`
                ${fieldStyles}
                pr-4
              `}
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent
              className="
                rounded-2xl
                border border-black/5
                bg-white
                shadow-xl
              "
            >
              <SelectItem
                value="Vegetables"
                className="
                  rounded-xl
                  focus:bg-[var(--primary)]/10
                  focus:text-[var(--primary)]
                "
              >
                Vegetables
              </SelectItem>

              <SelectItem
                value="Fruits"
                className="
                  rounded-xl
                  focus:bg-[var(--primary)]/10
                  focus:text-[var(--primary)]
                "
              >
                Fruits
              </SelectItem>

              <SelectItem
                value="Leafy Greens"
                className="
                  rounded-xl
                  focus:bg-[var(--primary)]/10
                  focus:text-[var(--primary)]
                "
              >
                Leafy Greens
              </SelectItem>

              <SelectItem
                value="Dairy"
                className="
                  rounded-xl
                  focus:bg-[var(--primary)]/10
                  focus:text-[var(--primary)]
                "
              >
                Dairy
              </SelectItem>

              <SelectItem
                value="Organic"
                className="
                  rounded-xl
                  focus:bg-[var(--primary)]/10
                  focus:text-[var(--primary)]
                "
              >
                Organic
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Price + Stock */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Price */}
        <div className="space-y-2.5">
          <Label className="text-sm font-medium text-[var(--text-primary)]">
            Price
          </Label>

          <div className="relative">
            <IndianRupee
              size={18}
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-[var(--text-secondary)]
              "
            />

            <Input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="40"
              className={fieldStyles}
              required
            />
          </div>
        </div>

        {/* Stock */}
        <div className="space-y-2.5">
          <Label className="text-sm font-medium text-[var(--text-primary)]">
            Stock
          </Label>

          <div className="relative">
            <Boxes
              size={18}
              className="
                absolute left-4 top-1/2
                -translate-y-1/2
                text-[var(--text-secondary)]
              "
            />

            <Input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="100"
              className={fieldStyles}
              required
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2.5">
          <Label className="text-sm font-medium text-[var(--text-primary)]">
            Location
          </Label>

          <Input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Karimnagar"
            className={fieldStyles}
            required
          />
        </div>
      </div>

      {/* Product Image */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-[var(--text-primary)]">
          Product Image
        </Label>

        <div
          className={`
    rounded-3xl
    border border-dashed border-black/10
    bg-white
    transition-all duration-300
    ${preview ? "inline-flex p-3" : "w-full p-5"}
  `}
        >
          {!preview ? (
            <label
              className="
                flex cursor-pointer flex-col items-center
                justify-center rounded-2xl
                border border-black/5
                bg-[var(--surface)]
                px-6 py-10
                text-center
                transition hover:border-[var(--primary)]/20
              "
            >
              <div
                className="
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl
                  bg-[var(--primary)]/10
                "
              >
                <ImagePlus size={24} className="text-[var(--primary)]" />
              </div>

              <h4 className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
                Upload Product Image
              </h4>

              <p className="mt-1 text-xs text-[var(--text-secondary)]">
                PNG, JPG or WEBP
              </p>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          ) : (
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={preview}
                alt="Preview"
                className="
  h-64 w-full max-w-sm
  rounded-2xl
  object-cover
  shadow-sm
"
              />

              <button
                type="button"
                onClick={() => {
                  setPreview("");

                  setForm((prev) => ({
                    ...prev,
                    image: "",
                  }));
                }}
                className="
                  absolute right-3 top-3
                  flex h-9 w-9 items-center justify-center
                  rounded-full
                  bg-black/70
                  text-white
                  backdrop-blur-md
                  transition hover:bg-black
                "
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Uploading */}
          {uploading && (
            <div className="mt-4 flex items-center gap-3">
              <div
                className="
                  h-5 w-5 rounded-full
                  border-2 border-[var(--primary)]/20
                  border-t-[var(--primary)]
                  animate-spin
                "
              />

              <p className="text-sm text-[var(--text-secondary)]">
                Uploading image...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2.5">
        <Label className="text-sm font-medium text-[var(--text-primary)]">
          Description
        </Label>

        <div className="relative">
          <FileText
            size={18}
            className="
              absolute left-4 top-4
              text-[var(--text-secondary)]
            "
          />

          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Write product description..."
            className="
              rounded-2xl
              border border-black/5
              bg-white
              shadow-sm
              pl-12 pt-4
              resize-none
              transition-all duration-200
              hover:border-black/10
              focus-visible:ring-2
              focus-visible:ring-[var(--primary)]/15
              focus-visible:border-[var(--primary)]/20
              focus-visible:outline-none
            "
          />
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={uploading}
        className="
          h-12 w-full rounded-2xl
          bg-[var(--primary)]
          text-sm font-semibold
          hover:bg-[var(--primary-hover)]
          text-white
          disabled:pointer-events-none
          disabled:opacity-60
        "
      >
        {uploading ? "Uploading..." : submitLabel}
      </Button>
    </form>
  );
}
