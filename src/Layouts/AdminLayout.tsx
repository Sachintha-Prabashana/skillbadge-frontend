import { Outlet} from "react-router-dom"
import AdminSidebar from "../components/AdminSidebar.tsx"

export default function AdminLayout() {
    return (
        <div className="flex h-screen bg-[#f8f9fc] font-['Satoshi, _sans-serif']">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-6 overflow-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}
