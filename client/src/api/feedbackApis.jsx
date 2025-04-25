import { apiRequest } from "./apiClient";

export const createFeedback = async (data, token) => {
  try {
    return await apiRequest("/feedbacks/create", "POST", data,{
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    throw new Error(error.message || "Registration failed!");
  }
};

export const getUserFeedbacks = async (userId, token) => {
  try {
    return await apiRequest(`/feedbacks/${userId}`, "GET",null,{
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    throw new Error(error.message || "Registration failed!");
  }
};

export const feedbackByRating = async (rating) => {
  try {
    return await apiRequest(`/feedbacks/rating/${rating}`, "GET");
  } catch (error) {
    throw new Error(error.message || "Registration failed!");
  }
};

export const feedbackByDate = async (date) => {
  try {
    // GET /feedback/date?start=YYYY-MM-DD&end=YYYY-MM-DD - Filters feedback by date
    return await apiRequest(`/feedbacks/date/${date}`, "GET");
  } catch (error) {
    throw new Error(error.message || "Registration failed!");
  }
};