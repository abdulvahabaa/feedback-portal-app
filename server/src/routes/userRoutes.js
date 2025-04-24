import express from "express";
import { signupUser, loginUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signupUser);

userRoutes.post("/login", loginUser);

userRoutes.post("/logout", protect, (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

export default userRoutes;
