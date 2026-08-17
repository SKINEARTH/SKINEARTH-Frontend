import { apiRequest } from "./apiClient";

export const getOnboardingStatus = async () => {
  return apiRequest("/api/users/me/onboarding-status", {
    method: "GET",
  });
};