import HeroSection from "@/components/sections/hero/hero-section";
import { websiteDescription, websiteName } from "@/data";
import { Spinner } from "@/ui/spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: `Home | ${websiteName}`,
    description: websiteDescription,
};

const LatestPosts = dynamic(
    () => import("@/components/sections/latest posts/latest-posts"),
    { loading: () => <Spinner size="large">Loading...</Spinner> },
);

export default function Home() {
    return (
        <section className="pb-10">
            <HeroSection />
            <div className={"mx-auto w-responsive"}>
                <LatestPosts />
            </div>
        </section>
    );
}
