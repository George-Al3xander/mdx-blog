import { Document, Model, PipelineStage } from "mongoose"
import { ConnectToMongo } from "@/mylib/mongo/utils"
import { PER_PAGE } from "@/data"
import { getPosts } from "@/mylib/mongo/actions"
import { searchParamToSortFilter } from "@/mylib/utils"

export class MongoComboService<T extends Document> {
  mongoModel: Model<T>
  source: string
  target: string | string[]
  docTypeUnionWith: PipelineStage[] = []
  countTypeUnionWith: PipelineStage[] = []
  constructor(model: Model<T>, source: string, target: string | string[]) {
    this.mongoModel = model
    this.source = source
    this.target = target

    if (typeof target === "string") {
      const union = {
        $unionWith: {
          coll: target,
          pipeline: [{ $match: {} }],
        },
      }
      this.countTypeUnionWith.push(union)
      union.$unionWith.pipeline = [
        ...union.$unionWith.pipeline,
        //@ts-ignores
        { $addFields: { source: target } },
      ]
      this.docTypeUnionWith.push(union)
    } else {
      target.forEach((target_item: string) => {
        const union = {
          $unionWith: {
            coll: target_item,
            pipeline: [{ $match: {} }],
          },
        }
        this.countTypeUnionWith.push(union)
        union.$unionWith.pipeline = [
          ...union.$unionWith.pipeline,
          //@ts-ignores
          { $addFields: { source: target_item } },
        ]
        this.docTypeUnionWith.push(union)
      })
    }
  }
  @ConnectToMongo()
  async getCollections(
    page: string | number,
    searchQuery?: string | undefined,
    sortParam: string | undefined = "date-desc",
  ): Promise<any[]> {
    page = typeof page == "number" ? page : Number(page)
    page = Math.floor(page)
    const perPage = PER_PAGE
    const skip = (page - 1) * perPage
    const sortFilter = searchParamToSortFilter(sortParam, "numeric")

    const pipeline: PipelineStage[] = this.docTypeUnionWith.concat([
      {
        $addFields: { source: this.source },
      },
      { $sort: sortFilter as any },
      { $skip: skip },
      { $limit: perPage },
    ])
    try {
      if (searchQuery) {
        const articles = await getPosts(
          "articles",
          page,
          searchQuery,
          sortParam,
        )
        const programs = await getPosts(
          "programs",
          page,
          searchQuery,
          sortParam,
        )

        return [...articles, ...programs].sort((a, b) => {
          const sortOrder = Object.values(sortFilter)[0]

          if (a.date < b.date) {
            return -1 * sortOrder
          }
          if (a.date > b.date) {
            return 1 * sortOrder
          }
          return 0
        })
      } else {
        return await this.mongoModel.aggregate(pipeline)
      }
    } catch (err) {
      console.error("Error fetching combined documents:", err)
      return []
    }
  }

  @ConnectToMongo()
  async getCount(): Promise<number> {
    const pipeline: PipelineStage[] = this.docTypeUnionWith.concat([
      {
        $count: "totalCount",
      },
    ])
    try {
      const results = await this.mongoModel.aggregate(pipeline)
      return results[0] ? results[0].totalCount : 0
    } catch (err) {
      console.error("Error fetching combined documents:", err)
      return 0
    }
  }
}
