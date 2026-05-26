import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  login,
  logout,
  register,
  getProfile,
  updateProfile,
  uploadResume,
  completeOnboarding,
  getGoogleAuthUrl,
  getGithubAuthUrl,
  getLinkedinAuthUrl,
} from "../services/auth";
import type { LoginData, RegisterData } from "../services/auth";
import useAuthStore from "../store/authStore";
import { toast } from "sonner";

// useProfile — fetches the logged in user's profile
// only runs if there is a token in localStorage
export const useProfile = () => {
  const { setUser } = useAuthStore();
  const token = localStorage.getItem("access_token");

  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const user = await getProfile();
      setUser(user); // save to Zustand store
      return user;
    },
    enabled: !!token, // only fetch if token exists
    retry: false,
  });
};

export const useRegister = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterData) => {
      await register(data);
      // auto login after register
      const user = await login({ email: data.email, password: data.password });
      return user;
    },
    onSuccess: (user) => {
      setUser(user);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(
        `Welcome, ${user.first_name}! Your account has been created successfully.`,
      );
      navigate("/onboarding");
    },
    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
  });
};

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginData) => login(data),
    onSuccess: (user) => {
      setUser(user);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success(`Welcome back, ${user.first_name}!`);
      if (!user.onboarding_complete) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    },
    onError: () => {
      toast.error("Invalid email or password. Please try again.");
    },
  });
};
// useLogout — mutation for logging out
// clears everything and sends user to login
export const useLogout = () => {
  const { clearUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearUser();
      queryClient.clear();
      navigate("/login");
    },
  });
};

// useUpdateProfile — mutation for updating profile fields
export const useUpdateProfile = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

// useUploadResume — mutation for uploading resume PDF
export const useUploadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadResume(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

// useCompleteOnboarding — mutation to mark onboarding as done
export const useCompleteOnboarding = () => {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: completeOnboarding,
    onSuccess: async () => {
      const updatedUser = await getProfile();
      setUser(updatedUser);
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/dashboard");
    },
  });
};

// useOAuthLogin — handles the redirect to OAuth provider
// useMutation because it's an action triggered by user click
export const useOAuthLogin = (provider: "google" | "github" | "linkedin") => {
  const getAuthUrl = {
    google: getGoogleAuthUrl,
    github: getGithubAuthUrl,
    linkedin: getLinkedinAuthUrl,
  }[provider];

  return useMutation({
    mutationFn: getAuthUrl,
    onSuccess: (authUrl) => {
      // redirect the user's browser to the OAuth consent screen
      window.location.href = authUrl;
    },
    onError: () => {
      toast.error(`Failed to connect with ${provider}. Please try again.`);
    },
  });
};
