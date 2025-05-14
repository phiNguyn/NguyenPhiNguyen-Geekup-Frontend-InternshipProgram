import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import type { Album, User } from "@/lib/types"
import { getAlbums, getUsers } from "@/lib/api"
import AlbumTable from "@/components/album-table"
import Pagination from "@/components/pagination"
import LoadingState from "@/components/loading-state"

function useQuery() {
  const { search } = useLocation()
  return new URLSearchParams(search)
}

export default function Albums() {
  const navigate = useNavigate()
  const query = useQuery()
  const pageParam = query.get("page")
  const currentPage = pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : 1

  const [albums, setAlbums] = useState<Album[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const { data, total } = await getAlbums(currentPage, pageSize)
        const allUsers = await getUsers()

        setAlbums(data)
        setUsers(allUsers)
        setTotalPages(Math.ceil(total / pageSize))
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [currentPage, pageSize])

  const handlePageChange = (page: number) => {
    navigate(`/albums?page=${page}`)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    navigate(`/albums?page=1`)
  }

  return (
    <>

      {loading ? (
        <LoadingState />
      ) : (
        <>
          <AlbumTable albums={albums} users={users} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageSize={pageSize}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </>
  )
}
