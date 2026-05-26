import api from "./api";
import type { Interview, ChatMessage, MockSession } from "../types";

export const getInterviews = async () => {
  const response = await api.get("/api/interviews/");
  return response.data as Interview[];
};

export const createInterview = async (data: {
  job_title: string;
  job_description: string;
}) => {
  const response = await api.post("/api/interviews/", data);
  return response.data as Interview;
};

export const getInterview = async (id: number) => {
  const response = await api.get(`/api/interviews/${id}/`);
  return response.data as Interview;
};

export const deleteInterview = async (id: number) => {
  await api.delete(`/api/interviews/${id}/`);
};

export const getChatHistory = async (id: number) => {
  const response = await api.get(`/api/interviews/${id}/chat/`);
  return response.data as ChatMessage[];
};

export const sendMessage = async (id: number, message: string) => {
  const response = await api.post(`/api/interviews/${id}/chat/`, { message });
  return response.data as ChatMessage;
};

export const startVoiceSession = async (id: number) => {
  const response = await api.post(`/api/voice/interviews/${id}/session/start/`);
  return response.data as {
    session_id: number;
    vapi_assistant_id: string;
    status: string;
  };
};

export const getVoiceSessions = async (id: number) => {
  const response = await api.get(`/api/voice/interviews/${id}/sessions/`);
  return response.data as MockSession[];
};

export const getSessionDetail = async (sessionId: number) => {
  const response = await api.get(`/api/voice/sessions/${sessionId}/`);
  return response.data as MockSession;
};
