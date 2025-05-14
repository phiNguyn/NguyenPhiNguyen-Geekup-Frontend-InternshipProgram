import { lazy } from "react"
import Layout from "@/components/layout"
import { Navigate } from "react-router-dom"

const Albums = lazy(() => import("@/pages/albums"))
const AlbumsDetail = lazy(() => import("@/pages/albumDetail"))
const UsersPage = lazy(() => import("@/pages/users"))
const UserDetailPage = lazy(() => import("@/pages/userDetail"))

export const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/albums" replace />
            },
            {
                path: "albums",
                element: <Albums />,
            },
            {
                path: "users",
                element: <UsersPage />
            },
            {
                path: "users/:id",
                element: <UserDetailPage />
            },
            {
                path: "albums/:id",
                element: <AlbumsDetail />
            }
        ]
    }
]
