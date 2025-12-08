import { createContext, useContext, useEffect, useState} from "react"
import { fetchProfile } from "../services/auth"

const AuthContext = createContext<any>(null)

export const AuthProvider = ( { children }: any ) => {
    const [ user, setUser ] = useState<any>(null)
    const [ loading, setLoading ] = useState(true)

    // 2. The Fetch Logic (Reusable)
    const loadUserData = async () => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const res = await fetchProfile();
                if (res.data) {
                    setUser(res.data);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error("Failed to load user:", err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        } else {
            setUser(null);
            setLoading(false);
        }
    };

    // 3. Initial Load (Runs once)
    useEffect(() => {
        loadUserData(); // <--- FIXED: Just call the function directly
    }, []);

    // 4. Helper Functions
    const refreshUser = async () => {
        await loadUserData(); // Re-runs the fetch to update Avatar/Points
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, refreshUser }}>
        {children}
        </AuthContext.Provider>
    )

    
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


