import { apiRequest } from "./apiClient";

export const getUser = async (id) => {
  try {
    const user = await apiRequest("/users/" + id);
    return user;
  } catch (error) {
    throw new Error(error.message || "User not found");
  }
};
