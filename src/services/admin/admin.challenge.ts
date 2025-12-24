import api from "../api";

// Define the shape of a Challenge as it comes from the DB
export interface ChallengeData {
    _id: string;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    category: string;
    points: number;
    slug: string;
    description?: string; // Optional in list view
}

interface ChallengeResponse {
    success: boolean;
    data: ChallengeData[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

// Fetch function with pagination & search
export const fetchChallenges = async (page = 1, search = "", difficulty = ""): Promise<ChallengeResponse> => {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: "5",
        search,
        difficulty: difficulty === "All" ? "" : difficulty
    });

    const response = await api.get(`/admin/challenges?${params.toString()}`);
    return response.data;
};

// Delete function
export const deleteChallenge = async (id: string) => {
    await api.delete(`/admin/challenges/${id}`);
};