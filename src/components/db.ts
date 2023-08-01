import { MongoClient} from 'mongodb'

// const client = new MongoClient('mongodb://160.16.207.35:27017/test')
const client = new MongoClient('mongodb://127.0.0.1:27017/test')
const clientPromise = client.connect()
export default clientPromise