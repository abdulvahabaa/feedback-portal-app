import express from "express";
import {
  createFeedback,
  getAllFeedback,
  getFeedbackByRating,
  getFeedbackByDateRange,
} from "../controllers/feedbackController.js";

const feedbackRoutes = express.Router();

// GET /feedback - Returns all feedback entries
feedbackRoutes.get("/", getAllFeedback);

// POST /feedback - Creates new feedback
feedbackRoutes.post("/", createFeedback);

// GET /feedback/rating/:rating - Filters feedback by rating
feedbackRoutes.get("/rating/:rating", getFeedbackByRating);

// GET /feedback/date?start=YYYY-MM-DD&end=YYYY-MM-DD - Filters feedback by date
feedbackRoutes.get("/date", getFeedbackByDateRange);

export default feedbackRoutes;
