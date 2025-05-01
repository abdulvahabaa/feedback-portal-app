import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGO_DB_URI;

const connectToDatabase = async () => {
  if (!MONGODB_URI) {
    throw new Error("❌ MongoDB URI is not defined in .env file!");
  }

  if (mongoose.connection.readyState === 1) {
    console.log("✅ Using Cached MongoDB Connection");
    return mongoose.connection;
  }

  try {
    console.log("🚀 Connecting to MongoDB...");

    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 10,
    });

    console.log("✅ MongoDB Connected Successfully!");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    throw error;
  }
};

export default connectToDatabase;
