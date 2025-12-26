import api from "./api"

export interface Challenge {
    _id: string;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    // category: String;
    points: Number;

    status: "SOLVED" | "TODO"
    categories: string[];
}

export interface ChallengeResponse {
    data: Challenge[];
    pagination: {
        total: number
        page: number
        totalPages: number
    }
}

export const fetchChallenges = async (page = 1, limit = 10, search = "", difficulty = "", category = ""): Promise<ChallengeResponse> => {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    })

    if (search) params.append("search", search);
    if (difficulty && difficulty !== "All") params.append("difficulty", difficulty);
    if (category && category !== "All Topics") params.append("category", category);

    const response = await api.get(`/challenges?${params.toString()}`)
    return response.data
}

export const fetchChallengeById = async (id: string) => {
    const response = await api.get(`/challenges/${id}`)
    return response.data
}

export const runChallengeCode = async (data: {
    challengeId: string
    code: string
    language: string
}) => {
    const response = await api.post("/challenges/run", data)
    return response.data

}

export const getChallengeHint = async (challengeId: string, code: string, language: string) => {
    const response = await api.post(`/challenges/${challengeId}/hint`,
        {
            code, language
        })

    return response.data // hint, remainingPoints, hint_cost, message
}

export const fetchDailyChallengeId = async () => {
    const response = await api.get("/challenges/daily/id")
    return response.data.challengeId
}

export const fetchRandomChallenge = async () => {
    const response = await api.get("/challenges/random")
    return response.data
}

