import React, { useEffect, useState } from "react";
import {
    Users, Code2, Terminal, Activity, Clock, CheckCircle, XCircle, Loader2
} from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { fetchDashboardStats, type DashboardData } from "../../services/admin/admin.ts";
import { useToast } from "../../context/ToastContext"; // Ensure you have this context

export default function AdminDashboard() {
    const { showToast } = useToast();
    const [stats, setStats] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchDashboardStats();
                setStats(data);
                console.log(data)
            } catch (error) {
                console.error(error);
                showToast("Failed to load dashboard data", "error");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [showToast]);

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!stats) return <div className="p-8 text-center text-red-500">Error loading stats.</div>;

    // Helper to map dynamic data to UI cards
    const statCards = [
        {
            title: "Total Students",
            value: stats.counts.students.toLocaleString(),
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Active Challenges",
            value: stats.counts.challenges.toLocaleString(),
            icon: Code2,
            color: "text-emerald-600",
            bg: "bg-emerald-50"
        },
        {
            title: "Total Submissions",
            value: stats.counts.submissions.toLocaleString(),
            icon: Terminal,
            color: "text-purple-600",
            bg: "bg-purple-50"
        },
        {
            title: "Avg. Pass Rate",
            value: `${stats.counts.passRate}%`,
            icon: Activity,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
    ];

    return (
        <div className="min-h-screen text-slate-800">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Real-time platform insights.</p>
            </div>

            {/* 1. STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="flex items-center text-xs font-bold px-2 py-1 rounded-full text-slate-500 bg-slate-100 border border-slate-200">
                                Live
                            </span>
                        </div>
                        <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
                        <p className="text-3xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* 2. CHARTS & ACTIVITY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Activity Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Submission Activity (Last 7 Days)</h3>
                    </div>

                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.chartData}>
                                <defs>
                                    <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#64748b"
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(val) => val.slice(5)} // Show MM-DD only
                                />
                                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '8px' }}
                                    itemStyle={{ color: '#6366f1' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="submissions"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorSub)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity Feed */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 text-slate-900">Recent Activity</h3>

                    {stats.recentActivity.length === 0 ? (
                        <div className="text-slate-400 text-sm text-center py-10 italic">
                            No recent activity
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {stats.recentActivity.map((item, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    {/* Connector Line */}
                                    {i !== stats.recentActivity.length - 1 && (
                                        <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-slate-100"></div>
                                    )}

                                    {/* Icon */}
                                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center z-10 
                                        ${item.status === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                        item.status === 'failed' ? 'bg-red-100 text-red-600' :
                                            'bg-blue-100 text-blue-600'}`}>
                                        {item.status === 'success' ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-600">
                                            <span className="font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors">
                                                {item.user}
                                            </span> {item.action.replace(item.user, '')} {/* Remove duplicate name if present */}
                                        </p>
                                        <span className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                            <Clock className="w-3 h-3" /> {item.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}