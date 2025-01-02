import { allowedPostTypes, navLinks, PER_PAGE, sortOptions } from "@/data"
import { MultiPageProps, SortFilter, TPostVariant } from "@/types/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import {
  getPostCount,
  getPosts as getArticles,
  getPostsProgramsCount,
  getPostsWithPrograms,
} from "@/lib/mongo/actions"
import { notFound, redirect } from "next/navigation"

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
  return Math.ceil(words / wpm)
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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getPostsTotalCount = async (
  postType: TPostVariant & "all",
  searchQuery?: string,
): Promise<number> => {
  if (postType === "all") {
    return await getPostsProgramsCount()
  } else {
    return await getPostCount(postType, searchQuery)
  }
}

export const getPublications = async (
  postType: TPostVariant | "all",
  page: string | number,
  searchQuery?: string,
  sortBy?: string,
) => {
  let posts: any[] = []
  if (postType === "all") {
    posts = await getPostsWithPrograms(page, searchQuery, sortBy)
  } else {
    posts = await getArticles(postType, page, searchQuery, sortBy)
  }
  return posts
}

export const protectMultiPagePostType = (postType: string): void => {
  if (!allowedPostTypes.includes(postType)) return notFound()
}

export const constructMultiPagePathname = (
  postType: TPostVariant & "all",
): string => `/posts/${postType === "all" ? "" : postType}`

export const protectPaginationBoundaries = ({
  currentPage,
  pagesCount,
  pathname,
  currentSearchParams,
}: {
  currentPage: string
  pagesCount: number
  pathname: string
  currentSearchParams: URLSearchParams | string
}): void => {
  let searchParams: string | null = null
  const currentPageNumber = Number(currentPage)
  if (
    currentPageNumber > pagesCount ||
    currentPageNumber < 1 ||
    !currentPageNumber
  ) {
    searchParams = changePageParam(
      currentSearchParams as string,
      currentPageNumber < 1 ? 1 : pagesCount,
    )
  }

  if (searchParams) {
    redirect(`${pathname}?${searchParams}`)
  }
}

export const processMultiPageProps = ({
  params: { slug = ["all"] },
  searchParams = { page: "1" },
}: MultiPageProps) => {
  const [postType] = slug as [TPostVariant & "all"]
  const pageNumber = searchParams.page || "1"
  const { searchQuery, sortBy } = searchParams

  return { postType, searchQuery, sortBy, pageNumber, slug, searchParams }
}

export const getCount = async ({
  postType,
  searchQuery,
}: {
  postType: string
  searchQuery: string | undefined
}): Promise<{ allPublicationsCount: number; pagesCount: number }> => {
  const allPublicationsCount = await getPostsTotalCount(
    postType as never,
    searchQuery,
  )
  const pagesCount = Math.ceil(allPublicationsCount / PER_PAGE)

  return { allPublicationsCount, pagesCount }
}

export const protectMultiPage = async (
  props: MultiPageProps,
): Promise<{
  allPublicationsCount: number
  pagesCount: number
  postType: TPostVariant
  pathname: string
  pageNumber: string
  searchQuery?: string
  sortBy?: string
  slug: string[]
}> => {
  const { postType, searchQuery, sortBy, pageNumber, searchParams, slug } =
    processMultiPageProps(props)

  protectMultiPagePostType(postType)

  const { pagesCount, allPublicationsCount } = await getCount({
    postType,
    searchQuery,
  })

  const pathname = constructMultiPagePathname(postType)

  protectPaginationBoundaries({
    pagesCount,
    pathname,
    currentSearchParams: searchParams as string,
    currentPage: pageNumber,
  })

  return {
    allPublicationsCount,
    pagesCount,
    pageNumber,
    postType,
    searchQuery,
    sortBy,
    slug,
    pathname,
  }
}
