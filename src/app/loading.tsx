import React from "react"
import { Spinner } from "@/ui/spinner"

const Loading = () => {
  return (
    <section className="mx-auto flex h-[80vh] w-responsive items-center gap-3 py-10">
      <div className="w-full">
        <Spinner size="large">Loading...</Spinner>
      </div>
    </section>
  )
}

export default Loading
