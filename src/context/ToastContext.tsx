import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

// 1. Types
type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type: ToastType) => void;
}

// 2. Create Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// 3. Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType) => {
        const id = Date.now();
        // Add new toast
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* --- FIXED TOP-RIGHT CONTAINER --- */}
            <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none items-end">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border animate-in slide-in-from-right fade-in duration-300 min-w-[300px] backdrop-blur-md ${
                            toast.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                                toast.type === "error" ? "bg-red-500/10 border-red-500/20 text-red-500" :
                                    toast.type === "warning" ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                                        "bg-blue-500/10 border-blue-500/20 text-blue-500"
                        }`}
                    >
                        {/* Icons */}
                        {toast.type === "success" && <CheckCircle className="w-5 h-5 shrink-0" />}
                        {toast.type === "error" && <AlertCircle className="w-5 h-5 shrink-0" />}
                        {toast.type === "warning" && <AlertTriangle className="w-5 h-5 shrink-0" />}
                        {toast.type === "info" && <Info className="w-5 h-5 shrink-0" />}

                        {/* Message */}
                        <span className="text-sm font-medium flex-1">{toast.message}</span>

                        {/* Close Button */}
                        <button onClick={() => removeToast(toast.id)} className="hover:opacity-70 transition-opacity">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

// 4. Hook
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within a ToastProvider");
    return context;
};