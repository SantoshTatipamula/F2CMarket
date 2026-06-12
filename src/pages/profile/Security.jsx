import {
  Shield,
  LockKeyhole,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { sendGenericEmail } from "@/services/emailService";
import { toast } from "sonner";

import ProfileCard from "@/components/profile/shared/ProfileCard";

import ProfileCardHeader from "@/components/profile/shared/ProfileCardHeader";

import { Button } from "@/components/ui/button";

export default function Security() {
  const { user, updateUserInList } = useAuth();
  const [form, setForm] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  // Handle Change
  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }
    if (user?.password !== form.currentPassword) {
      toast.error("Current password is incorrect.");
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    updateUserInList({ ...user, password: form.newPassword });

    /* Send security alert email */
    sendGenericEmail({
      name:    user?.name || "User",
      email:   user?.email || "",
      subject: "Password Changed — F2CMARKET",
      message: `Hi ${user?.name},\n\nYour F2CMARKET account password was changed successfully.\n\nIf you did not make this change, contact support immediately at support@f2cmarket.com.\n\nF2CMARKET Team`,
    });

    toast.success("Password updated successfully!");
    setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

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
        
        {/* Hero */}
        <div
          className="
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
              Account Protection
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
                <Shield size={24} />
              </div>

              <div>
                
                <h1
                  className="
                    text-3xl font-bold
                    tracking-tight
                  "
                >
                  Security Settings
                </h1>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm leading-relaxed
                    text-white/80
                  "
                >
                  Manage your password,
                  account security, and
                  protection preferences
                  across F2CMARKET.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Password */}
            <ProfileCard>
              
              <ProfileCardHeader
                title="Change Password"
                description="Update your account password regularly to keep your marketplace account secure."
              />

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >
                
                <PasswordField
                  label="Current Password"
                  name="currentPassword"
                  value={
                    form.currentPassword
                  }
                  onChange={
                    handleChange
                  }
                />

                <PasswordField
                  label="New Password"
                  name="newPassword"
                  value={
                    form.newPassword
                  }
                  onChange={
                    handleChange
                  }
                />

                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  value={
                    form.confirmPassword
                  }
                  onChange={
                    handleChange
                  }
                />

                <div className="flex justify-end">
                  
                  <Button
                    type="submit"
                    className="
                      h-12 rounded-2xl
                      px-7
                    "
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </ProfileCard>

            {/* Security Status */}
            <ProfileCard>
              
              <ProfileCardHeader
                title="Security Status"
                description="Monitor your account protection and security recommendations."
              />

              <div className="mt-8 space-y-4">
                
                <SecurityStatus
                  icon={
                    CheckCircle2
                  }
                  title="Strong Account Protection"
                  description="Your account currently has a secure password configuration."
                  success
                />

                <SecurityStatus
                  icon={
                    AlertTriangle
                  }
                  title="Enable Two-Factor Authentication"
                  description="Additional account protection features can improve account security."
                />
              </div>
            </ProfileCard>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Password Field */
function PasswordField({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <label className="block">
      
      <span
        className="
          mb-3 flex items-center gap-2
          text-sm font-medium
          text-[var(--text-primary)]
        "
      >
        <LockKeyhole size={18} />

        {label}
      </span>

      <input
        type="password"
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

/* Security Status */
function SecurityStatus({
  icon: Icon,
  title,
  description,
  success = false,
}) {
  return (
    <div
      className="
        flex items-start gap-4
        rounded-2xl
        border border-black/5
        bg-[var(--surface-2)]
        p-5
      "
    >
      
      <div
        className={`
          flex h-12 w-12
          items-center justify-center
          rounded-2xl
          ${
            success
              ? "bg-emerald-500/10 text-emerald-600"
              : "bg-orange-500/10 text-orange-500"
          }
        `}
      >
        <Icon size={22} />
      </div>

      <div>
        
        <h3
          className="
            text-base font-semibold
            text-[var(--text-primary)]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-2
            text-sm leading-relaxed
            text-[var(--text-secondary)]
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}