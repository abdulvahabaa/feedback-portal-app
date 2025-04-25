import express from "express";
import { signupUser, loginUser } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signupUser);

userRoutes.post("/login", loginUser);

export default userRoutes;
