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