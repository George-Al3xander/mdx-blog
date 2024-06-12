import React from "react"
import {
  getPostsProgramsCount,
  getPostsWithPrograms,
} from "@/mylib/mongo/actions"
import { PageParamsProps } from "@/types/types"

async function AllPage({
  searchParams = { page: "1", searchQuery: "" },
}: PageParamsProps) {
  // const posts = await getPostsWithPrograms(1)
  // console.log(posts)
  const count = await getPostsProgramsCount()
  console.log(count)
  return <section>All posts here!</section>
}

export default AllPage
