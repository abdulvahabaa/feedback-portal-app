import React, { useState } from "react";
import { motion } from "framer-motion";
import { respondToFeedback } from "../../api/adminApis";
import { useSelector } from "react-redux";
import dummyImg from "../../assets/images/admin.png";

const FeedbackModal = ({ feedback, onClose, onUpdate }) => {
  const [comment, setComment] = useState(feedback.comment || "");
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.adminState.token);

  const handleSubmit = async () => {
    console.log("Submitting feedback comment..."); // Add this
    try {
      setLoading(true);
      await respondToFeedback(feedback._id, comment, token);
      onUpdate({ ...feedback, comment });
      onClose();
    } catch (err) {
      console.error("Error updating comment", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-full sm:max-w-md lg:max-w-lg xl:max-w-xl w-full shadow-xl relative transition-all transform duration-300 max-h-screen overflow-auto"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Feedback Details</h2>

        {/* Check if image exists and display */}
        {feedback.picturePath && (
          <div className="mb-4">
            <img
              src={feedback.picturePath}
              alt="Feedback related"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        {/* Fallback image if no image exists */}
        {!feedback.picturePath && (
          <div className="mb-4">
            <img
              src={dummyImg}
              alt="Feedback related"
              className="w-50 h-50 rounded-lg shadow-md"
            />
          </div>
        )}

        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <strong className="font-semibold">Subject:</strong> {feedback.subject}
        </p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <strong className="font-semibold">Feedback:</strong> {feedback.feedback}
        </p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          <strong className="font-semibold">Rating:</strong> {feedback.rating}
        </p>

        {/* Comment Text Area */}
        <textarea
          className="w-full p-3 border rounded-lg mt-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-300"
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackModal;
