import { apiRequest } from "./apiClient";

export const createTodayRecord = async (data) => {
  return apiRequest("/api/daily-records/today", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getTodayRecord = async () => {
  return apiRequest("/api/daily-records/today", {
    method: "GET",
  });
};

export const updateTodayRecord = async (data) => {
  return apiRequest("/api/daily-records/today", {
    method: "PUT",
    body: JSON.stringify(data),
  });
};