"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearch } from "@/hooks/useSearch"
import { X } from "lucide-react"

function SearchInput() {
  //console.log(currSearchQuery)
  const { search, isValid, searchQuery, handleChange, clear } = useSearch()
  return (
    <form
      onSubmit={search}
      className="flex w-full max-w-sm items-center space-x-2"
    >
      <Input
        defaultValue={searchQuery}
        value={searchQuery}
        onChange={handleChange}
        className="bg-gray-900"
        type="text"
        placeholder="Search articles..."
      />
      <Button disabled={!isValid} type="submit">
        Search
      </Button>
      <Button onClick={clear} variant="destructive" size="icon">
        <X className="h-4 w-4" />
      </Button>
    </form>
  )
}

export default SearchInput
