import React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { generatePageNumbers } from "@/mylib/utils"


const BlogPagination = ({
  page,
  totalCount,
  perPage = "5",
}: {
  page: string | number
  totalCount: number
  perPage?: string | number
}) => {
  page = Number(page)
  perPage = Number(perPage)
  const pagesCount = Math.floor(totalCount / perPage) + 1

  const pages = generatePageNumbers(pagesCount, page)

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : undefined}
            className={cn({ "pointer-events-none opacity-50": page <= 1 })}
            href={`/blog?page=${page - 1}`}
          />
        </PaginationItem>
        {pages.map((pageCustom, index) => {
          const key = "page-item-" + index
          if (pageCustom == "...") {
            return (
              <PaginationItem key={key}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          } else {
            const isActive = Boolean(page === pageCustom)
            return (
              <PaginationItem key={key}>
                <PaginationLink
                  href={`/blog?page=${pageCustom}`}
                  isActive={isActive}
                >
                  {pageCustom}
                </PaginationLink>
              </PaginationItem>
            )
          }
        })}
        <PaginationItem>
          <PaginationNext
            href={`/blog?page=${page + 1}`}
            aria-disabled={page >= pagesCount}
            tabIndex={page >= pagesCount ? -1 : undefined}
            className={cn({
              "pointer-events-none opacity-50": page >= pagesCount,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default BlogPagination
