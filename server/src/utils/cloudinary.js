import cloudinary from "cloudinary";
import sharp from "sharp";
import streamifier from "streamifier";

// Configuring Cloudinary using CLOUDINARY_URL
cloudinary.config({
  url: process.env.CLOUDINARY_URL,
});

// Optimized upload function
export const uploadImageToCloudinary = async (file) => {
  try {
    // Step 1: Process image with sharp
    const optimizedBuffer = await sharp(file.path)
      .resize({ width: 800 }) // Resize to max width
      .jpeg({ quality: 70 }) // Compress JPEG quality
      .toBuffer();

    // Step 2: Upload to Cloudinary using upload_stream
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.v2.uploader.upload_stream(
        {
          folder: "feedback_images",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return reject(new Error("Image upload failed"));
          }
          resolve(result);
        }
      );

      streamifier.createReadStream(optimizedBuffer).pipe(uploadStream);
    });
  } catch (error) {
    console.error("Sharp Processing Error:", error);
    throw new Error("Image processing/upload failed");
  }
};
