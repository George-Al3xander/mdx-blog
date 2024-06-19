"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { useSearch } from "@/hooks/useSearch"
import { Search, X } from "lucide-react"

function SearchInput() {
  const { search, isValid, searchQuery, handleChange, clear } = useSearch()
  return (
    <form
      onSubmit={search}
      className="flex w-full items-center overflow-hidden rounded-lg border-2 border-black bg-white dark:border-white dark:bg-black"
    >
      <fieldset className="flex w-full items-center gap-2 p-2">
        <label htmlFor="search-input">
          <Search />
        </label>
        <input
          onChange={handleChange}
          value={searchQuery}
          placeholder="Search for anything...!"
          className="w-[10px] basis-[100%] bg-white outline-none dark:bg-black"
          id="search-input"
          type="text"
        />
        <Button
          aria-label="Clear search input"
          type="reset"
          size="sm"
          variant="ghost"
          onClick={clear}
        >
          <X />
        </Button>
      </fieldset>
      <Button
        className="m-0 h-[52px] rounded-none"
        disabled={!isValid}
        type="submit"
      >
        Search
      </Button>
    </form>
  )
}

export default SearchInput
