import { useState, useEffect } from "react";

import {
  User2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Store,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/context/AuthContext";
import { sendGenericEmail } from "@/services/emailService";

import ProfileCard from "@/components/profile/shared/ProfileCard";

import ProfileCardHeader from "@/components/profile/shared/ProfileCardHeader";

import LocationDialog from "../home/hero/LocationDialog";

export default function ProfileForm() {
  const { user, updateUser } = useAuth();

  const isFarmer = user?.role === "farmer";

  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  const [form, setForm] = useState({
    farmName: "",
    ownerName: "",
    email: "",
    phone: "",

    // Consumer
    profileLocation: null,

    bio: "",

    // Farmer
    farmLocation: null,
  });

  // Sync form with user
  useEffect(() => {
    if (!user) return;

    setForm({
      farmName: user?.farmerProfile?.farmName || "",

      ownerName: user?.name || "",

      email: user?.email || "",

      phone: user?.phone || "",

      profileLocation: user?.profile?.location || null,

      bio: user?.profile?.bio || "",

      // Farmer only
      farmLocation: user?.farmerProfile?.location || null,
    });
  }, [user]);

  // Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFarmLocationSelect = (location) => {
    setForm((prev) => ({
      ...prev,
      farmLocation: location,
    }));
  };

  const handleProfileLocationSelect = (location) => {
    setForm((prev) => ({
      ...prev,
      profileLocation: location,
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    /* Email wired below */
    sendGenericEmail({
      name: user?.name || "",
      email: user?.email || "",
      subject: "Profile Updated — F2CMARKET",
      message: `Hi ${user?.name}, your profile was updated.\n\nF2CMARKET Team`,
    });

    updateUser({
      name: form.ownerName,

      email: form.email,

      phone: form.phone,

      profile: {
        ...user.profile,

        location: form.profileLocation,

        bio: form.bio,
      },

      ...(isFarmer && {
        farmerProfile: {
          ...user.farmerProfile,

          farmName: form.farmName,

          location: form.farmLocation,
        },
      }),
    });

    console.log("Updated Profile:", form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Profile Image */}
      

      {/* Basic Information */}
      <ProfileCard>
        <ProfileCardHeader
          title="Basic Information"
          description="Manage your personal account details."
        />

        <div
          className="
            mt-8
            grid grid-cols-1 gap-6
            md:grid-cols-2
          "
        >
          {isFarmer && (
            <InputField
              icon={Store}
              label="Farm Name"
              name="farmName"
              value={form.farmName}
              onChange={handleChange}
            />
          )}

          <InputField
            icon={User2}
            label="Owner Name"
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
          />

          <InputField
            icon={Mail}
            label="Email Address"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <InputField
            icon={Phone}
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
      </ProfileCard>

      {/* Bio */}
      <ProfileCard>
        <ProfileCardHeader
          title="Profile Bio"
          description="Tell people more about yourself and your marketplace identity."
        />

        <div className="mt-8">
          <label className="block">
            <span
              className="
                mb-3 flex items-center gap-2
                text-sm font-medium
                text-[var(--text-primary)]
              "
            >
              <FileText size={18} />
              Bio Information
            </span>

            <textarea
              rows={5}
              name="bio"
              value={form.bio}
              onChange={handleChange}
              placeholder="Write something about yourself..."
              className="
                w-full
                rounded-2xl
                border border-black/10
                bg-[var(--surface-2)]
                px-5 py-4
                text-sm
                outline-none
                transition-all duration-300
                resize-none
                focus:border-[var(--primary)]/30
                focus:ring-4
                focus:ring-[var(--primary)]/10
              "
            />
          </label>
        </div>
      </ProfileCard>

      {!isFarmer && (
        <ProfileCard>
          <ProfileCardHeader
            title="Profile Location"
            description="Manage your residential location."
          />

          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5">
              <div className="flex items-start gap-3">
                <MapPin size={22} className="mt-0.5 text-[var(--primary)]" />

                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    Residential Address
                  </h3>

                  {form.profileLocation ? (
                    <>
                      <p className="mt-2 break-words text-sm text-[var(--text-secondary)]">
                        {form.profileLocation.fullAddress}
                      </p>

                      <p className="mt-3 text-xs text-[var(--text-muted)]">
                        Latitude: {form.profileLocation.latitude?.toFixed(6)}
                      </p>

                      <p className="text-xs text-[var(--text-muted)]">
                        Longitude: {form.profileLocation.longitude?.toFixed(6)}
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      No profile location selected.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => setLocationDialogOpen(true)}
            >
              {form.profileLocation
                ? "Change Profile Location"
                : "Select Profile Location"}
            </Button>
          </div>
        </ProfileCard>
      )}

      {isFarmer && (
        <ProfileCard>
          <ProfileCardHeader
            title="Farm Location"
            description="Set your farm location to help customers identify where your products are grown."
          />

          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)] p-5">
              <div className="flex items-start gap-3">
                <MapPin size={22} className="mt-0.5 text-[var(--primary)]" />

                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    Farm Address
                  </h3>

                  {form.farmLocation ? (
                    <>
                      <p className="mt-2 break-words text-sm text-[var(--text-secondary)]">
                        {form.farmLocation.fullAddress}
                      </p>

                      <p className="mt-3 text-xs text-[var(--text-muted)]">
                        Latitude: {form.farmLocation.latitude?.toFixed(6)}
                      </p>

                      <p className="text-xs text-[var(--text-muted)]">
                        Longitude: {form.farmLocation.longitude?.toFixed(6)}
                      </p>
                    </>
                  ) : (
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      No farm location selected.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="button"
              onClick={() => setLocationDialogOpen(true)}
              variant="outline"
            >
              {form.farmLocation
                ? "Change Farm Location"
                : "Select Farm Location"}
            </Button>
          </div>
        </ProfileCard>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          className="
            h-12 rounded-2xl
            px-7
            text-sm font-semibold
          "
        >
          Save Changes
        </Button>
      </div>

      <LocationDialog
  open={locationDialogOpen}
  onOpenChange={setLocationDialogOpen}
  value={
    isFarmer
      ? form.farmLocation
      : form.profileLocation
  }
  onConfirm={
    isFarmer
      ? handleFarmLocationSelect
      : handleProfileLocationSelect
  }
/>
    </form>
  );
}

/* Reusable Input */
function InputField({ icon: Icon, label, name, value, onChange }) {
  return (
    <label className="block">
      <span
        className="
          mb-3 flex items-center gap-2
          text-sm font-medium
          text-[var(--text-primary)]
        "
      >
        <Icon size={18} />

        {label}
      </span>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="
          h-12 w-full
          rounded-2xl
          border border-black/10
          bg-[var(--surface-2)]
          px-5
          text-sm
          outline-none
          transition-all duration-300
          focus:border-[var(--primary)]/30
          focus:ring-4
          focus:ring-[var(--primary)]/10
        "
      />
    </label>
  );
}
