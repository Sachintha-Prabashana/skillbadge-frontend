import { useEffect, useState } from "react";
import {
    Search, MoreVertical, Shield, User, Loader2,
    CheckCircle, ChevronLeft, ChevronRight, Ban
} from "lucide-react";
import { fetchUsers, toggleUserBan, type UserData } from "../../services/admin/admin.user.ts";
import { useToast } from "../../context/ToastContext";
// Ensure the path matches where you saved the component
import ConfirmModal from "../../components/ConfirmModal";

export default function ManageUsers() {
    const { showToast } = useToast();

    // --- DATA STATE ---
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);

    // --- MODAL STATE (NEW) ---
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        userId: string;
        action: 'Ban' | 'Activate';
    }>({ isOpen: false, userId: '', action: 'Ban' });

    const [actionLoading, setActionLoading] = useState(false);

    // --- FILTER STATE ---
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [roleFilter, setRoleFilter] = useState("All");

    // --- PAGINATION STATE ---
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);

    // --- UI STATE ---
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    // --- LOAD DATA ---
    useEffect(() => {
        const timer = setTimeout(() => {
            loadUsers();
        }, 500);
        return () => clearTimeout(timer);
    }, [search, page, roleFilter]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const res = await fetchUsers(page, search, roleFilter);
            setUsers(res.data);
            setTotalPages(res.pagination.totalPages);
            setTotalUsers(res.pagination.total);
        } catch (error) {
            showToast("Failed to load users", "error");
        } finally {
            setLoading(false);
        }
    };

    // --- ACTIONS ---

    // 1. Initiate: Opens the modal
    const initiateBan = (userId: string, isCurrentlyActive: boolean) => {
        const action = isCurrentlyActive ? "Ban" : "Activate";

        setConfirmModal({
            isOpen: true,
            userId,
            action
        });
        setOpenMenuId(null); // Close the dropdown
    };

    // 2. Execute: Runs when user clicks "Confirm" in the modal
    const executeBan = async () => {
        setActionLoading(true);
        try {
            const isBanning = confirmModal.action === 'Ban';

            // Call API
            await toggleUserBan(confirmModal.userId, !isBanning);

            showToast(`User ${confirmModal.action}ed successfully`, "success");

            // Optimistic Update
            setUsers(users.map(u =>
                u._id === confirmModal.userId ? { ...u, isActive: !isBanning } : u
            ));

            // Close Modal
            setConfirmModal(prev => ({ ...prev, isOpen: false }));
        } catch (error: any) {
            // --- THIS IS THE FIX ---

            // 1. Check if the server sent a specific message (like "You cannot ban yourself")
            // Axios stores the server response inside error.response.data
            const serverMessage = error.response?.data?.message || "Failed to update status";

            // 2. Show that specific message to the user
            showToast(serverMessage, "error");

            // 3. If it's a specific logic error (like self-ban), you might want to close the modal
            // because retrying won't fix it.
            if (error.response?.status === 403 ) {
                setConfirmModal(prev => ({ ...prev, isOpen: false }));
            }
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <div className="min-h-screen" onClick={() => setOpenMenuId(null)}>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                    <div className="text-sm text-slate-500 mt-1">
                        Total Users: <span className="font-bold text-slate-900">{totalUsers}</span>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                    />
                </div>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 bg-white"
                >
                    <option value="All">All Roles</option>
                    <option value="ADMIN">Admins</option>
                    <option value="STUDENT">Students</option>
                </select>
            </div>

            {/* Table Container - Responsive */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-12 flex justify-center"><Loader2 className="animate-spin w-8 h-8 text-indigo-600" /></div>
                    ) : users.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">No users found.</div>
                    ) : (
                        <table className="w-full text-left min-w-[800px]">
                            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Points</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                            {users.map((user) => {
                                // 🟢 COMPUTE STATUS: Default to TRUE if undefined
                                const isUserActive = user.isActive !== false;

                                return (
                                    <tr key={user._id} className={`hover:bg-slate-50 transition ${!isUserActive ? 'bg-red-50/30' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                                                    {user.avatarUrl ? (
                                                        <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="font-bold text-slate-500">{user.firstname?.[0]}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 text-sm">
                                                        {user.firstname} {user.lastname}
                                                    </div>
                                                    <div className="text-xs text-slate-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.roles.includes("ADMIN") ? (
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded-full border border-purple-100 w-fit">
                                                        <Shield className="w-3 h-3" /> ADMIN
                                                    </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-full border border-slate-200 w-fit">
                                                        <User className="w-3 h-3" /> STUDENT
                                                    </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                                <span className="text-sm font-mono font-bold text-indigo-600">
                                                    {user.points?.toLocaleString() || 0} XP
                                                </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {isUserActive ? (
                                                <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full w-fit">
                                                        <CheckCircle className="w-3 h-3" /> Active
                                                    </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2 py-1 rounded-full w-fit">
                                                        <Ban className="w-3 h-3" /> Banned
                                                    </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setOpenMenuId(openMenuId === user._id ? null : user._id);
                                                }}
                                                className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded transition"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>

                                            {/* Dropdown Menu */}
                                            {openMenuId === user._id && (
                                                <div className="absolute right-8 top-8 w-48 bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-100">
                                                    <button
                                                        // 🟢 CLICK: Open the Modal instead of window.confirm
                                                        onClick={() => initiateBan(user._id, isUserActive)}
                                                        className={`w-full text-left px-4 py-2.5 text-sm font-medium flex items-center gap-2 ${
                                                            isUserActive ? "text-red-600 hover:bg-red-50" : "text-emerald-600 hover:bg-emerald-50"
                                                        }`}
                                                    >
                                                        {isUserActive ? (
                                                            <><Ban className="w-4 h-4" /> Ban User</>
                                                        ) : (
                                                            <><CheckCircle className="w-4 h-4" /> Activate User</>
                                                        )}
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2 mt-4">
                <span className="text-xs text-slate-500">Page {page} of {totalPages}</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-2 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="p-2 bg-white border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* --- CONFIRMATION MODAL --- */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={executeBan}
                title={`${confirmModal.action} User?`}
                message={confirmModal.action === 'Ban'
                    ? "Are you sure you want to ban this user? They will lose access immediately."
                    : "Are you sure you want to activate this user? They will regain access to the platform."
                }
                confirmText={`Yes, ${confirmModal.action}`}
                variant={confirmModal.action === 'Ban' ? 'danger' : 'success'}
                isLoading={actionLoading}
            />
        </div>
    );
}