import User from "../schemas/User.js";  // Your User model

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);  // Get the user from the decoded token

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    next();  // If user is admin, proceed to the next middleware or route handler
  } catch (error) {
    console.error("Admin verification error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
