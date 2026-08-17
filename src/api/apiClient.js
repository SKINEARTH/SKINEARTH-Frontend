const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async (
  path,
  options = {}
) => {
  const token =
    localStorage.getItem("accessToken");

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",

        ...(token && {
          Authorization: `Bearer ${token}`,
        }),

        ...options.headers,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(
      result.message ||
        "요청 처리 중 오류가 발생했습니다."
    );

    error.status = response.status;
    error.code = result.code;

    throw error;
  }

  return result;
};