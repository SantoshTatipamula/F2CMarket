import { useRef } from "react";
import { Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { uploadImage } from "@/services/cloudinaryService";
import { toast } from "sonner";

export default function ProfileImageUpload() {
  const { user, updateUser } = useAuth();

  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  /* Upload Avatar */
 const handleAvatarUpload = async (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  try {
    toast.loading("Uploading profile photo...", {
      id: "avatar-upload",
    });

    const imageUrl = await uploadImage(
      file,
      "f2cmarket/profiles/avatars"
    );

    updateUser({
      avatar: imageUrl,
    });

    toast.success("Profile photo updated!", {
      id: "avatar-upload",
    });
  } catch (error) {
    console.error(error);

    toast.error("Failed to upload profile photo.", {
      id: "avatar-upload",
    });
  }
};

  /* Upload Banner */
 const handleBannerUpload = async (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  try {
    toast.loading("Uploading banner...", {
      id: "banner-upload",
    });

    const imageUrl = await uploadImage(
      file,
      "f2cmarket/profiles/banners"
    );

    updateUser({
      coverImage: imageUrl,
    });

    toast.success("Banner updated!", {
      id: "banner-upload",
    });
  } catch (error) {
    console.error(error);

    toast.error("Failed to upload banner.", {
      id: "banner-upload",
    });
  }
};

  const bannerImage =
    user?.coverImage ||
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80";

  const avatarImage =
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User"
    )}&background=random`;

  return (
    <section className="relative">
      {/* Banner */}
      <div className="relative h-52 overflow-hidden rounded-3xl bg-[var(--surface-2)] md:h-64">
        <img
          src={bannerImage}
          alt="Profile Banner"
          className="h-full w-full object-cover"
        />

        <button
          type="button"
          onClick={() => bannerInputRef.current?.click()}
          className="
            absolute top-4 right-4
            flex h-11 w-11 items-center justify-center
            rounded-2xl
            bg-black/40
            text-white
            backdrop-blur-md
            transition
            hover:bg-black/60
          "
        >
          <Camera size={18} />
        </button>

        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleBannerUpload}
        />
      </div>

      {/* Avatar */}
      <div className="relative -mt-16 flex justify-center">
        <div className="relative">
          <img
            src={avatarImage}
            alt="Profile"
            className="
              h-32 w-32
              rounded-full
              border-4 border-white
              bg-white
              object-cover
              shadow-xl
            "
          />

          <button
            type="button"
            onClick={() => avatarInputRef.current?.click()}
            className="
              absolute bottom-1 right-1
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-[var(--primary)]
              text-white
              shadow-lg
              transition
              hover:bg-[var(--primary-hover)]
            "
          >
            <Camera size={16} />
          </button>

          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarUpload}
          />
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-[var(--text-primary)]">
          Update Profile Appearance
        </h3>

        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Click the camera icon on the banner or profile photo to upload a new
          image.
        </p>
      </div>
    </section>
  );
}