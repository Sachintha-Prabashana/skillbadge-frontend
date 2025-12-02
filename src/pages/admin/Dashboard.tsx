import { Users, Code2, Trophy, Activity, ArrowUpRight } from "lucide-react";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

// --- MOCK DATA ---
const MOCK_STATS = [
    { label: "Total Students", value: "1,240", change: "+12%", icon: Users, color: "blue" },
    { label: "Challenges", value: "45", change: "+3", icon: Code2, color: "indigo" },
    { label: "Submissions", value: "8,502", change: "+18%", icon: Activity, color: "emerald" },
    { label: "Total Badges", value: "320", change: "+5%", icon: Trophy, color: "amber" },
];

const CHART_DATA = [
    { name: 'Mon', submissions: 40 },
    { name: 'Tue', submissions: 75 },
    { name: 'Wed', submissions: 50 },
    { name: 'Thu', submissions: 120 },
    { name: 'Fri', submissions: 180 },
    { name: 'Sat', submissions: 90 },
    { name: 'Sun', submissions: 60 },
];

export default function AdminOverview() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500">Welcome back, Admin. Here is what's happening today.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {MOCK_STATS.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {stat.change} <ArrowUpRight className="w-3 h-3 ml-1" />
              </span>
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                        <p className="text-sm text-slate-500 font-medium mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Submission Activity</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={CHART_DATA}>
                                <defs>
                                    <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="submissions" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorSub)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* System Health / Recent */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">System Status</h3>
                    <div className="space-y-4">
                        <StatusItem label="API Latency" value="24ms" status="good" />
                        <StatusItem label="Piston Engine" value="Operational" status="good" />
                        <StatusItem label="Database" value="Connected" status="good" />
                        <StatusItem label="Error Rate" value="0.01%" status="good" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatusItem({ label, value, status }: any) {
    return (
        <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-sm font-medium text-slate-600">{label}</span>
            <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-sm font-bold text-slate-800">{value}</span>
            </div>
        </div>
    )
}