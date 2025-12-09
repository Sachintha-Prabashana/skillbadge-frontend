import api from "./api"

export interface Challenge {
    _id: string;
    title: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    // category: String;
    points: Number;
    status: "SOLVED" | "TODO"
}

export interface ChallengeResponse {
    data: Challenge[];
    pagination: {
        total: number
        page: number
        pages: number
    }
}

export const fetchChallenges = async (page = 1, limit = 10): Promise<ChallengeResponse> => {
    const response = await api.get(`/challenges?page"=${page}&limit=${limit}`)
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

    return response.data // hint, remainingPoints, message
}
