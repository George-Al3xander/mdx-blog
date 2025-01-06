import { Fragment } from "react";

import PostsPagination from "@/components/post/posts-pagination";
import PostCard from "@/components/sections/latest posts/post-card";
import { TPost } from "@/types/types";

const PostsWithPagination = ({
    posts,
    paginationOpts,
}: {
    posts: TPost[];
    paginationOpts: {
        page: string | number;
        totalCount: number;
    };
}) => {
    if (!posts || posts.length == 0) {
        return <p className="mt-10 text-center">Nothing to see here yet.</p>;
    }
    return (
        <>
            <ul className="grid gap-10 md:grid-cols-2">
                {posts.map((post) => (
                    <Fragment key={post._id + "-fragment"}>
                        <PostCard key={post._id} post={post} />
                        <hr key={post._id + "hr"} className="h-4 md:hidden" />
                    </Fragment>
                ))}
            </ul>
            <PostsPagination {...paginationOpts} />
        </>
    );
};

export default PostsWithPagination;
