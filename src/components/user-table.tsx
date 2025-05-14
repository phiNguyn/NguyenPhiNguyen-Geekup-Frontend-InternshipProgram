import { Eye, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import type { User } from "@/lib/types"
import { Button } from "@/components/ui/button"

interface UserTableProps {
  users: User[]
}

export default function UserTable({ users }: UserTableProps) {
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
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16"
            >
              Avatar
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Website
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
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=32`}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  <a href={`mailto:${user.email}`} className="text-blue-400  cursor-pointer hover:text-blue-300">
                    {user.email}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a href={`tel:${user.phone}`} className="text-blue-400 hover:text-blue-300 cursor-pointer">
                    {user.phone}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 cursor-pointer flex items-center"
                  >
                    {user.website}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium group">
                  <Button variant="outline" size="sm" className="flex items-center gap-1 hover:border-blue-400">

                    <Link
                      to={`/users/${user.id}`}
                      className="text-black hover:text-blue-600 flex items-center justify-center"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      <span>Show</span>
                    </Link>

                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
