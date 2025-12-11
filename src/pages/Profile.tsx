import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import {fetchUsersProfile, type UserProfileData} from "../services/user.ts";
import ProfileSidebar from "../components/ProfileSidebar.tsx";
import ProgressSection from "../components/ProgressSection.tsx";
import BadgesSection from "../components/BadgesSection.tsx";
import HeatmapSection from "../components/HeatmapSection.tsx";
import RecentActivitySection from "../components/RecentActivitySection.tsx";
import EducationSection from "../components/EducationSection.tsx";

export default function Profile() {
    const { id } = useParams();
    const [data, setData] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. Extract fetch logic into a reusable function
    const loadData = async () => {
        try {
            // Don't set loading(true) here to prevent full page flash
            const profileData = await fetchUsersProfile(id || "me");
            setData(profileData);
        } catch (err) {
            console.error("Failed to load profile", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData()
    }, [id]);

    if (loading) return (
        <div className="h-screen bg-[#1a1a1a] flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
        </div>
    );

    if (!data) return <div className="text-white text-center pt-20">User not found</div>;

    return (
        <div className="max-w-7xl mx-auto pb-20 font-['Satoshi',_sans-serif] p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* --- LEFT SIDEBAR (User Info) --- */}
                <div className="lg:col-span-3 space-y-6">
                    <ProfileSidebar
                        username={data.username}
                        rank={data.rank}
                        avatarUrl={data.avatarUrl}
                        languages={data.languages}

                        // NEW PROPS
                        title={data.title}
                        about={data.about}
                        country={data.country}
                        socials={data.socials}
                        // 3. PASS THE RELOAD FUNCTION HERE
                        onProfileUpdate={loadData}
                    />
                </div>

                {/* --- MAIN CONTENT --- */}
                <div className="lg:col-span-9 space-y-6">

                    {/* Row 1: Progress & Badges */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProgressSection solved={data.solved} />
                        <BadgesSection badges={data.badges} />
                    </div>

                    {/* Row 2: Heatmap */}
                    <HeatmapSection calendar={data.submissionCalendar} />

                    <EducationSection education={data.education} />

                    {/* Row 3: Recent Activity */}
                    <RecentActivitySection activities={data.recentActivity} />

                </div>
            </div>
        </div>
    );
}