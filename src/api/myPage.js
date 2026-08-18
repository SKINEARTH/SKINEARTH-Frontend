import { apiRequest } from "./apiClient";

export const getMyPage = () => {
  return apiRequest("/api/users/me");
};

export const updateMyPage = ({
  nickname,
  userStatus,
  skinConcerns,
}) => {
  return apiRequest(
    "/api/users/me/personalization",
    {
      method: "PUT",
      body: JSON.stringify({
        nickname,
        userStatus,
        skinConcerns,
        skinConcernSelectionUnique: true,
      }),
    }
  );
};