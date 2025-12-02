import React, { useState } from "react";
import { Search, MoreVertical, Shield, User } from "lucide-react";

// --- MOCK DATA ---
const MOCK_USERS = [
    { _id: "1", name: "John Doe", email: "john@example.com", role: "STUDENT", points: 1200, status: "Active" },
    { _id: "2", name: "Admin User", email: "admin@skillbadge.com", role: "ADMIN", points: 9999, status: "Active" },
    { _id: "3", name: "Sarah Smith", email: "sarah@example.com", role: "STUDENT", points: 450, status: "Inactive" },
];

export default function ManageUsers() {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                <div className="text-sm text-slate-500">Total Users: <span className="font-bold text-slate-900">1,240</span></div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                    <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Points</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {MOCK_USERS.map((user) => (
                        <tr key={user._id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">{user.name}</div>
                                        <div className="text-xs text-slate-500">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                {user.role === "ADMIN" ? (
                                    <span className="flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded border border-purple-100 w-fit">
                       <Shield className="w-3 h-3" /> ADMIN
                     </span>
                                ) : (
                                    <span className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded border border-slate-200 w-fit">
                       <User className="w-3 h-3" /> STUDENT
                     </span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-sm font-mono text-indigo-600 font-bold">{user.points} XP</td>
                            <td className="px-6 py-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${user.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {user.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="text-slate-400 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}