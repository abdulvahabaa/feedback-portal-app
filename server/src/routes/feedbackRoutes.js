import express from "express";
import {
  createFeedback,
  getFeedbackByRating,
  getFeedbackByDateRange,
  getUserAllFeedbacks,
} from "../controllers/feedbackController.js";

const feedbackRoutes = express.Router();

// POST /feedback - Creates new feedback
feedbackRoutes.post("/create", createFeedback);

// GET /feedback - Returns all feedback entries
feedbackRoutes.get("/:userId", getUserAllFeedbacks);

// GET /feedback/rating/:rating - Filters feedback by rating
feedbackRoutes.get("/rating/:rating", getFeedbackByRating);

// GET /feedback/date?start=YYYY-MM-DD&end=YYYY-MM-DD - Filters feedback by date
feedbackRoutes.get("/date", getFeedbackByDateRange);

export default feedbackRoutes;
