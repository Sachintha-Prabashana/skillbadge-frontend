// import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar'; // Ensure path is correct
import Footer from '../components/Footer'; // Ensure path is correct

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      
      {/* Header (Fixed Position) */}
      <LandingNavbar />

      {/* Main Content */}
      {/* flex-1 ensures footer is pushed to bottom if content is short */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}