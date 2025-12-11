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

// 1. Define the Shape of the Data
export interface UserProfileData {
    username: string;
    rank: number;
    avatarUrl?: string;
    solved: {
        total: number;
        totalQuestions: number;
        easy: number;
        medium: number;
        hard: number;
        totalEasy: number;
        totalMedium: number;
        totalHard: number;
    };

    // --- NEW FIELDS ---
    title?: string;
    about?: string;
    country?: string;
    socials?: {
        github?: string;
        linkedin?: string;
        website?: string;
    };
    education?: Array<{
        school: string;
        degree: string;
        fieldOfStudy: string;
        description?: string;
    }>;

    languages: { name: string; problems: number }[];
    submissionCalendar: Record<string, number>; // { "2023-10-25": 5 }
    badges: any[];
    recentActivity: {
        title: string;
        time: string;
        status: "PASSED" | "FAILED" | "ERROR";
    }[];
}

export const fetchLeaderboard = async (): Promise<LeaderboardUser[]> => {
    const response = await api.get("/users/leaderboard")
    return response.data
}

export const fetchUsersProfile = async(id: string = "me"): Promise<UserProfileData>=> {
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

export const updateProfileSettings = async (formData: any) => {
    const response = await  api.put("/users/me/profile", formData)
    return response.data
}