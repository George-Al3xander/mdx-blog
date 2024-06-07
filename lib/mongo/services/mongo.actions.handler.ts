import { Model } from "mongoose"
import { MongoService } from "./mongo.service"

export class MongoActionsHandler {
  models: { [key: string]: Model<any> }

  constructor(models: { [key: string]: Model<any> }) {
    this.models = models
  }

  async init() {
    let res = {}

    for (const [key, model] of Object.entries(this.models)) {
      const modelService = new MongoService(model)
      const capitalized = `${key[0].toUpperCase()}${key.substring(1)}`
      const methods: { [key: string]: Function } = Object.fromEntries(
        new Map([
          [`get${capitalized}s`, modelService.findAll],
          [`get${capitalized}Count`, modelService.getCount],
          [`get${capitalized}ById`, modelService.findById],
        ]),
      )
      Object.assign(methods, res)
    }

    return res
  }
}
