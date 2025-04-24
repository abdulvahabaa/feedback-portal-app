
import axios from "axios";

const API_BASE_URL = "http://localhost:9002/api";

export async function apiRequest(
  endpoint,
  method = "GET",
  body = null,
  headers = {}
) {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${endpoint}`,
      method,
      data: body,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API Request Failed:", error);
    // Axios wraps error in response
    throw new Error(
      error.response?.data?.message || error.message || "API Error"
    );
  }
}
