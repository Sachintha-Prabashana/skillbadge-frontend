import api from "../api"; // Your Axios instance

export interface DashboardData {
    counts: {
        students: number;
        challenges: number;
        submissions: number;
        passRate: number;
    };
    chartData: {
        name: string;
        submissions: number;
    }[];
    recentActivity: {
        user: string;
        action: string;
        time: string;
        status: "success" | "failed";
    }[];
}

export const fetchDashboardStats = async (): Promise<DashboardData> => {
    const response = await api.get("/admin/stats");
    return response.data;
};