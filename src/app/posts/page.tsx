import PostsWithPagination from "@/components/post/posts-with-pagination";

import withPaginationBoundariesProtection from "@/components/with-pagination-boundaries-protection";
import { websiteName } from "@/data";
import { getPublications, getPublicationsCount } from "@/lib/mongo/actions";
import { pagesMetaData } from "@/lib/og/open-graph-data";
import { TMainPage } from "@/types/types";
import { Metadata } from "next";

export const revalidate = 86400;

export const metadata: Metadata = {
    title: `${pagesMetaData.all.title} | ${websiteName}`,
    description: pagesMetaData.all.description,
};

const MainPage: TMainPage = async ({ page, sortBy, searchQuery }) => {
    const posts = await getPublications({ page, searchQuery, sortBy });
    const allPublicationsCount = await getPublicationsCount();
    return (
        <PostsWithPagination
            paginationOpts={{
                page,
                totalCount: allPublicationsCount,
            }}
            posts={posts}
        />
    );
};

export default withPaginationBoundariesProtection(MainPage, "all");
