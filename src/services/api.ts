import axios, { AxiosError } from "axios"
import { refreshTokens } from "./auth"

const api = axios.create({
    baseURL: "https://controlled-karina-spsolutions-ea693d09.koyeb.app/api/v1",
})


const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/register"]

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken")

    const isPUblic = PUBLIC_ENDPOINTS.some((url) => config.url?.includes(url))

    if(!isPUblic && token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

///////////////// api interceptors response ///////////////////////

api.interceptors.response.use(
    (response) => {
        return response
    },
    async (error: AxiosError) => {
        const originalRequest: any = error.config

        if (
            error.response?.status === 401 &&
            !PUBLIC_ENDPOINTS.some((url) => originalRequest.url?.includes(url)) && 
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            try {
                // Optionally, you can implement a token refresh logic here
                const refreshToken = localStorage.getItem("refreshToken")
                if (!refreshToken) {
                    throw new Error("No refresh token available")
                }

                const data = await refreshTokens(refreshToken)
                console.log("accessToken: ", data.data.accessToken)
                localStorage.setItem("accessToken", data.data.accessToken)

                originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`
                return axios(originalRequest)
            } catch (refreshErr) {
                console.error("Session expired. Redirecting to login...", refreshErr);
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken")
                window.location.href = "/login"
                console.log(refreshErr)
                return Promise.reject(refreshErr)

            }
        }
        return Promise.reject(error)
    }
)

export default api