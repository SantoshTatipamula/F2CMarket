import {
  Bell,
  ShoppingBag,
  Store,
  Mail,
  Megaphone,
} from "lucide-react";

import { useState } from "react";

import ProfileCard from "@/components/profile/shared/ProfileCard";

import ProfileCardHeader from "@/components/profile/shared/ProfileCardHeader";

export default function Notifications() {
  const [settings, setSettings] =
    useState({
      orderUpdates: true,

      sellerOrders: true,

      promotions: false,

      emailAlerts: true,

      marketplaceNews: false,
    });

  // Toggle
  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,

      [key]: !prev[key],
    }));
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
              Notification Preferences
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
                <Bell size={24} />
              </div>

              <div>
                
                <h1
                  className="
                    text-3xl font-bold
                    tracking-tight
                  "
                >
                  Notifications
                </h1>

                <p
                  className="
                    mt-3
                    max-w-2xl
                    text-sm leading-relaxed
                    text-white/80
                  "
                >
                  Control your marketplace,
                  order, and account
                  notifications across
                  F2CMARKET.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 space-y-8">
            
            {/* Marketplace */}
            <ProfileCard>
              
              <ProfileCardHeader
                title="Marketplace Notifications"
                description="Manage marketplace activities and seller alerts."
              />

              <div className="mt-8 space-y-4">
                
                <NotificationRow
                  icon={ShoppingBag}
                  title="Order Updates"
                  description="Receive notifications for order confirmations and status updates."
                  enabled={
                    settings.orderUpdates
                  }
                  onToggle={() =>
                    handleToggle(
                      "orderUpdates"
                    )
                  }
                />

                <NotificationRow
                  icon={Store}
                  title="Seller Orders"
                  description="Receive alerts when customers place new orders."
                  enabled={
                    settings.sellerOrders
                  }
                  onToggle={() =>
                    handleToggle(
                      "sellerOrders"
                    )
                  }
                />
              </div>
            </ProfileCard>

            {/* General */}
            <ProfileCard>
              
              <ProfileCardHeader
                title="General Notifications"
                description="Manage promotional and platform communications."
              />

              <div className="mt-8 space-y-4">
                
                <NotificationRow
                  icon={Megaphone}
                  title="Promotions & Offers"
                  description="Receive discounts, offers, and promotional campaigns."
                  enabled={
                    settings.promotions
                  }
                  onToggle={() =>
                    handleToggle(
                      "promotions"
                    )
                  }
                />

                <NotificationRow
                  icon={Mail}
                  title="Email Alerts"
                  description="Receive important account-related email notifications."
                  enabled={
                    settings.emailAlerts
                  }
                  onToggle={() =>
                    handleToggle(
                      "emailAlerts"
                    )
                  }
                />

                <NotificationRow
                  icon={Bell}
                  title="Marketplace News"
                  description="Receive updates about new marketplace features and announcements."
                  enabled={
                    settings.marketplaceNews
                  }
                  onToggle={() =>
                    handleToggle(
                      "marketplaceNews"
                    )
                  }
                />
              </div>
            </ProfileCard>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Notification Row */
function NotificationRow({
  icon: Icon,
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div
      className="
        flex items-start justify-between gap-5
        rounded-2xl
        border border-black/5
        bg-[var(--surface-2)]
        p-5
      "
    >
      
      {/* Left */}
      <div className="flex items-start gap-4">
        
        <div
          className="
            flex h-12 w-12
            items-center justify-center
            rounded-2xl
            bg-[var(--primary)]/10
            text-[var(--primary)]
          "
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
              max-w-xl
              text-sm leading-relaxed
              text-[var(--text-secondary)]
            "
          >
            {description}
          </p>
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={onToggle}
        className={`
          relative h-7 w-12
          rounded-full
          transition-all duration-300
          ${
            enabled
              ? "bg-[var(--primary)]"
              : "bg-gray-300"
          }
        `}
      >
        <span
          className={`
            absolute top-1
            h-5 w-5 rounded-full
            bg-white
            transition-all duration-300
            ${
              enabled
                ? "right-1"
                : "left-1"
            }
          `}
        />
      </button>
    </div>
  );
}