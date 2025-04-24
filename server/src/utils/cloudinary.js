import cloudinary from "cloudinary";

// Configuring Cloudinary using the CLOUDINARY_URL from environment variables
cloudinary.config({
  url: process.env.CLOUDINARY_URL,
});

// Upload function
export const uploadImageToCloudinary = async (file) => {
  try {
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "feedback_images", // Optional: specify folder in Cloudinary
    });
    return result; // Return Cloudinary upload result
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed");
  }
};
