import React from "react";
import { 
  Trophy, 
  Flame, 
  Target, 
  Zap, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  MoreHorizontal,
  Code2
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8 font-['Satoshi',_'Open_Sans',_sans-serif]">
      
      {/* --- 1. Welcome & Stats Section --- */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Good morning, Alex! 👋</h1>
        <p className="text-slate-500">You're on a 7-day streak. Keep it up!</p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <StatCard 
            icon={Trophy} 
            color="text-yellow-500" 
            bg="bg-yellow-50" 
            label="Global Rank" 
            value="Top 5%" 
          />
          <StatCard 
            icon={Flame} 
            color="text-orange-500" 
            bg="bg-orange-50" 
            label="Day Streak" 
            value="7 Days" 
          />
          <StatCard 
            icon={Zap} 
            color="text-indigo-500" 
            bg="bg-indigo-50" 
            label="Total Points" 
            value="1,250" 
          />
          <StatCard 
            icon={CheckCircle2} 
            color="text-green-500" 
            bg="bg-green-50" 
            label="Problems Solved" 
            value="42" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- 2. Main Column (Wide) --- */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Continue Learning (Hero Card) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded-md">
                  In Progress
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">Python Basic Certification</h3>
                <p className="text-sm text-slate-500">Module 3: Data Structures & Algorithms</p>
              </div>
              <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center">
                <Code2 className="text-white w-6 h-6" />
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium text-slate-700">
                <span>Progress</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-indigo-600 h-2.5 rounded-full w-[65%]"></div>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg text-sm font-bold transition-all">
                Continue Learning
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Recommended Challenges List */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-900">Recommended for you</h3>
              <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
                View all
              </a>
            </div>
            
            <div className="space-y-3">
              <ChallengeCard 
                title="Binary Tree Traversal" 
                difficulty="Medium" 
                time="30 mins" 
                tags={["Algorithms", "Trees"]} 
                color="text-yellow-600 bg-yellow-100"
              />
              <ChallengeCard 
                title="CSS Flexbox Layouts" 
                difficulty="Easy" 
                time="15 mins" 
                tags={["Frontend", "CSS"]} 
                color="text-green-600 bg-green-100"
              />
              <ChallengeCard 
                title="REST API Design" 
                difficulty="Hard" 
                time="45 mins" 
                tags={["Backend", "API"]} 
                color="text-red-600 bg-red-100"
              />
            </div>
          </div>
        </div>

        {/* --- 3. Side Column (Narrow) --- */}
        <div className="space-y-8">
          
          {/* Daily Goal Widget */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900">Daily Goal</h3>
              <Target className="w-5 h-5 text-slate-400" />
            </div>
            
            <div className="flex flex-col items-center py-4">
              <div className="w-24 h-24 rounded-full border-4 border-indigo-100 border-t-indigo-600 flex flex-col items-center justify-center mb-4">
                <span className="text-2xl font-bold text-slate-900">1/3</span>
              </div>
              <p className="text-sm text-slate-500 text-center">
                Solve 2 more challenges to complete your daily goal!
              </p>
            </div>
          </div>

          {/* Leaderboard Snippet */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900">Top Students</h3>
              <MoreHorizontal className="w-5 h-5 text-slate-400 cursor-pointer" />
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((rank) => (
                <div key={rank} className="flex items-center gap-3">
                  <span className={`w-6 h-6 flex items-center justify-center text-xs font-bold rounded-full ${
                    rank === 1 ? "bg-yellow-100 text-yellow-700" : 
                    rank === 2 ? "bg-slate-100 text-slate-700" : 
                    "bg-orange-50 text-orange-700"
                  }`}>
                    {rank}
                  </span>
                  <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-slate-900">User {rank}</div>
                    <div className="text-xs text-slate-500">1540 pts</div>
                  </div>
                </div>
              ))}
              {/* You */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100 opacity-75">
                <span className="w-6 text-center text-xs font-bold text-slate-400">42</span>
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xs">
                  ME
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-slate-900">Alex</div>
                  <div className="text-xs text-slate-500">1250 pts</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// --- Sub Components ---

function StatCard({ icon: Icon, color, bg, label, value }: any) {
  return (
    <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4 hover:border-indigo-200 transition-colors cursor-default">
      <div className={`p-3 rounded-lg ${bg}`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div>
        <div className="text-xl font-bold text-slate-900">{value}</div>
        <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</div>
      </div>
    </div>
  );
}

function ChallengeCard({ title, difficulty, time, tags, color }: any) {
  return (
    <div className="group bg-white border border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs ${color.includes("yellow") ? "bg-yellow-100 text-yellow-700" : color.includes("green") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {difficulty === "Hard" ? "H" : difficulty === "Medium" ? "M" : "E"}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{title}</h4>
          <div className="flex items-center gap-2 mt-1">
            {tags.map((tag: string) => (
              <span key={tag} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
            <span className="text-xs text-slate-400 flex items-center gap-1 ml-2">
              <Clock className="w-3 h-3" /> {time}
            </span>
          </div>
        </div>
      </div>
      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
    </div>
  );
}