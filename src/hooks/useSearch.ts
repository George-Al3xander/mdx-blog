import { useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import { slug } from "github-slugger"
import { addSearchParam, removeSearchParam } from "@/mylib/utils"

export const useSearch = () => {
  const router = useRouter()
  const currSearchParams = useSearchParams()
  const currSearchQuery = (
    currSearchParams.get("searchQuery") || ""
  ).replaceAll("-", " ")
  const [searchQuery, setSearchQuery] = React.useState<string>(currSearchQuery)
  const [isValid, setIsValid] = React.useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value)

  const clear = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault()
    }
    setSearchQuery("")
    const newSearchParams = removeSearchParam(currSearchParams, "searchQuery")
    router.push(`?${newSearchParams.toString()}`)
  }

  const search = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isValid) {
      const newSearchParams = addSearchParam(currSearchParams, {
        key: "searchQuery",
        value: slug(searchQuery),
      })

      router.push(`?${newSearchParams}`)
    }
  }

  useEffect(() => {
    if (/\S/.test(searchQuery) && searchQuery.length > 2) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [searchQuery])

  return { handleChange, search, isValid, searchQuery, clear }
}
