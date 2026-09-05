import { apiRequest } from "./apiClient";

const wait = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export const getHome = async () => {
  try {
    return await apiRequest(
      "/api/home"
    );
  } catch (error) {
    if (error.status !== 500) {
      throw error;
    }

    // 서버 데이터 반영 타이밍을 고려해
    // 잠시 기다렸다 한 번 재시도
    await wait(500);

    return apiRequest(
      "/api/home"
    );
  }
};