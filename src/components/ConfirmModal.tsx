import { AlertTriangle, CheckCircle, Info, Loader2 } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isLoading?: boolean;
    variant?: "danger" | "success" | "info"; // Controls color theme
}

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isLoading = false,
    variant = "danger",
}: ConfirmModalProps) {
    if (!isOpen) return null;

    // specific styles based on variant
    const styles = {
        danger: {
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            btnBg: "bg-red-600 hover:bg-red-700",
            icon: <AlertTriangle className="w-6 h-6" />,
        },
        success: {
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
            btnBg: "bg-emerald-600 hover:bg-emerald-700",
            icon: <CheckCircle className="w-6 h-6" />,
        },
        info: {
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            btnBg: "bg-blue-600 hover:bg-blue-700",
            icon: <Info className="w-6 h-6" />,
        },
    };

    const theme = styles[variant];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Content */}
                <div className="p-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${theme.iconBg} ${theme.iconColor}`}>
                        {theme.icon}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{message}</p>
                </div>

                {/* Footer Actions */}
                <div className="bg-slate-50 px-6 py-4 flex gap-3 justify-end border-t border-slate-100">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`px-4 py-2 text-sm font-medium text-white rounded-lg flex items-center gap-2 transition-colors ${theme.btnBg}`}
                    >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}