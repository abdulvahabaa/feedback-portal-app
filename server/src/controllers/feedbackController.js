import Feedback from "../schemas/Feedback.js";

// Create a new feedback entry
export const createFeedback = async (req, res) => {
  try {
    const { subject, feedback, rating, picturePath, comment } = req.body;

    if (!subject || !feedback || !rating) {
      return res.status(400).json({ message: "Subject, feedback and rating are required." });
    }

    const newFeedback = new Feedback({
      subject,
      feedback,
      rating,
      picturePath,
      comment,
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully", feedback: newFeedback });
  } catch (error) {
    console.error("Create Feedback Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all feedback entries
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Latest first
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
      return res.status(400).json({ message: "Start and end dates are required." });
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
