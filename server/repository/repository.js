import { MongoClient } from 'mongodb'

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || (DB_HOST === 'localhost' ? 27017 : '')
const DB_USERNAME = process.env.DB_USERNAME || 'test'
const DB_PASSWORD = process.env.DB_PASSWORD || 'test'
const DB_DEFAULT_AUTH_DB = process.env.DB_DEFAULT_AUTH_DB || ''
const DB_OPTIONS = process.env.DB_OPTIONS || ''
const DB_DBNAME = process.env.DB_DBNAME || 'test'
const DB_COLLECTION = process.env.DB_COLLECTION || 'test'

class Repository {
  static async open () {
    if (this.db) {
      return this.db
    }
    const db = await MongoClient.connect(this.url, this.options)
    this.db = await db.db(DB_DBNAME).collection(DB_COLLECTION)
    return this.db
  }
}

Repository.db = null
Repository.url = (() => {
  const auth = `${DB_USERNAME}${DB_PASSWORD ? `:${DB_PASSWORD}` : ''}`
  const hostname = `${DB_HOST}${DB_PORT ? `:${DB_PORT}` : ''}`
  const authDB = DB_DEFAULT_AUTH_DB ? `/${DB_DEFAULT_AUTH_DB}` : ''
  const options = DB_OPTIONS ? `/${DB_OPTIONS}` : ''
  const uri = `mongodb://${auth}@${hostname}${authDB}${options}`
  //   const uri = `mongodb+srv://${auth}@${hostname}${authDB}${options}`
  console.log('DB URI:', uri)
  return uri
})()

Repository.options = {
//   bufferMaxEntries: 0,
//   reconnectTries: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export default Repository
