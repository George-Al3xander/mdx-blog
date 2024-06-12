"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/hooks/useSearch"
import { Search, X } from "lucide-react"

function SearchInput() {
  //console.log(currSearchQuery)
  const { search, isValid, searchQuery, handleChange, clear } = useSearch()
  return (
    <form onSubmit={search} className="w-full">
      <fieldset className="flex w-full items-center gap-2 rounded-lg border-2 border-black bg-white p-2 dark:border-white dark:bg-black">
        <label htmlFor="search-input">
          <Search />
        </label>
        <input
          onChange={handleChange}
          value={searchQuery}
          placeholder="Search for anyting...!"
          className="w-[10px] basis-[100%] bg-white outline-none dark:bg-black"
          id="search-input"
          type="text"
        />
        <Button type="reset" size="sm" onClick={clear}>
          <X />
        </Button>
      </fieldset>
    </form>
  )
}

export default SearchInput
