export interface Message {
    role: "system" | "user" | "assistant";
    content: string;
    timestamp?: string;
}

export interface StartInterviewRequest {
    stream: string;
    difficulty: string;
}

export interface StartInterviewResponse {
    interviewId: string;
    stream: string;
    message: string;
}

export interface ChatRequest {
    interviewId: string;
    userAnswer: string;
}

export interface ChatResponse {
    message: string;
    history?: Message[];
}