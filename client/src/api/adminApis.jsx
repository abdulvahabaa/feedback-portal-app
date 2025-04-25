import { data } from "react-router-dom";
import { apiRequest } from "./apiClient";

export const getAllUsersFeedbacks = async (token) => {
  try {
    const response = await apiRequest(`/admin/feedbacks`, "GET", null, {
      Authorization: `Bearer ${token}`,
    });
    return response;
  } catch (error) {
    throw new Error(error.message || "Registration failed!");
  }
};

export const respondToFeedback = async (id, comment, token) => {
  console.log("Calling API with:", id, comment); // Add this
  try {
    const data = { comment: comment };
    console.log(data)
    return await apiRequest(`/admin/feedback/respond/${id}`, "PATCH", data, {
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    throw new Error(error.message || "Registration failed!");
  }
};
