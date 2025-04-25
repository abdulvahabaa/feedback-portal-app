import express from "express";
import {
  loginAdmin,
  getAllUsersFeedbacks,
  filterFeedbackByRating,
  respondToFeedback,
} from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js"; // JWT authentication middleware

const adminRoutes = express.Router();

// Admin Login
adminRoutes.post("/login", loginAdmin);

// All feedback (protected route)
adminRoutes.get("/feedback", verifyAdmin, getAllUsersFeedbacks);

// Filter feedback by rating (protected route)
adminRoutes.get(
  "/feedback/rating/:rating",
  verifyAdmin,
  filterFeedbackByRating
);

// Respond to feedback (protected route)
adminRoutes.patch("/feedback/respond/:id", verifyAdmin, respondToFeedback);

export default adminRoutes;
