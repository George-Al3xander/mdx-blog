import mongoose, { ConnectOptions } from "mongoose"

const uri = process.env.MONGO_URI!

const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: false, deprecationErrors: true },
}

export function ConnectToMongo() {
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
