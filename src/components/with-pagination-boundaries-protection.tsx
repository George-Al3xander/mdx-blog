import { dbItemsCountFunctionMap, PER_PAGE } from "@/data";
import { changePageParam, destructMainPagesProps } from "@/lib/utils";
import {
    TMainPageProps,
    TMainPageWrapperProps,
    TPostVariant,
} from "@/types/types";
import { redirect } from "next/navigation";
import { ComponentType, FC } from "react";

const withPaginationBoundariesProtection = (
    Component: ComponentType<TMainPageProps>,
    itemsType: TPostVariant | "all",
): FC<TMainPageWrapperProps> => {
    const Wrapper: FC<TMainPageWrapperProps> = async (props) => {
        const fullProps = destructMainPagesProps(props);
        const { page = "1" } = fullProps;
        const count = await dbItemsCountFunctionMap.get(itemsType)!();
        const pagesCount = Math.ceil(count / PER_PAGE);

        let searchParams: string | null = null;
        const currentPageNumber = Number(page);
        if (
            currentPageNumber > pagesCount ||
            currentPageNumber < 1 ||
            !currentPageNumber
        ) {
            searchParams = changePageParam(
                fullProps,
                currentPageNumber < 1 ? 1 : pagesCount,
            );
        }

        if (searchParams) {
            return redirect(`?${searchParams}`);
        }
        return (
            <Component
                {...fullProps}
                itemsCount={count}
                pagesCount={pagesCount}
                page={Number(page)}
            />
        );
    };

    return Wrapper;
};

export default withPaginationBoundariesProtection;
