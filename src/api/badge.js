import { apiRequest } from "./apiClient";

export const getUserStage = () => {
  return apiRequest("/api/users/stage");
};