import { apiRequest } from "./apiClient";

export const resetUserData = () => {
  return apiRequest("/api/users/me/data-reset", {
    method: "POST",
    body: JSON.stringify({
      confirmed: true,
    }),
  });
};