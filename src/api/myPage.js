import { apiRequest } from "./apiClient";

export const getMyPage = () => {
  return apiRequest("/api/users/me");
};