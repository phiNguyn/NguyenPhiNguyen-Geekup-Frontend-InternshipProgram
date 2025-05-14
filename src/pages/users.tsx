"use client"

import { useState, useEffect } from "react"
import type { User } from "@/lib/types"
import UserTable from "@/components/user-table"
import LoadingState from "@/components/loading-state"
import { getUsers } from "@/lib/api"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const userData = await getUsers()
        setUsers(userData)
      } catch (error) {
        console.error("Failed to fetch users:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <>
     <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">Albums</h1>
      {loading ? <LoadingState /> : <UserTable users={users} />
      }
      </div>
    </>
  )
}
