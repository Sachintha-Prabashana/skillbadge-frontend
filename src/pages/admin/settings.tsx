import React, { useState } from "react";
import {
    Shield, Lock, UserPlus, Save, Eye, EyeOff,
    CheckCircle, AlertCircle, Loader2
} from "lucide-react";
import { registerNewAdmin, changePassword } from "../../services/admin/admin.settings";
import { useToast } from "../../context/ToastContext";

export default function AdminSettings() {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState<"team" | "security">("team");

    // --- FORM STATES ---
    const [adminForm, setAdminForm] = useState({
        firstname: "", lastname: "", email: "", password: ""
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "", newPassword: "", confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Toggle visibility

    // --- HANDLERS ---

    const handleRegisterAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerNewAdmin(adminForm);
            showToast("New Admin registered successfully", "success");
            setAdminForm({ firstname: "", lastname: "", email: "", password: "" }); // Reset
        } catch (error: any) {
            showToast(error.response?.data?.message || "Failed to register admin", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            showToast("New passwords do not match", "error");
            return;
        }
        if (passwordForm.newPassword.length < 6) {
            showToast("Password must be at least 6 characters", "error");
            return;
        }

        setLoading(true);
        try {
            await changePassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword
            });
            showToast("Password updated successfully", "success");
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error: any) {
            showToast(error.response?.data?.message || "Failed to update password", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto min-h-screen pb-20">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Manage your team access and account security.</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-6 border-b border-slate-200 mb-8">
                <button
                    onClick={() => setActiveTab("team")}
                    className={`pb-4 text-sm font-medium flex items-center gap-2 transition-colors relative ${
                        activeTab === "team" ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                    <UserPlus className="w-4 h-4" /> Team Management
                    {activeTab === "team" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />}
                </button>
                <button
                    onClick={() => setActiveTab("security")}
                    className={`pb-4 text-sm font-medium flex items-center gap-2 transition-colors relative ${
                        activeTab === "security" ? "text-indigo-600" : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                    <Shield className="w-4 h-4" /> Security
                    {activeTab === "security" && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />}
                </button>
            </div>

            {/* --- TAB CONTENT: TEAM MANAGEMENT --- */}
            {activeTab === "team" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    {/* Left: Info Card */}
                    <div className="md:col-span-1">
                        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5">
                            <h3 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                                <Shield className="w-4 h-4" /> Admin Access
                            </h3>
                            <p className="text-xs text-indigo-700 leading-relaxed mb-4">
                                Admins have full access to manage users, create challenges, and modify system settings.
                            </p>
                            <ul className="space-y-2">
                                <li className="text-xs text-indigo-800 flex items-start gap-2">
                                    <CheckCircle className="w-3 h-3 mt-0.5 shrink-0" /> Manage Users & Roles
                                </li>
                                <li className="text-xs text-indigo-800 flex items-start gap-2">
                                    <CheckCircle className="w-3 h-3 mt-0.5 shrink-0" /> Create/Edit Challenges
                                </li>
                                <li className="text-xs text-indigo-800 flex items-start gap-2">
                                    <CheckCircle className="w-3 h-3 mt-0.5 shrink-0" /> View System Logs
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Registration Form */}
                    <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Register New Admin</h2>
                        <form onSubmit={handleRegisterAdmin} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 outline-none text-sm transition"
                                        placeholder="John"
                                        value={adminForm.firstname}
                                        onChange={e => setAdminForm({...adminForm, firstname: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 outline-none text-sm transition"
                                        placeholder="Doe"
                                        value={adminForm.lastname}
                                        onChange={e => setAdminForm({...adminForm, lastname: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 outline-none text-sm transition"
                                    placeholder="john.doe@company.com"
                                    value={adminForm.email}
                                    onChange={e => setAdminForm({...adminForm, email: e.target.value})}
                                />
                            </div>

                            <div className="space-y-1.5 relative">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Temporary Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 outline-none text-sm transition pr-10"
                                        placeholder="••••••••"
                                        value={adminForm.password}
                                        onChange={e => setAdminForm({...adminForm, password: e.target.value})}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                                    <AlertCircle className="w-3 h-3" /> User can change this upon first login.
                                </p>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                                    Create Admin Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- TAB CONTENT: SECURITY --- */}
            {activeTab === "security" && (
                <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                                <Lock className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">Change Password</h2>
                                <p className="text-sm text-slate-500">Update your personal account password.</p>
                            </div>
                        </div>

                        <form onSubmit={handleChangePassword} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase">Current Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 outline-none text-sm transition"
                                    placeholder="Enter current password"
                                    value={passwordForm.currentPassword}
                                    onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">New Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 outline-none text-sm transition"
                                        placeholder="Min 6 characters"
                                        value={passwordForm.newPassword}
                                        onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Confirm Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:border-indigo-500 outline-none text-sm transition"
                                        placeholder="Re-enter new password"
                                        value={passwordForm.confirmPassword}
                                        onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}