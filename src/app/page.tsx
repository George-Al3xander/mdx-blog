import HeroSection from "@/components/sections/hero/hero-section"
import LatestPosts from "@/components/sections/latest posts/latest-posts"

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
