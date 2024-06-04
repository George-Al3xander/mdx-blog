import HeroSection from "@/components/sections/hero/hero-section"
import LatestPosts from "@/components/sections/latest posts/latest-posts"
import Image from "next/image"

export default function Home() {
  return (
    <section className="w-responsive mx-auto pb-10">
      <HeroSection />
      <LatestPosts />
    </section>
  )
}
