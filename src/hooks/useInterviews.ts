import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getInterviews,
  getInterview,
  getChatHistory,
  createInterview,
  sendMessage,
  deleteInterview,
  startVoiceSession,
  getVoiceSessions,
  getSessionDetail,
} from "../services/interviews";

// Fetches the list of all interviews for the sidebar
export const useInterviews = () => {
  return useQuery({
    queryKey: ["interviews"],
    queryFn: getInterviews,
  });
};

// Fetches a single interview — only runs when we have an id
export const useInterview = (id: number) => {
  return useQuery({
    queryKey: ["interview", id],
    queryFn: () => getInterview(id),
    enabled: !!id,
  });
};

// Fetches full chat history for an interview
export const useChatHistory = (id: number) => {
  return useQuery({
    queryKey: ["chat", id],
    queryFn: () => getChatHistory(id),
    enabled: !!id,
  });
};

// Fetches all voice sessions for an interview
export const useVoiceSessions = (id: number) => {
  return useQuery({
    queryKey: ["voiceSessions", id],
    queryFn: () => getVoiceSessions(id),
    enabled: !!id,
  });
};

// Fetches detail of one voice session (transcript etc)
export const useSessionDetail = (sessionId: number) => {
  return useQuery({
    queryKey: ["session", sessionId],
    queryFn: () => getSessionDetail(sessionId),
    enabled: !!sessionId,
  });
};

// useCreateInterview — creates a new interview
// on success → invalidates the list so sidebar refreshes automatically
export const useCreateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { job_title: string; job_description: string }) =>
      createInterview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
  });
};

// useDeleteInterview — deletes an interview
// on success → invalidates the list so it disappears from sidebar
export const useDeleteInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteInterview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
  });
};

// useSendMessage — sends a chat message and gets AI response back
// on success → invalidates that interview's chat so new message appears
export const useSendMessage = (interviewId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) => sendMessage(interviewId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat", interviewId] });
    },
  });
};

// useStartVoiceSession — tells backend to create a VAPI assistant
// returns session_id and vapi_assistant_id which frontend uses to start the call
export const useStartVoiceSession = (interviewId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => startVoiceSession(interviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["voiceSessions", interviewId] });
    },
  });
};