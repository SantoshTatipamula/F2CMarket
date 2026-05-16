import { useAuth } from "@/context/AuthContext";

export default function ProfileHeader() {
  const { user } = useAuth();

  const isFarmer = user?.role === "farmer";

  const displayName =
    isFarmer
      ? user?.farmerProfile?.farmName
      : user?.name;

  return (
    <div
      className="
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-6 md:p-8
      "
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6">

        {/* Avatar */}
        <div
          className="
            flex items-center justify-center
            h-24 w-24 rounded-3xl
            bg-[var(--primary)] text-white
            text-3xl font-bold
          "
        >
          {displayName?.charAt(0).toUpperCase()}
        </div>

        {/* Info */}
        <div className="flex-1">

          <div className="flex flex-wrap items-center gap-3">
            
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">
              {displayName}
            </h2>

            <span
              className="
                rounded-full
                bg-[var(--surface-2)]
                px-3 py-1
                text-xs font-medium
                text-[var(--text-secondary)]
              "
            >
              {user?.role}
            </span>

            {isFarmer &&
              user?.farmerProfile?.verified && (
                <span
                  className="
                    rounded-full
                    bg-green-100
                    px-3 py-1
                    text-xs font-medium
                    text-green-700
                  "
                >
                  Verified Farmer
                </span>
              )}
          </div>

          <p
            className="
              mt-3
              text-[var(--text-secondary)]
              leading-relaxed
              max-w-2xl
            "
          >
            {user?.profile?.bio}
          </p>

          <div
            className="
              mt-4
              flex flex-wrap items-center gap-3
              text-sm text-[var(--text-secondary)]
            "
          >
            <span
              className="
                rounded-full
                bg-[var(--surface-2)]
                px-3 py-1
              "
            >
              {user?.profile?.location}
            </span>

            <span
              className="
                rounded-full
                bg-[var(--surface-2)]
                px-3 py-1
              "
            >
              Since {user?.profile?.joinedAt}
            </span>

            <span
              className="
                rounded-full
                bg-[var(--surface-2)]
                px-3 py-1
              "
            >
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}