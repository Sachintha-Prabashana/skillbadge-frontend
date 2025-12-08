import api from "./api"

export const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password })
    return response.data
}

export const register = async (firstname: string, lastname: string, email: string, password: string) => {
    const response = await api.post("/auth/register", { firstname, lastname, email, password })
    return response.data
}

export const fetchProfile = async () => {
    const response = await api.get("/auth/me")
    return response.data
}

export const refreshTokens = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", {
    token: refreshToken
  })
  return res.data
}

export const logout = async () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")

    window.location.href = "/login"
}

export const initiateGoogleLogin = () => {
    // Use the env variable so it works in Production too
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    // Redirect browser
    window.location.href = `${API_URL}/api/v1/auth/google`;
}

// Add this:
export const initiateGithubLogin = () => {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    // Point to the route we created in Step 5
    window.location.href = `${API_URL}/api/v1/auth/github`;
}