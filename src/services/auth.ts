import api from "./api";

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

import type { User } from "../types";

export const register = async (data: RegisterData) => {
  const response = await api.post("/api/auth/register/", data);
  return response.data;
};

export const login = async (data: LoginData) => {
  const response = await api.post("/api/auth/login/", data);
  const { access, refresh, user } = response.data;
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
  return user as User;
};

export const logout = async () => {
  const refresh = localStorage.getItem("refresh_token");
  await api.post("/api/auth/logout/", { refresh });
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getProfile = async () => {
  const response = await api.get("/api/auth/profile/");
  return response.data as User;
};

export const updateProfile = async (data: Partial<User>) => {
  const response = await api.patch("/api/auth/profile/", data);
  return response.data as User;
};

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append("resume", file);
  const response = await api.post("/api/auth/profile/resume/", formData);
  return response.data;
};

export const completeOnboarding = async () => {
  const response = await api.patch("/api/auth/onboarding/complete/");
  return response.data;
};

// OAuth — get the redirect URL for each provider
const OAUTH_REDIRECT_URI = "http://localhost:5173/auth/callback";

export const getGoogleAuthUrl = async (): Promise<string> => {
  const response = await api.get(
    `/api/auth/oauth/google/auth-url/?redirect_uri=${OAUTH_REDIRECT_URI}`
  );
  return response.data.auth_url;
};

export const getGithubAuthUrl = async (): Promise<string> => {
  const response = await api.get(
    `/api/auth/oauth/github/auth-url/?redirect_uri=${OAUTH_REDIRECT_URI}`
  );
  return response.data.auth_url;
};

export const getLinkedinAuthUrl = async (): Promise<string> => {
  const response = await api.get(
    `/api/auth/oauth/linkedin/auth-url/?redirect_uri=${OAUTH_REDIRECT_URI}`
  );
  return response.data.auth_url;
};

// Exchange the code for JWT tokens
export const exchangeOAuthCode = async (
  provider: "google" | "github" | "linkedin",
  code: string
) => {
  const response = await api.post(`/api/auth/oauth/${provider}/login/`, {
    code,
    redirect_uri: OAUTH_REDIRECT_URI,
  });
  const { access, refresh, user } = response.data;
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
  return user as User;
};