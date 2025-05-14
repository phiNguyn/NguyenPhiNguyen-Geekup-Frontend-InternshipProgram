import { lazy } from "react"
import Layout from "@/components/layout"

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
                path: "albums",
                element: <Albums />
            },
            {
                path: "users",
                element: <UsersPage />
            },
            {
                path: "users/:id",
                element: < UserDetailPage />
            },
            {
                path: "albums/:id",
                element: < AlbumsDetail />
            }
        ]
    }
]
