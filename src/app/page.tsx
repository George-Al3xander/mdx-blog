import HeroSection from "@/components/sections/hero/hero-section"
import dynamic from "next/dynamic"
import { Spinner } from "@/ui/spinner"
import React from "react"
//import LatestPosts from "@/components/sections/latest posts/latest-posts"

const LatestPosts = dynamic(
  () => import("@/components/sections/latest posts/latest-posts"),
  { loading: () => <Spinner size="large">Loading...</Spinner> },
)

export default function Home() {
  return (
    <section className="pb-10">
      <HeroSection />
      <div className={"mx-auto w-responsive"}>
        <LatestPosts />
      </div>
    </section>
  )
}
