import { apiRequest } from "./apiClient";

export const getForecast = async () => {
  return apiRequest("/api/forecasts", {
    method: "GET",
  });
};

export const createForecast = async (data) => {
  return apiRequest("/api/forecasts", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateForecast = async (data) => {
  return apiRequest("/api/forecasts", {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
