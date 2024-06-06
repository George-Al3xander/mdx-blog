import mongoose, { ConnectOptions,Model, Document  } from "mongoose"

type SortFilter = {
  [key: string]: "asc" | "desc"
}

const uri = process.env.MONGO_URI!

const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
}

function ConnectToMongo() {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const { value } = descriptor
    descriptor.value = async function (...args: any[]) {
      if (mongoose.connection.readyState == 0) {
        try {
          await mongoose.connect(uri, clientOptions)
          await mongoose.connection.db.admin().command({ ping: 1 })
          console.log("You successfully connected to MongoDB!")
        } catch (error) {
          console.error("Error connecting to MongoDB:", error)
          return
        }
      }
      const out = await value.apply(this, args)
      return out
    }
  }
}

export class MongoService<T extends Document> {
  mongoModel: Model<T>

  constructor(model: Model<T>) {
    this.mongoModel = model
  }

  @ConnectToMongo()
  async findById(id: string): Promise<T | null> {
    return await this.mongoModel.findById(id)
  }

  @ConnectToMongo()
  async findAll(
    page: string | number,
    sortFilter: SortFilter | undefined = { date: "desc" },
  ): Promise<T[]> {
    page = typeof page == "number" ? page : Number(page)
    page = Math.floor(page)
    const perPage = 5
    const skip = (page - 1) * perPage

    try {
      return this.mongoModel.find().sort(sortFilter).limit(perPage).skip(skip)
    } catch (error) {
      console.log(error)
      return []
    }
  }

  @ConnectToMongo()
  async getCount(): Promise<number> {
    const count = await this.mongoModel.countDocuments()
    return count
  }
}
