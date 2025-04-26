import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schemas/User.js";
import Feedback from "../schemas/Feedback.js";

// Admin login - Generate JWT token
export const loginAdmin = async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const admin = await User.findOne({ email });

    if (admin.role !== "admin") {
      throw new Error("User has no admin permissions");
    }

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin.userId },
      process.env.JWT_SECRET_ADMIN,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    res.status(200).json({
      token,
      admin: {
        adminId: admin.userId,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin - Get all feedback (optionally sorted by date)
export const getAllUsersFeedbacks = async (req, res) => {
  console.log("Admin Get All Feedback");
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Admin Get Feedback Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin - Filter feedback by star rating (1–5)
export const filterFeedbackByRating = async (req, res) => {
  try {
    const { rating } = req.params;
    const feedbacks = await Feedback.find({ rating }).sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Admin Filter Feedback Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin - Respond to feedback by updating the comment field
export const respondToFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!comment) {
      return res.status(400).json({ message: "Comment is required." });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { comment },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({ message: "Response added", feedback });
  } catch (error) {
    console.error("Admin Respond Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
