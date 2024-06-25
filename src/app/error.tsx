"use client"
import React from "react"
import { Button } from "@/ui/button"
import Link from "next/link"
import { Frown } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <section className="mx-auto flex min-h-[80vh] w-responsive flex-col gap-4 py-10 text-center">
      <Frown className="mx-auto h-20 w-20 sm:h-40 sm:w-40" />
      <h2 className="text-2xl">Something went wrong.</h2>
      <p className="opacity-60">
        Sorry, something went wrong there. Try again or navigate to home page.
      </p>
      {error && <p className="text-sm opacity-40">{error.message}</p>}
      <ul className="mx-auto flex flex-wrap justify-center gap-4">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </ul>
    </section>
  )
}
