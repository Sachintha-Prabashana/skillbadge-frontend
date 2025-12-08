import api from "./api.ts"

export interface Badge {
    _id: string
    name: string
    icon: string
    color: string
}

export interface LeaderboardUser {
    _id: string
    firstname: string
    lastname: string
    points: number
    currentStreak: number;
    badges: Badge[]
}

export const fetchLeaderboard = async (): Promise<LeaderboardUser[]> => {
    const response = await api.get("/users/leaderboard")
    return response.data
}

export const fetchUsersProfile = async(id: string = "me")=> {
    const response = await api.get(`/users/profile/${id}`)
    return response.data
}

export const uploadAvatar = async ( file: File )=> {
    const formData = new FormData()

    formData.append("image", file)

    const response = await api.put("/users/avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}