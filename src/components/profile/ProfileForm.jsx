import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/AuthContext";

export default function ProfileForm() {
  const { user, updateUser } = useAuth();

  const isFarmer = user?.role === "farmer";

  const [form, setForm] = useState({
    farmName: "",
    ownerName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });

  // Sync form with user
  useEffect(() => {
    if (!user) return;

    setForm({
      farmName: user?.farmerProfile?.farmName || "",

      ownerName: user?.name || "",

      email: user?.email || "",

      phone: user?.phone || "",

      location: user?.profile?.location || "",

      bio: user?.profile?.bio || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({
  name: form.ownerName,

  email: form.email,

  phone: form.phone,

  profile: {
    ...user.profile,

    location: form.location,

    bio: form.bio,
  },

  ...(isFarmer && {
    farmerProfile: {
      ...user.farmerProfile,

      farmName: form.farmName,
    },
  }),
});

    console.log("Updated Profile:", form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-6 md:p-8
        space-y-6
      "
    >
      {/* Section Title */}
      <div>
        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
          Profile Information
        </h3>

        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Manage your personal and marketplace profile details.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Farm Name */}
        {/* Farmer Only */}
        {isFarmer && (
          <div>
            <label className="text-sm font-medium">Farm Name</label>

            <input
              type="text"
              name="farmName"
              value={form.farmName}
              onChange={handleChange}
              className="
                        mt-2 w-full h-11
                        rounded-xl
                        border border-[var(--border)]
                        bg-[var(--surface-2)]
                        px-4
                        outline-none
                        transition
                        focus:border-[var(--primary)]
                      "
            />
          </div>
        )}

        {/* Owner Name */}
        <div>
          <label className="text-sm font-medium">Owner Name</label>

          <input
            type="text"
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
            className="
              mt-2 w-full h-11
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface-2)]
              px-4
              outline-none
              transition
              focus:border-[var(--primary)]
            "
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="
              mt-2 w-full h-11
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface-2)]
              px-4
              outline-none
              transition
              focus:border-[var(--primary)]
            "
          />
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium">Phone Number</label>

          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="
              mt-2 w-full h-11
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface-2)]
              px-4
              outline-none
              transition
              focus:border-[var(--primary)]
            "
          />
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Location</label>

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="
              mt-2 w-full h-11
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface-2)]
              px-4
              outline-none
              transition
              focus:border-[var(--primary)]
            "
          />
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium">Bio</label>

          <textarea
            rows={5}
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="
              mt-2 w-full
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface-2)]
              px-4 py-3
              outline-none
              transition
              resize-none
              focus:border-[var(--primary)]
            "
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button type="submit" className="h-11 rounded-xl px-6">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
