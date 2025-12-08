import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Loader2 } from "lucide-react";
import {useAuth} from "../context/authContext.tsx";

export default function AuthSuccess() {
    const [searchParams] = useSearchParams();
    const { refreshUser } = useAuth(); // We only need this function
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogin = async () => {
            // 1. Get tokens from the URL query string
            const accessToken = searchParams.get("token");
            const refreshToken = searchParams.get("refresh");

            if (accessToken && refreshToken) {
                // 2. Manually save to LocalStorage
                // (Since your AuthContext reads from localStorage in loadUserData)
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);

                // 3. Tell Context to load the user data immediately
                await refreshUser();

                // 4. Redirect to Dashboard
                // 👇 ADD THIS TIMER for debugging
                setTimeout(() => {
                    navigate("/dashboard", { replace: true });
                }, 3000); // Wait 3 seconds before moving
            } else {
                // If tokens are missing, send back to login
                navigate("/login");
            }
        };

        handleLogin();
    }, []);

    return (
        <div className="h-screen w-full bg-[#121212] flex flex-col items-center justify-center text-white gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
            <h2 className="text-xl font-bold">Finalizing Login...</h2>
            <p className="text-slate-400">Please wait while we set up your account.</p>
        </div>
    );
}