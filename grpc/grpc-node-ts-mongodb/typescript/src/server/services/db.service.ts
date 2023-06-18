import * as mongo from 'mongodb'

// global collection
export const collections: { users? : mongo.Collection} = {}

export async function databaseConnection () {
  const client : mongo.MongoClient = new mongo.MongoClient(
    "mongodb://root:root@localhost:27017/?authMechanism=DEFAULT"
  )

  const db : mongo.Db = client.db("grpc")

  //database collection
  const userCollection : mongo.Collection = db.collection('user')  
  collections.users = userCollection

  console.log("Succes connection to database")
}
