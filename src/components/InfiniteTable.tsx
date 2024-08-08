import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { useEffect, useState } from 'react'

type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export default function InfiniteTable() {
  const [offset, setOffset] = useState(0) // This is because jsonplaceholder.typicode uses offset for pagination
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(10)
  const maxLength = 500

  const totalPages = Math.ceil(maxLength / limit)
  const currentPage = Math.floor(offset / limit + 1)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_start=${offset}`,
        )

        const data = await res.json()
        setComments(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPhotos()
  }, [offset, limit])

  return (
    <>
      <div className="flex flex-col space-y-2 mb-4">
        <h2 className="text-3xl font-semibold mx-2 ">Infinite Table</h2>

        <Separator />
        <div className="p-4 text-slate-100 bg-slate-500 rounded-md gap-4 flex flex-col">
          <p className="italic text-xs">
            Note: As the API has max count of 500 so using that as reference for
            Total Count and performing operations.
          </p>
          <p className="font-medium">Offset Count: {offset}</p>
        </div>
      </div>

      <Card>
        <Table className={loading ? 'opacity-20' : ''}>
          <TableHeader>
            <TableRow>
              <TableHead>Link</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Body</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell className="font-medium">
                  <a
                    className="text-blue-500 cursor-pointer"
                    href={`https://jsonplaceholder.typicode.com/posts/${comment.postId}`}
                  >
                    Go To Post
                  </a>
                </TableCell>
                <TableCell>{comment.name}</TableCell>
                <TableCell>{comment.email}</TableCell>
                <TableCell className="truncate">
                  {comment.body.slice(0, 20) + '...'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex p-4 mt-4">
          <div className="flex items-center gap-2 flex-1">
            <p className="text-muted-foreground text-sm">
              Pages {currentPage} of {totalPages}.
            </p>
          </div>

          {/* if current page is 1 then disable previous button */}
          <div className="space-x-6 flex items-center">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page:</p>
              <Select
                value={`${limit}`}
                onValueChange={(value) => {
                  setLimit(parseInt(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder="Select page limit" />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setOffset(0)}
                disabled={offset === 0}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setOffset((prev) => prev - limit)}
                disabled={offset === 0}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setOffset((prev) => prev + limit)}
                disabled={offset === maxLength - limit}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setOffset((totalPages - 1) * limit)}
                disabled={offset === maxLength - limit}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}
