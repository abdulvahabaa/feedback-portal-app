import React, { useCallback, useEffect, useState } from "react";
import Title from "../../components/ui/Title";
import UserLayout from "../../layouts/UserLayout";
import Card from "../../components/ui/Card";
import FeedbackForm from "../../components/users/FeedbackForm";
import FeedbackOverview from "../../components/users/FeedbackOverview";
import { useSelector } from "react-redux";
import { getUserFeedbacks } from "../../api/feedbackApis";
import { formatDateTime } from "../../utils/formatDateTime";

const Home = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const userId = useSelector((state) => state.userState.user.userId);

  const fetchFeedbacks = useCallback(async () => {
    try {
      const feedbacks = await getUserFeedbacks(userId);
      setFeedbacks(feedbacks);
      if (feedbacks.length > 0) {
        setSelectedFeedback(feedbacks[0]); // assuming newest is first
      }
      setShowForm(false);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) fetchFeedbacks();
  }, [fetchFeedbacks, userId]);

  return (
    <UserLayout>
      <div className="max-w-7xl mx-auto p-4 space-y-3">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Title>Dashboard</Title>
          <button
            onClick={() => {
              setSelectedFeedback(null);
              setShowForm(true);
            }}
            className="btn bg-amber-200 text-black font-medium px-4 py-2 rounded-lg shadow"
          >
            Create New Feedback
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left: Feedbacks list */}
          <Card className="md:col-span-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Feedbacks
            </h2>
            <div className="space-y-2 max-h-75 overflow-y-auto pr-2">
              {feedbacks.map((fb) => (
                <div
                  key={fb._id}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    selectedFeedback?._id === fb._id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedFeedback(fb)}
                >
                  <p className="text-sm font-medium text-gray-800">
                    {fb.subject}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {fb.feedback}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Right: Feedback form or detail view */}
          <Card className="md:col-span-2">
            {selectedFeedback ? (
              <FeedbackOverview data={selectedFeedback} />
            ) : showForm ? (
              <FeedbackForm onFeedbackSubmitted={fetchFeedbacks} />
            ) : (
              <p className="text-gray-500">
                Select a feedback to view or create a new one.
              </p>
            )}
          </Card>
        </div>
      </div>
    </UserLayout>
  );
};

export default Home;
