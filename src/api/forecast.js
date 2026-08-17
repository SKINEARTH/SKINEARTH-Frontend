import { apiRequest } from "./apiClient";

export const createForecast = async (data) => {
  return apiRequest("/api/forecasts", {
    method: "POST",
    body: JSON.stringify(data),
  });
};