import PostById from "@/components/post/post-by-id";
import { getArticleByID } from "@/lib/mongo/actions";
import { genPageMetadata } from "@/lib/og/open-graph-data";
import type { TPublicationPage } from "@/types/types";

export const generateMetadata = genPageMetadata("articles");

const ArticlePage: TPublicationPage = async ({ params: { id } }) => {
    const program = await getArticleByID(id);
    return <PostById publication={program} />;
};

export default ArticlePage;
