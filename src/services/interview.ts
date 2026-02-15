import api from "./api";

export interface InterviewMessage {
    role: "system" | "user" | "assistant";
    content: string;
    timestamp?: string;
}

export interface StartInterviewResponse {
    interviewId: string;
    stream: string;
    difficulty: string;
    message: string; // AI's first question
}

export interface ChatResponse {
    message: string;        // AI's reply
    currentQuestion: number; // current question number
    totalQuestions: number;
    isCompleted: boolean;    // for interview completion status
    history?: InterviewMessage[];
}

export const startMockInterview = async (stream: string, difficulty: string): Promise<StartInterviewResponse> => {
    const response = await api.post("/interview/start", {
        stream,
        difficulty
    });
    return response.data;
};

export const sendInterviewReply = async (interviewId: string, userAnswer: string, stop: boolean = false): Promise<ChatResponse> => {
    const response = await api.post("/interview/chat", {
        interviewId,
        userAnswer,
        stop
    });
    return response.data;
};