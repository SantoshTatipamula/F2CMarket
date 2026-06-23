import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Star } from "lucide-react";

import emailjs from "@emailjs/browser";
import { toast } from "sonner";

import { saveFeedback } from "@/services/feedbackService";

export default function FeedbackForm() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    category: "",
    rating: 5,
    message: "",
  });

  async function handleSubmit(e) {
  e.preventDefault();

  if (!formData.category) {
    toast.error("Please select a feedback category.");
    return;
  }

  if (!formData.message.trim()) {
    toast.error("Please enter your feedback.");
    return;
  }

  try {
    setLoading(true);

    // Save locally
    saveFeedback(formData);

    // Send Email
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email: formData.email,
        to_name: formData.name,

        subject: `Feedback - ${formData.category}`,

        message: `
Name: ${formData.name}
Email: ${formData.email}

Category: ${formData.category}
Rating: ${formData.rating}/5

Feedback:
${formData.message}
        `,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    toast.success("Thank you for your feedback!");

    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      category: "",
      rating: 5,
      message: "",
    });

  } catch (error) {
    console.error(error);
    toast.error("Failed to submit feedback.");
  } finally {
    setLoading(false);
  }
}

  return (
    <form className="space-y-6">
      {/* Name */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Full Name
        </label>

        <input
          type="text"
          value={formData.name}
          disabled
          className="
            h-12 w-full rounded-xl
            border border-[var(--border)]
            bg-[var(--surface-2)]
            px-4
          "
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Email Address
        </label>

        <input
          type="email"
          value={formData.email}
          disabled
          className="
            h-12 w-full rounded-xl
            border border-[var(--border)]
            bg-[var(--surface-2)]
            px-4
          "
        />
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Feedback Category
        </label>

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: e.target.value,
            })
          }
          className="
            h-12 w-full rounded-xl
            border border-[var(--border)]
            px-4
          "
        >
          <option value="">Select Category</option>
          <option value="general">General Feedback</option>
          <option value="website">Website Experience</option>
          <option value="farmer">Farmer Experience</option>
          <option value="delivery">Delivery Experience</option>
          <option value="bug">Bug Report</option>
          <option value="feature">Feature Request</option>
        </select>
      </div>

      {/* Rating */}
      <div>
        <label className="mb-3 block text-sm font-medium">
          Rate Your Experience
        </label>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  rating: star,
                })
              }
            >
              <Star
                size={30}
                className={
                  star <= formData.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            </button>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Your Feedback
        </label>

        <textarea
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value,
            })
          }
          placeholder="Share your experience with F2CMARKET..."
          className="
            w-full rounded-xl
            border border-[var(--border)]
            p-4
          "
        />
      </div>

      {/* Submit */}
      <button
      onClick={handleSubmit}
        type="submit"
        className="
          h-12 rounded-xl
          bg-[var(--primary)]
          px-8
          font-semibold
          text-white
          transition hover:opacity-90
        "
      >
        Submit Feedback
      </button>
    </form>
  );
}