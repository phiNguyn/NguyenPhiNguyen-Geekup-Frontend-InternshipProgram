import { Outlet } from "react-router-dom"
import Sidebar from "./sidebar"

const Layout = () => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">
                <header className="fixed top-0 right-0 left-[200px] h-16 bg-white z-50 ">
                    {/* Header content */}
                </header>
                <main className="bg-gray-100 ml-[200px] pt-16 box-border overflow-x-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout