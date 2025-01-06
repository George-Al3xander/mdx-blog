import PostsWithPagination from "@/components/post/posts-with-pagination";
import withPaginationBoundariesProtection from "@/components/with-pagination-boundaries-protection";
import { websiteName } from "@/data";
import { getPrograms } from "@/lib/mongo/actions";
import { pagesMetaData } from "@/lib/og/open-graph-data";
import { TMainPage } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: `${pagesMetaData.programs.title} | ${websiteName}`,
    description: pagesMetaData.programs.description,
};

const ProgramsPage: TMainPage = async (props) => {
    const posts = await getPrograms(props);
    return (
        <PostsWithPagination
            posts={posts}
            paginationOpts={{
                page: props.page,
                totalCount: props.itemsCount,
            }}
        />
    );
};

export default withPaginationBoundariesProtection(ProgramsPage, "programs");
