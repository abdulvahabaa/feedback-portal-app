
import axios from "axios";
import API_CONFIG from "../config/api";

const API_BASE_URL = API_CONFIG.BASE_URL;

export async function apiRequest(
  endpoint,
  method = "GET",
  body = null,
  headers = {}
) {
  try {
    const isFormData = body instanceof FormData;

    const response = await axios({
      url: `${API_BASE_URL}${endpoint}`,
      method,
      data: body,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API Request Failed:", error);
    throw new Error(
      error.response?.data?.message || error.message || "API Error"
    );
  }
}

