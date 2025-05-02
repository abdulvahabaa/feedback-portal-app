import React, { useState } from "react";
import { motion } from "framer-motion";
import { createFeedback } from "../../api/feedbackApis";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeedbackForm = ({ onFeedbackSubmitted }) => {
  const [feedback, setFeedback] = useState("");
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state) => state.userState.user.userId);
  const token = useSelector((state) => state.userState.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback || rating === 0) {
      setError("Please provide feedback and rating.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("subject", subject);
      formData.append("feedback", feedback);
      formData.append("rating", rating);
      if (image) formData.append("image", image);

      const response = await createFeedback(formData, token);

      if (response) {
        toast.success("Feedback submitted successfully!");
        onFeedbackSubmitted(); // Refresh parent
      } else {
        toast.error("Something went wrong while submitting feedback.");
      }

      // Clear form
      setSubject("");
      setFeedback("");
      setRating(0);
      setImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Error submitting feedback. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Submit Your Feedback
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          rows={4}
          placeholder="Write your feedback..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${
                rating >= star ? "text-yellow-400" : "text-gray-400"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-full file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 dark:file:bg-gray-600 dark:file:text-white"
        />

        {error && <p className="text-red-500 text-medium">{error}</p>}

        <motion.button
  type="submit"
  whileTap={{ scale: 0.95 }}
  disabled={loading}
  className={`px-6 py-2 rounded-lg shadow transition flex items-center justify-center ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 text-white"
  }`}
>
  {loading ? (
    <div className="flex items-center justify-center space-x-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span>Submitting...</span>
    </div>
  ) : (
    "Submit Feedback"
  )}
</motion.button>

      </form>
    </motion.div>
  );
};

export default FeedbackForm;
