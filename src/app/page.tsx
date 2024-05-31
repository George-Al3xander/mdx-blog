import HeroSection from "@/components/sections/hero/hero-section"
import LatestPosts from "@/components/sections/latest posts/latest-posts"
import Image from "next/image"

export default function Home() {
  return (
    <div className="w-[min(40rem,90%)] mx-auto">
      <HeroSection />
      <LatestPosts />
    </div>
  )
}
