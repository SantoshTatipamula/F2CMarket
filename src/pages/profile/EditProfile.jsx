import { ArrowLeft, Pencil } from "lucide-react";

import { Link } from "react-router-dom";
// import { useAuth } from "@/context/AuthContext";
// import FarmInformation from "@/components/farmer/profile/FarmInformation";

import ProfileForm from "@/components/profile/ProfileForm";
import ProfileImageUpload from "@/components/profile/ProfileImageUpload";

export default function EditProfile() {
  // const { user } = useAuth();

  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <section
        className="
          mx-auto
          max-w-5xl
          px-4 py-8
          lg:px-8
        "
      >
        {/* Back Navigation */}
        <Link
          to="/profile"
          className="
            inline-flex items-center gap-2
            text-sm font-medium
            text-[var(--text-secondary)]
            transition-colors duration-300
            hover:text-[var(--primary)]
          "
        >
          <ArrowLeft size={18} />
          Back to Profile
        </Link>

        {/* Hero */}
        <div
          className="
            mt-6
            overflow-hidden
            rounded-[32px]
            border border-black/5
            bg-[var(--surface)]
            shadow-sm
          "
        >
          {/* Banner */}
          <div
            className="
              bg-gradient-to-br
              from-[var(--primary)]
              via-[var(--primary)]/90
              to-emerald-500
              px-8 py-10
              text-white
            "
          >
            <div
              className="
                inline-flex items-center
                rounded-full
                bg-white/10
                px-4 py-1.5
                text-sm font-semibold
                backdrop-blur-md
              "
            >
              Account Management
            </div>

            <div className="mt-6 flex items-start gap-4">
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-white/10
                  backdrop-blur-md
                "
              >
                <Pencil size={24} />
              </div>

              <div>
                <h1
                  className="
                    text-3xl font-bold
                    tracking-tight
                  "
                >
                  Edit Profile
                </h1>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm leading-relaxed
                    text-white/80
                  "
                >
                  Manage your personal identity, marketplace profile, and seller
                  information across F2CMARKET.
                </p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          {/* Upload Section */}
          <div className="p-6 md:p-8">
            <ProfileImageUpload />
          </div>

          {/* Divider */}
          <div className="border-t border-[var(--border)]" />

          {/* Form */}
          <div className="p-6 md:p-8">
            <ProfileForm />
          </div>
        </div>
      </section>
    </main>
  );
}
