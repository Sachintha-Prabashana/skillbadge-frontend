import api from "../api";

export interface UserData {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    roles: string[];
    points: number;
    avatarUrl?: string;
    createdAt: string;
    isActive: boolean;
}

interface UserResponse {
    data: UserData[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

// 1. Fetch Users
export const fetchUsers = async (page = 1, search = "", role = ""): Promise<UserResponse> => {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search,
        role: role === "All" ? "" : role
    });
    const response = await api.get(`/admin/users?${params.toString()}`);
    return response.data;
};



export const toggleUserBan = async (userId: string, isActive: boolean) => {
    const response = await api.patch(`/admin/users/${userId}/ban`, { isActive });
    return response.data;
}