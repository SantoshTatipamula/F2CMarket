// src/services/cloudinaryService.js

export async function uploadImage(
  file,
  folder = "f2cmarket"
) {
  const formData = new FormData();

  formData.append("file", file);

  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  formData.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const data = await response.json();

  return data.secure_url;
}