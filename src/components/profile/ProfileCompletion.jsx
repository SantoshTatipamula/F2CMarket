import {
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import ProfileCard from "@/components/profile/shared/ProfileCard";

import ProfileCardHeader from "@/components/profile/shared/ProfileCardHeader";

export default function ProfileCompletion() {
  const { user } = useAuth();

  const completionItems = [
    {
      label: "Profile Photo",
      completed: !!user?.avatar,
    },

    {
      label: "Phone Number",
      completed: !!user?.phone,
    },

    {
      label: "Location",
      completed:
        !!user?.profile?.location,
    },

    {
      label: "Bio Information",
      completed:
        !!user?.profile?.bio,
    },
  ];

  const completedCount =
    completionItems.filter(
      (item) => item.completed
    ).length;

  const completionPercentage =
    Math.round(
      (completedCount /
        completionItems.length) *
        100
    );

  return (
    <ProfileCard>
      
      {/* Header */}
      <ProfileCardHeader
        title="Profile Completion"
        description="Complete your profile to improve marketplace visibility and trust."
      />

      {/* Progress */}
      <div className="mt-8">
        
        {/* Top */}
        <div className="flex items-center justify-between">
          
          <p
            className="
              text-sm font-medium
              text-[var(--text-secondary)]
            "
          >
            Completion Status
          </p>

          <span
            className="
              text-sm font-bold
              text-[var(--primary)]
            "
          >
            {completionPercentage}%
          </span>
        </div>

        {/* Progress Bar */}
        <div
          className="
            mt-3
            h-3 overflow-hidden
            rounded-full
            bg-[var(--surface-2)]
          "
        >
          <div
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-[var(--primary)]
              to-emerald-500
              transition-all duration-500
            "
            style={{
              width: `${completionPercentage}%`,
            }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-8 space-y-4">
        {completionItems.map(
          (item) => (
            <div
              key={item.label}
              className="
                flex items-center
                justify-between
                rounded-2xl
                border border-black/5
                bg-[var(--surface-2)]
                px-4 py-4
              "
            >
              
              <div className="flex items-center gap-3">
                
                {item.completed ? (
                  <CheckCircle2
                    size={20}
                    className="text-emerald-500"
                  />
                ) : (
                  <AlertCircle
                    size={20}
                    className="text-orange-500"
                  />
                )}

                <span
                  className="
                    text-sm font-medium
                    text-[var(--text-primary)]
                  "
                >
                  {item.label}
                </span>
              </div>

              <span
                className={`
                  text-xs font-semibold
                  ${
                    item.completed
                      ? "text-emerald-600"
                      : "text-orange-500"
                  }
                `}
              >
                {item.completed
                  ? "Completed"
                  : "Pending"}
              </span>
            </div>
          )
        )}
      </div>
    </ProfileCard>
  );
}