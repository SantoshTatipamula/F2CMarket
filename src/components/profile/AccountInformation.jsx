import {
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  User2,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

import ProfileCard from "@/components/profile/shared/ProfileCard";

import ProfileCardHeader from "@/components/profile/shared/ProfileCardHeader";

import ProfileInfoRow from "@/components/profile/shared/ProfileInfoRow";

export default function AccountInformation() {
  const { user } = useAuth();

  return (
    <ProfileCard>
      
      {/* Header */}
      <ProfileCardHeader
        title="Account Information"
        description="Personal and marketplace account details associated with your profile."
      />

      {/* Content */}
      <div className="mt-8 space-y-4">
        
        <ProfileInfoRow
          icon={User2}
          label="Full Name"
          value={
            user?.name ||
            "Not provided"
          }
        />

        <ProfileInfoRow
          icon={Mail}
          label="Email Address"
          value={
            user?.email ||
            "Not provided"
          }
        />

        <ProfileInfoRow
          icon={Phone}
          label="Phone Number"
          value={
            user?.phone ||
            "Not provided"
          }
        />

        <ProfileInfoRow
          icon={MapPin}
          label="Location"
          value={
            user?.profile?.location ||
            "India"
          }
        />

        <ProfileInfoRow
          icon={CalendarDays}
          label="Member Since"
          value={
            user?.profile?.joinedAt ||
            "2025"
          }
        />
      </div>
    </ProfileCard>
  );
}