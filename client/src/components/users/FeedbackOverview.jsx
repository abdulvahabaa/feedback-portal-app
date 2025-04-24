import React from "react";

const FeedbackOverview = ({ data }) => {
  if (!data) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">
        Feedback Overview – {data.subject}
      </h2>

      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-inner space-y-6 max-h-[500px] overflow-y-auto">
        {/* User Message Card (Right-aligned only for the card) */}
        <div className="flex justify-end">
          <div className="bg-green-50 p-3 rounded-2xl rounded-br-none shadow max-w-xs text-left">
            <p className="text-sm text-gray-800">{data.message}</p>
            {data.image && (
              <img
                src={data.image}
                alt="User upload"
                className="mt-2 rounded-md max-w-full border border-gray-300"
              />
            )}
            {/* Separate Review section */}
            <div className="mt-2 text-xs text-gray-600">
              <p>Rating: {data.rating} ⭐</p>
              <p>You • {data.date}</p>
            </div>
          </div>
          {/* Adding margin-right to create a gap between logo and message box */}
          <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full text-sm font-bold ml-3">
            U
          </div>
        </div>

        {/* Admin Reply (Left-aligned for the reply) */}
        {data.comment && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-400 text-white flex items-center justify-center rounded-full text-sm font-bold">
              A
            </div>
            <div className="bg-blue-100 p-3 rounded-2xl rounded-bl-none shadow max-w-xs">
              <p className="text-sm text-gray-800">{data.comment}</p>
              {data.adminImage && (
                <img
                  src={data.adminImage}
                  alt="Admin upload"
                  className="mt-2 rounded-md max-w-full border border-gray-300"
                />
              )}
              <p className="text-xs text-gray-500 mt-1">Admin • {data.date}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackOverview;
