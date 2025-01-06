import { Post, Program } from "@/lib/mongo";
import { getArticles, getPrograms } from "@/lib/mongo/actions";
import { ConnectToMongo } from "@/lib/mongo/utils";
import { searchParamToSortFilter } from "@/lib/utils";
import type { TPaginationSolidBase, TPostVariant } from "@/types/types";
import { Model, PipelineStage } from "mongoose";

interface IMongoComboService<T> {
    mainModel: Model<T>;
    getItems(obj: TPaginationSolidBase): Promise<T[]>;
    getCount(): Promise<number>;
}

const getSchema = <T>(key: TPostVariant): T => {
    const dbSchemasMap = new Map<TPostVariant, Model<T>>([
        ["articles", Post],
        ["programs", Program],
    ]);

    return dbSchemasMap!.get(key) as T;
};

export class MongoComboService<T> implements IMongoComboService<T> {
    mainModel: Model<T>;
    source: TPostVariant;
    target: TPostVariant | TPostVariant[];
    docTypeUnionWith: PipelineStage[] = [];
    constructor({
        source,
        target,
    }: {
        source: TPostVariant;
        target: TPostVariant | TPostVariant[];
    }) {
        this.mainModel = getSchema(source);

        this.source = source;
        this.target = target;

        if (typeof target === "string") {
            const union = {
                $unionWith: {
                    coll: target,
                    pipeline: [{ $match: {} }],
                },
            };
            union.$unionWith.pipeline = [
                ...union.$unionWith.pipeline,
                //@ts-ignores
                { $addFields: { source: target } },
            ];
            this.docTypeUnionWith.push(union);
        } else {
            target.forEach((target_item: string) => {
                const union = {
                    $unionWith: {
                        coll: target_item,
                        pipeline: [{ $match: {} }],
                    },
                };
                union.$unionWith.pipeline = [
                    ...union.$unionWith.pipeline,
                    //@ts-ignores
                    { $addFields: { source: target_item } },
                ];
                this.docTypeUnionWith.push(union);
            });
        }
    }
    @ConnectToMongo()
    async getItems({
        page,
        searchQuery,
        sortBy = "date-desc",
    }: TPaginationSolidBase): Promise<any[]> {
        page = typeof page == "number" ? page : Number(page);
        page = Math.floor(page);
        const sortFilter = searchParamToSortFilter(sortBy, "numeric");

        try {
            const articles = await getArticles({
                page,
                searchQuery,
                sortBy,
            });
            const programs = await getPrograms({
                page,
                searchQuery,
                sortBy,
            });

            return [...articles, ...programs].sort((a, b) => {
                const sortOrder = Object.values(sortFilter)[0];

                if (a.date < b.date) {
                    return -1 * sortOrder;
                }
                if (a.date > b.date) {
                    return 1 * sortOrder;
                }
                return 0;
            });
        } catch (err) {
            console.error("Error fetching combined documents:", err);
            return [];
        }
    }

    @ConnectToMongo()
    async getCount(): Promise<number> {
        const pipeline: PipelineStage[] = this.docTypeUnionWith.concat([
            {
                $count: "totalCount",
            },
        ]);
        try {
            const results = await this.mainModel.aggregate(pipeline);
            return results[0] ? results[0].totalCount : 0;
        } catch (err) {
            console.error("Error fetching combined documents:", err);
            return 0;
        }
    }
}
