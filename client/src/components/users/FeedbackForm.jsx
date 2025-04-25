import React, { use, useState } from "react";
import { motion } from "framer-motion";
import { createFeedback } from "../../api/feedbackApis";
import { useSelector } from "react-redux";
import { form } from "framer-motion/client";

const FeedbackForm = ({ onFeedbackSubmitted }) => {
  const [feedback, setFeedback] = useState("");
  const [subject, setSubject] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const userId = useSelector((state) => state.userState.user.userId);
  const token = useSelector((state) => state.userState.token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedback || rating === 0) {
      setError("Please provide feedback and rating.");
      return;
    }
    console.log("userId:", userId);

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("subject", subject);
    formData.append("feedback", feedback);
    formData.append("rating", rating);
    if (image) formData.append("image", image);

    const response = await createFeedback(formData, token);

    if (response) {
      onFeedbackSubmitted(); // <-- Call parent to refresh
    }

    console.log("Submitted:", { subject, feedback, rating });

    setError("");
    setSubject("");
    setFeedback("");
    setRating(0);
    setImage(null);
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
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Submit Feedback
        </motion.button>
      </form>
    </motion.div>
  );
};

export default FeedbackForm;
