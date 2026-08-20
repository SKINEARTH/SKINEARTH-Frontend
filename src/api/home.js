import { apiRequest } from "./apiClient";

export const getHome = () => {
  return apiRequest("/api/home");
};