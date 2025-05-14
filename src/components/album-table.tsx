import type { Album, User } from "@/lib/types"
import { Eye } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"

interface AlbumTableProps {
  albums: Album[]
  users: User[]
}

export default function AlbumTable({ albums, users }: AlbumTableProps) {
  const getUserById = (userId: number): User | undefined => {
    return users.find((user) => user.id === userId)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16"
            >
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {albums.length > 0 ? (
            albums.map((album) => {
              const user = getUserById(album.userId)

              return (
                <tr key={album.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{album.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{album.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user ? (
                      <Link to={`/users/${user.id}`} className="flex items-center cursor-pointer">
                        <img
                          src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=32`}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full mr-2"
                        />
                        <span className="text-sm text-gray-900 hover:underline">{user.name}</span>
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-500">Unknown User</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">

                      <Link
                        to={`/albums/${album.id}`}
                        className="text-black hover:text-blue-600 flex items-center justify-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        <span>Show</span>
                      </Link>

                    </Button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
