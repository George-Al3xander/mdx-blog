import { ButtonProps } from "@/components/ui/button";
import { Document } from "mongoose";
import { FC } from "react";

export type ThemeVariant = "light" | "dark" | "system";

export type HeroData = {
    title: string;
    description: string;
    subtitle?: string;
    buttons: ButtonProps[];
};

export type SortFilter = {
    [key: string]: "asc" | "desc";
};

export type TPost = Document & {
    _id: string;
    title: string;
    description: string;
    content: string;
    date: string;
    tags: string[];
    author: string;
    originalSource?: {
        title: string;
        href: string;
    };
};

export type TProgram = TPost & {
    type: "strength" | "hypertrophy" | "mixed";
    file?: string;
};

export type TPostVariant = "articles" | "programs";

export type TPaginationSolidBase = {
    page: string | number;
    searchQuery?: string | undefined;
    sortBy?: string | undefined;
};

export type TMainPageWrapperProps = {
    params: {
        slug?: string[];
    };
    searchParams?:
        | {
              page?: string | undefined;
              searchQuery?: string | undefined;
              sortBy?: string | undefined;
          }
        | undefined;
};
export type TMainPageProps = {
    searchQuery?: string;
    sortBy?: string;
    page: number;
    itemsCount: number;
    pagesCount: number;
};

export type TMainPage = FC<TMainPageProps>;

export type TPublicationPageProps = {
    params: {
        id: string;
    };
};

export type TPublicationPage = FC<TPublicationPageProps>;
