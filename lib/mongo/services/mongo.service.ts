import { Model, Document } from "mongoose"
import { PER_PAGE } from "@/data"
import { ConnectToMongo } from "@/lib/mongo/utils"
import { searchParamToSortFilter } from "@/lib/utils"

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
    sortParam: string | undefined = "date-desc",
  ): Promise<T[]> {
    page = typeof page == "number" ? page : Number(page)
    page = Math.floor(page)
    const perPage = PER_PAGE
    const skip = (page - 1) * perPage
    const sortFilter = searchParamToSortFilter(sortParam) as any
    try {
      if (searchQuery) {
        await this.mongoModel.createIndexes()
        return await this.mongoModel
          .find({
            $text: { $search: searchQuery, $caseSensitive: false },
          })
          .skip(skip)
          .limit(perPage)
      }
      return this.mongoModel.find().sort(sortFilter).limit(perPage).skip(skip)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  @ConnectToMongo()
  getCount(searchQuery?: string): Promise<number> {
    if (searchQuery) {
      return this.mongoModel.countDocuments({
        $text: { $search: searchQuery, $caseSensitive: false },
      })
    }
    return this.mongoModel.countDocuments()
  }
}
