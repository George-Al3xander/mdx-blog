import { Model, Document, PipelineStage } from "mongoose"
import { PER_PAGE } from "@/data"
import { ConnectToMongo } from "@/mylib/mongo/utils"

type SortFilter = {
  [key: string]: "asc" | "desc"
}

export class MongoService<T extends Document> {
  mongoModel: Model<T>

  constructor(model: Model<T>) {
    this.mongoModel = model
  }

  @ConnectToMongo()
  findById(id: string): Promise<T | null> {
    return this.mongoModel.findById(id)
  }

  @ConnectToMongo()
  async findAll(
    page: string | number,
    searchQuery?: string | undefined,
    sortFilter: SortFilter | undefined = { date: "desc" },
  ): Promise<T[]> {
    page = typeof page == "number" ? page : Number(page)
    page = Math.floor(page)
    const perPage = PER_PAGE
    const skip = (page - 1) * perPage

    try {
      if (searchQuery) {
        await this.mongoModel.createIndexes()
        return await this.mongoModel.find({
          $text: { $search: searchQuery, $caseSensitive: false },
        })
        // .skip(skip)
        // .limit(perPage)
      }
      return this.mongoModel.find().sort(sortFilter).limit(perPage).skip(skip)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  @ConnectToMongo()
  getCount(): Promise<number> {
    return this.mongoModel.countDocuments()
  }

  @ConnectToMongo()
  async combineCollections(
    source: string,
    target: string | string[],
    page: string | number,
    searchQuery?: string | undefined,
  ): Promise<any[]> {
    page = typeof page == "number" ? page : Number(page)
    page = Math.floor(page)
    const perPage = PER_PAGE
    const skip = (page - 1) * perPage
    let unionWith: PipelineStage[] = []

    if (typeof target === "string") {
      unionWith.push({
        $unionWith: {
          coll: target,
          pipeline: [{ $match: {} }, { $addFields: { source: target } }],
        },
      })
    } else {
      target.forEach((target_item: string) =>
        unionWith.push({
          $unionWith: {
            coll: target_item,
            pipeline: [{ $match: {} }, { $addFields: { source: target_item } }],
          },
        }),
      )
    }
    //@ts-ignore
    const pipeline: PipelineStage[] = unionWith.concat([
      {
        $addFields: { source },
      },
      { $sort: { date: -1 } },
      { $skip: skip },
      { $limit: perPage },
    ])
    try {
      const results = await this.mongoModel.aggregate(pipeline)
      return results
    } catch (err) {
      console.error("Error fetching combined documents:", err)
      return []
    }
  }
}
