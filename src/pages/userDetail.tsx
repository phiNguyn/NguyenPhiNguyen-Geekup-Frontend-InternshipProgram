"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/types"
import LoadingState from "@/components/loading-state"
import { ArrowLeft, Users } from "lucide-react"
import { getUser } from "@/lib/api"
import { Link, useParams } from "react-router-dom"
import UserAlbumTables from "@/components/userTableAlbums"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useNavigate } from "@/hooks/useNavigate"
import { BreadcrumbWithCustomSeparator } from "@/components/breadcrumb"

export default function UserDetailPage() {
    const { id } = useParams()
    const { goBack } = useNavigate()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadData = async () => {
            setLoading(true)
            try {
                const userData = await getUser(String(id))
                setUser(userData)


            } catch (error) {
                console.error("Failed to fetch data:", error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [id])

    return (
        <>
            <div>
                <BreadcrumbWithCustomSeparator name="Users" Icon={<Users size={25} />} />

                <div className="flex  items-center justify-start">
                    <Button size={"icon"} onClick={goBack} className="cursor-pointer hover:bg-gray-200">
                        <ArrowLeft className="w-4 h-4 mr-2 flex justify-center items-center" />
                    </Button>
                    <div className="ml-2">Show Users</div>
                </div>
                {loading ? (
                    <LoadingState />
                ) : user ? (
                    <div className="rounded-xl shadow-sm ">
                        <div className="bg-white p-6 mb-6">

                            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                <Avatar>
                                    <AvatarImage src={`https://ui-avatars.com/api/?background=random&rounded=true&name=${user.name}`} alt={user.name} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                    <Link to={`/users/${user.id}`} className="text-lg font-medium text-blue-800 hover:text-blue-500 block">
                                        {user.name}
                                    </Link>
                                    <a href={`mailto:${user.email}`} className="text-sm text-blue-600 hover:text-blue-500">
                                        {user.email}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 ">
                            <h2 className="text-xl font-semibold mb-4">Albums </h2>

                            <UserAlbumTables id={id} />
                        </div>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <p>User not found</p>
                    </div>
                )}
            </div>

        </>
    )
}
