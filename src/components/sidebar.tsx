"use client"

import { Album, ArrowLeft, Users } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import Logo from "../../public/geekup-logo-general.svg"
import { Button } from "./ui/button"

export default function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname

  const isActive = (path: string) => {
    return pathname.startsWith(path)
  }

  return (
    <aside className="w-[200px] bg-white  min-h-screen fixed">
      <nav className="p-4 relative ">
        <div>
          <img src={Logo} alt="Logo" />
        </div>
        <ul className="space-y-2">
          <li>
            <Link
              to="/albums"
              className={`flex items-center p-2 rounded-md ${isActive("/albums") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Album className="w-5 h-5 mr-3" />
              <span>Albums</span>
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`flex items-center p-2 rounded-md ${isActive("/users") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              <Users className="w-5 h-5 mr-3" />
              <span>Users</span>
            </Link>
          </li>
        </ul>
       
      </nav>
      <Button className="absolute left-1/2 bottom-2 -translate-x-1/2 -translate-0 ">
          <ArrowLeft/>
        </Button>
    </aside>
  )
}
