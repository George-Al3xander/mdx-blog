import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, useEffect, useState, MouseEvent } from "react"
import { slug } from "github-slugger"
import { addSearchParam, removeSearchParam } from "@/lib/utils"

export const useSearch = () => {
  const router = useRouter()
  const currSearchParams = useSearchParams()
  const currSearchQuery = (
    currSearchParams.get("searchQuery") || ""
  ).replaceAll("-", " ")
  const [searchQuery, setSearchQuery] = useState<string>(currSearchQuery)
  const [isValid, setIsValid] = useState(false)
  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setSearchQuery(event.target.value)

  const clear = (e?: MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault()
    }
    setSearchQuery("")
    const newSearchParams = removeSearchParam(currSearchParams, "searchQuery")
    router.push(`?${newSearchParams.toString()}`)
  }

  const search = (e: ChangeEvent<HTMLFormElement>) => {
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
