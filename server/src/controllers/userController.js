import bcrypt from "bcrypt";
import { v7 as uuidv7 } from "uuid";
import jwt from "jsonwebtoken";
import User from "../schemas/User.js";

// Signup Controller
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required input fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    // Check if a user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with UUID and default role
    const newUser = new User({
      userId: uuidv7(),
      name,
      email,
      password: hashedPassword,
      role: "client",
    });

    // Save the user in the database
    await newUser.save();

    // Respond with success and the user's unique ID
    res.status(201).json({
      message: "User registered successfully",
      userId: newUser.userId,
    });
  } catch (error) {
    // Handle unexpected errors like DB failures
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // console.log(user.role)

    if (user.role !== "client" && user.role !== "admin") {
      return res
        .status(400)
        .json({ message: "User has no aceess permissions" });
    }

    // Verify the provided password against the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token valid for 1 hour
    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token and public user info in the response
    res.status(200).json({
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicturePath: user.profilePicturePath,
        // createdAt: user.createdAt,
      },
    });
  } catch (error) {
    // Handle unexpected errors during login
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
