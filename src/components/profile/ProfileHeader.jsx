import {  MapPin, CalendarDays, Pencil } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import ProfileActionButton from "@/components/profile/shared/ProfileActionButton";

export default function ProfileHeader() {
  const { user } = useAuth();

  const isFarmer = user?.role === "farmer";

  return (
    <section
      className="
        overflow-hidden
        rounded-[32px]
        border border-black/5
        bg-[var(--surface)]
        shadow-sm
      "
    >
      {/* Cover */}
      <div className="relative h-56 overflow-hidden">
  {user?.coverImage ? (
    <img loading="lazy"
      src={user.coverImage}
      alt="Cover"
      className="h-full w-full object-cover"
    />
  ) : (
    <div
      className="
        h-full w-full
        bg-gradient-to-br
        from-[var(--primary)]
        via-[var(--primary)]/90
        to-emerald-500
      "
    />
  )}
</div>

      {/* Content */}
      <div className="relative px-6 pb-8">
        {/* Avatar */}
        <div
          className="
            relative
            -mt-16
            h-32 w-32
            overflow-hidden
            rounded-[28px]
            border-4 border-white
            bg-[var(--surface-2)]
            shadow-xl
          "
        >
          <img loading="lazy"
            src={user?.avatar || "https://ui-avatars.com/api/?name=User"}
            alt={user?.name}
            className="
              h-full w-full
              object-cover
            "
          />

          
        </div>

        {/* Main Content */}
        <div
          className="
            mt-6
            flex flex-col gap-8
            xl:flex-row
            xl:items-end
            xl:justify-between
          "
        >
          {/* Left */}
          <div className="max-w-3xl">
            {/* Role Badge */}
            <div
              className="
                inline-flex items-center
                rounded-full
                bg-[var(--primary)]/10
                px-4 py-1.5
                text-sm font-semibold
                capitalize
                text-[var(--primary)]
              "
            >
              {user?.role}
            </div>

            {/* Name */}
            <h1
              className="
                mt-4
                text-4xl font-bold
                tracking-tight
                text-[var(--text-primary)]
              "
            >
              {user?.name}
            </h1>

            {/* Bio */}
            <p
              className="
                mt-4
                max-w-2xl
                text-base leading-relaxed
                text-[var(--text-secondary)]
              "
            >
              {user?.profile?.bio || "Welcome to your F2CMARKET profile."}
            </p>

            {/* Meta */}
            <div
              className="
                mt-6
                flex flex-wrap items-center gap-5
                text-sm
                text-[var(--text-secondary)]
              "
            >
              {/* Location */}
              {/* Location */}
              <div className="flex items-center gap-2">
                <MapPin size={16} />

                <span>
                  {isFarmer
                    ? user?.farmerProfile?.location?.city || "Location not set"
                    : user?.profile?.location?.city ||
                      user?.profile?.location ||
                      "Location not set"}
                </span>
              </div>

              {/* Joined */}
              <div className="flex items-center gap-2">
                <CalendarDays size={16} />

                <span>Joined {user?.profile?.joinedAt || "2025"}</span>
              </div>
            </div>

            {/* Farmer Badge */}
            {isFarmer && (
              <div
                className="
                  mt-6
                  inline-flex items-center
                  rounded-2xl
                  border border-emerald-500/10
                  bg-emerald-500/5
                  px-5 py-3
                  text-sm font-medium
                  text-emerald-700
                "
              >
                {user?.farmerProfile?.farmName || "Verified Farmer"}
              </div>
            )}
          </div>

          {/* Actions */}
          <div
            className="
              flex flex-wrap items-center gap-4
            "
          >
            <ProfileActionButton to="/profile/edit">
              <span className="flex items-center gap-2">
                <Pencil size={16} />
                Edit Profile
              </span>
            </ProfileActionButton>

            <ProfileActionButton to="/profile/settings" variant="secondary">
              Account Settings
            </ProfileActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
