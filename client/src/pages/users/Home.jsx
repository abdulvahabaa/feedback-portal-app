import React, { useState } from "react";
import Title from "../../components/ui/Title";
import UserLayout from "../../layouts/UserLayout";
import Card from "../../components/ui/Card";
import FeedbackForm from "../../components/users/FeedbackForm";
import { dummyFeedbacks } from "../../constants/data";
import FeedbackOverview from "../../components/users/FeedbackOverview";

const Home = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showForm, setShowForm] = useState(false);

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
              {dummyFeedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    selectedFeedback?.id === fb.id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedFeedback(fb)}
                >
                  <p className="text-sm font-medium text-gray-800">
                    {fb.subject}
                  </p>
                  <p className="text-xs text-gray-600 truncate">{fb.message}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Right: Feedback detail view */}
          <Card className="md:col-span-2">
            {selectedFeedback ? (
              <FeedbackOverview data={selectedFeedback} />
            ) : showForm ? (
              <FeedbackForm />
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
