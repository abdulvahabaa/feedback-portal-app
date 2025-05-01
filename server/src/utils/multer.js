import multer from "multer";

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("File is being stored in /uploads");
    cb(null, "uploads/"); // Folder to store uploaded images temporarily
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1]; // Extract file extension
    cb(null, `${Date.now()}.${ext}`); // Use current timestamp for unique filename
  },
});

// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// Initialize multer with storage and file filter
const upload = multer({
  storage,
  fileFilter,
});

export default upload;
