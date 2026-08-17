import { apiRequest } from "./apiClient";

export const signup = async (data) => {
  return apiRequest("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const login = async (
  email,
  password
) => {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
};