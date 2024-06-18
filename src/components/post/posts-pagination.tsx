import React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/pagination"
import { cn } from "@/lib/utils"
import { generatePageNumbers } from "@/mylib/utils"
import { PER_PAGE } from "@/data"

const PostsPagination = ({
  page,
  totalCount,
  perPage = `${PER_PAGE}`,
  pathname,
}: {
  page: string | number
  totalCount: number
  pathname: string
  perPage?: string | number
}) => {
  page = Number(page)
  perPage = Number(perPage)
  const pagesCount = Math.ceil(totalCount / perPage)

  const pages = generatePageNumbers(pagesCount, page)
  if (pagesCount < 2) return null
  return (
    <Pagination className="my-16">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={page <= 1}
            tabIndex={page <= 1 ? -1 : undefined}
            className={cn({ "pointer-events-none opacity-50": page <= 1 })}
            href={`${pathname}?page=${page - 1}`}
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
                  href={`${pathname}?page=${pageCustom}`}
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
            href={`${pathname}?page=${page + 1}`}
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

export default PostsPagination
