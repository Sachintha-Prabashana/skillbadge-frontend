import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit2, Trash2, Eye } from "lucide-react";

// --- MOCK DATA ---
const MOCK_CHALLENGES = [
    { _id: "1", title: "Two Sum", category: "Arrays", difficulty: "EASY", points: 10, submissions: 120 },
    { _id: "2", title: "Valid Parentheses", category: "Stack", difficulty: "MEDIUM", points: 20, submissions: 85 },
    { _id: "3", title: "Merge K Lists", category: "Linked List", difficulty: "HARD", points: 50, submissions: 32 },
    { _id: "4", title: "Palindrome Number", category: "Math", difficulty: "EASY", points: 10, submissions: 210 },
];

export default function ManageChallenges() {
    const [searchTerm, setSearchTerm] = useState("");

    const filtered = MOCK_CHALLENGES.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Challenges Library</h1>
                <Link
                    to="/admin/create-challenge"
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 transition"
                >
                    <Plus className="w-4 h-4" /> Create New
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex gap-4">
                <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select className="border rounded-lg px-4 py-2 bg-white text-sm">
                    <option>All Difficulties</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold">
                    <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Difficulty</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4 text-center">Submissions</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {filtered.map((item) => (
                        <tr key={item._id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 font-bold text-slate-700">{item.title}</td>
                            <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold border ${
                      item.difficulty === "EASY" ? "bg-emerald-50 text-emerald-600 border-emerald-200" :
                          item.difficulty === "MEDIUM" ? "bg-amber-50 text-amber-600 border-amber-200" :
                              "bg-rose-50 text-rose-600 border-rose-200"
                  }`}>
                    {item.difficulty}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                            <td className="px-6 py-4 text-center text-sm font-mono text-slate-500">{item.submissions}</td>
                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                                <button className="p-2 text-slate-400 hover:text-indigo-600"><Edit2 className="w-4 h-4" /></button>
                                <button className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}