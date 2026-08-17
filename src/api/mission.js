import { apiRequest } from "./apiClient";

export const getTodayMission = () => {
  return apiRequest(
    "/api/missions/today"
  );
};

export const completeMission = (
  missionCardId
) => {
  return apiRequest(
    `/api/missions/${missionCardId}/complete`,
    {
      method: "POST",
    }
  );
};

export const regenerateMission = () => {
  return apiRequest(
    "/api/missions/today/regenerate",
    {
      method: "POST",
    }
  );
};

export const adjustMissionIntensity = () => {
  return apiRequest(
    "/api/missions/today/adjust-intensity",
    {
      method: "POST",
    }
  );
};

export const excludeMissionCategory = () => {
  return apiRequest(
    "/api/missions/today/exclude-category",
    {
      method: "POST",
    }
  );
};

export const confirmMission = () => {
  return apiRequest(
    "/api/missions/today/confirm",
    {
      method: "POST",
    }
  );
};

export const getMissionHistory = (
  period
) => {
  const path =
    period === "WEEKLY"
      ? "/api/missions/history/weekly"
      : "/api/missions/history/monthly";

  return apiRequest(path);
};