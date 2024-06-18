import { navLinks, sortOptions } from "@/data"
import { SortFilter } from "@/types/types"

export const generatePageNumbers = (
  totalPages: number,
  currentPage: number,
) => {
  const pages = []
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages)
    } else if (currentPage > totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      )
    } else {
      pages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      )
    }
  }
  return pages
}

export const estimateReadingTime = (text: string) => {
  const wpm = 200
  const words = text.trim().split(/\s+/).length
  const time = Math.ceil(words / wpm)
  return time
}

export const addSearchParam = (
  oldSearchParams: URLSearchParams | string | { [key: string]: string },
  newParam: { key: string; value: string },
): string => {
  if (
    typeof oldSearchParams === "string" ||
    typeof oldSearchParams === "object"
  ) {
    oldSearchParams = new URLSearchParams(oldSearchParams)
  }
  const { key, value } = newParam
  const newSearchParams = new URLSearchParams(oldSearchParams)
  newSearchParams.set(key, value)

  return newSearchParams.toString()
}

export const removeSearchParam = (
  oldSearchParams: URLSearchParams,
  key: string,
): string => {
  const newSearchParams = new URLSearchParams(oldSearchParams)
  newSearchParams.delete(key)

  return newSearchParams.toString()
}

export const changePageParam = (
  oldSearchParams: URLSearchParams | string,
  page: string | number,
): string => {
  return addSearchParam(oldSearchParams, {
    key: "page",
    value: page.toString(),
  })
}

export const capitalizeStr = (str: string): string =>
  `${str[0].toUpperCase()}${str.slice(1)}`

export const checkNavRouteIfCurrent = ({
  link,
  pathname,
}: {
  link: (typeof navLinks)[number]
  pathname: string
}): boolean => {
  const href = link == "home" ? "" : link
  const split = pathname.split("/")
  return Boolean(split.length <= 3 && split[1] === href)
}

export const searchParamToSortFilter = (
  param: string,
  type: "string" | "numeric" | undefined = "string",
): SortFilter | { [key: string]: number } => {
  const split = param.split("-")
  const key = split[0] || "date"
  if (type === "string") {
    const value = (split[1] || "desc") as "desc"

    if (sortOptions.map(({ value }) => value).includes(`${key}-${value}`)) {
      return { [key]: value }
    }
    return { date: "desc" }
  }
  const value = split[1] === "desc" ? -1 : 1
  return { [key]: value }
}
