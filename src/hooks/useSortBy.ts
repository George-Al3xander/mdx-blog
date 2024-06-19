"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { sortOptions } from "@/data"
import { addSearchParam } from "@/lib/utils"

const useSortBy = () => {
  const searchParams = useSearchParams()
  const sortOption = searchParams.get("sortBy") || "date-desc"
  const router = useRouter()
  const changeSortOption = (newSortOpt: string) => {
    let newSearchParams = ""
    if (sortOptions.map(({ value }) => value).includes(newSortOpt)) {
      newSearchParams = addSearchParam(searchParams, {
        key: "sortBy",
        value: newSortOpt,
      })
    } else {
      console.log("Invalid sorting option")
      newSearchParams = addSearchParam(searchParams, {
        key: "sortBy",
        value: "date-desc",
      })
    }
    router.push(`?${newSearchParams}`)
  }

  const checkIfCurrent = (newSortOpt: string) => newSortOpt === sortOption

  return {
    value: sortOption,
    onValueChange: changeSortOption,
    checkIfCurrent,
    sortOptions,
  }
}

export default useSortBy
