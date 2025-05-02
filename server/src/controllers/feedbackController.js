import Feedback from "../schemas/Feedback.js";
import User from "../schemas/User.js";
import { uploadImageToCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
// Create a new feedback entry
export const createFeedback = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file); // ✅ Works here
  try {
    const { userId, subject, feedback, rating } = req.body;

    if (!subject || !feedback || !rating) {
      return res
        .status(400)
        .json({ message: "Subject, feedback and rating are required." });
    }

    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    let picturePath = "";

    if (req.file) {
      const cloudinaryResult = await uploadImageToCloudinary(req.file);
      console.log("Cloudinary Result:", cloudinaryResult);
      picturePath = cloudinaryResult.secure_url; // Use the secure URL
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Failed to delete temp file:", err);
      });
    }

    const newFeedback = new Feedback({
      userRef: user._id,
      subject,
      feedback,
      rating,
      picturePath,
    });

    await newFeedback.save();
    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Create Feedback Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user created all feedback entries
export const getUserAllFeedbacks = async (req, res) => {
  // console.log("Get All Feedback",req.params);
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId: userId });
    // console.log(user)
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const feedbacks = await Feedback.find({ userRef: user._id }).sort({
      createdAt: -1,
    }); // Latest first
    // console.log("feedbacks",feedbacks);
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Get All Feedback Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Filter feedback by rating
export const getFeedbackByRating = async (req, res) => {
  try {
    const { rating } = req.params;
    const feedbacks = await Feedback.find({ rating }).sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Filter Feedback by Rating Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Filter feedback by date range
export const getFeedbackByDateRange = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res
        .status(400)
        .json({ message: "Start and end dates are required." });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999); // Include the entire end day

    const feedbacks = await Feedback.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Filter Feedback by Date Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
