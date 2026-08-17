import { apiRequest } from "./apiClient";

export const getHistory = (period) => {
  return apiRequest(
    `/api/history?period=${period}`
  );
};

export const getCauseTimeline = (period) => {
  const path =
    period === "WEEKLY"
      ? "/api/history/cause-timeline/weekly"
      : "/api/history/cause-timeline/monthly";

  return apiRequest(path);
};