import { apiRequest } from "./apiClient";

export const createPersonalization = async (data) => {
  return apiRequest("/api/users/me/personalization", {
    method: "POST",
    body: JSON.stringify(data),
  });
};