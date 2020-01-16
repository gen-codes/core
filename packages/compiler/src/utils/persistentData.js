const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
import {Validator} from "jsonschema";
import {getId} from "../mergeCodeUtils";
/*
**Usage:
const db = new Data(../db.json")
const Partial = db.createCollection("partial", partialSchema)
const partialSchema = {
  type: "object",
  properties: {
    id: {
      type: "string"
    },
    data: {
      type: "object"
    },
    code: {
      type: "string"
    },
    template: {
      type: "string"
    }
  }
}
const newPrat = Partial({
  code: "sdsd",
  data: {},
  template: "{{dsd}}"
})
console.log("newPrat")
const oldPrat = Partial(newPrat.id)
console.log("oldPrat")
oldPrat.data = {some: "Data"}
console.log("oldPratChanges")
// console.log(oldPrat)
const queried = Partial().find({code: "sdsd"})
console.log("queried",queried)
const second = queried[1]
second.data = {...second.data, new: "233"}
const newData = second.data
newData.time = 23
second.data = newData
**
*/

export function ProxyObject(item, validate){
  const itemValue = item.value()
  if(!itemValue) {
    return null
  }
  return new Proxy(itemValue, {
    get: (obj, prop) => {
      let value = item.get(prop).value()
      return value

    },
    set: (obj, prop, value) => {

      obj[prop] = value
      if(validate){
        const validation = validate(obj)
        if(validation.errors && validation.errors.length) {
          throw validation.errors.map(v => v.stack).join("\n")
        }
      }
      item.set(prop, value).write()
      return true
    }
  })
}


export default class Data {
  constructor(file) {
    const adapter = new FileSync(file)
    this.db = low(adapter)

  }
  collection = (type, schema, initialData = []) => {
    let validate = () => {return true}
    if(schema) {
      validate = (data) => new Validator().validate(data, schema)
      this.db.set(`schema.${type}`, schema).write()
    }
    if(!this.db.has(type).value()) {
      this.db.set(type, initialData).write()
    }

    const itemDb = this.db.get(type)
    function dataType(data) {
      if(!data) {
        return {
          find: function(query) {

            const results =  itemDb.filter(query).value()

            console.log("res", results.map)
            return results.map(itemValue => {
              const item = itemDb.find({id: itemValue.id})
              return ProxyObject(item, validate)
            })
          },
          findOne: function(query) {
            const result =  itemDb.find(query)
            return ProxyObject(result, validate)
          },
          findOneOrCreate: function(query) {
            const result =  itemDb.find(query)
            if(!result.value()){
              return dataType(query)
            }
            return ProxyObject(result, validate)
          }
        }
      }
      let id
      let item
      if(typeof (data) === "string") {
        console.log("data is string", data)
        id = data
        item = itemDb.find({id: id})
      } else if(typeof (data) === "object" && !data.id) {
        console.log("data is new object")
        id = getId()
        data.id = id
        validate(data)
        itemDb.push(data).write()
        item = itemDb.find({id: id})
      } else {
        console.log("data is old object", id)
        id = data.id
        item = itemDb.find({id: id})
        item.assign(data).write()
      }

      return ProxyObject(item, validate)
    }
    return dataType
  }
}



