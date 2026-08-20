const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export const apiRequest = async (
  path,
  options = {}
) => {
  const {
    skipAuth = false,
    ...fetchOptions
  } = options;

  const token =
    localStorage.getItem(
      "accessToken"
    );

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...fetchOptions,

      headers: {
        "Content-Type":
          "application/json",

        /*
         * 로그인 / 회원가입처럼
         * 인증이 필요 없는 API에는
         * Authorization을 붙이지 않음
         */
        ...(!skipAuth &&
          token && {
            Authorization:
              `Bearer ${token}`,
          }),

        ...fetchOptions.headers,
      },
    }
  );

  const result =
    await response.json();

  if (!response.ok) {
    const error = new Error(
      result.message ||
        "요청 처리 중 오류가 발생했습니다."
    );

    error.status =
      response.status;

    error.code =
      result.code;

    throw error;
  }

  return result;
};