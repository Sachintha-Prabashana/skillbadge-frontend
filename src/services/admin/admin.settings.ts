import api from "../api";

// 1. Register New Admin
export const registerNewAdmin = async (data: any) => {
    const response = await api.post("/admin/settings/admins", data);
    return response.data;
};

// 2. Change Password
export const changePassword = async (data: any) => {
    const response = await api.patch("/admin/settings/password", data);
    return response.data;
};