import { Markdown } from "@/components/markdown";
import PostHeader from "@/components/post/post-header";
import TagsList from "@/components/tags/tags-list";
import { TPost } from "@/types/types";
import { notFound } from "next/navigation";

function PostById<T extends TPost>({ publication }: { publication: T | null }) {
    if (!publication) notFound();
    const { content, tags } = publication;

    return (
        <section className="prose mx-auto w-responsive py-10 dark:prose-invert">
            <PostHeader post={publication} />
            <hr className="h-4" />
            <article>
                <Markdown>{content}</Markdown>
            </article>
            <hr className="h-4" />

            <div className="prose-ul:p-0">
                <h4>Tags: </h4>
                <TagsList tags={tags} />
            </div>
        </section>
    );
}

export default PostById;
