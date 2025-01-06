import PostById from "@/components/post/post-by-id";
import { getProgramByID } from "@/lib/mongo/actions";
import { genPageMetadata } from "@/lib/og/open-graph-data";
import type { TPublicationPage } from "@/types/types";

export const generateMetadata = genPageMetadata("programs");

const ProgramPage: TPublicationPage = async ({ params: { id } }) => {
    const program = await getProgramByID(id);
    return <PostById publication={program} />;
};

export default ProgramPage;
