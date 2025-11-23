// import React from "react";
import { Code2, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">SkillBadge</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
             <Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link>
             <Link to="/terms" className="hover:text-indigo-600">Terms of Service</Link>
             <a href="#" className="hover:text-indigo-600">GitHub</a>
          </div>
        </div>
        <div className="text-center text-slate-400 text-sm">
          © 2025 SkillBadge. Open Source & Free Forever.
        </div>
      </div>
    </footer>
  );
}