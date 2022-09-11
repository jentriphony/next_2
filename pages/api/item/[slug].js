import {MongoClient, ObjectId} from 'mongodb'
const handler = async (req, res) => {
  if(req.method === 'get' || req.method === 'GET') {
    const mongo = await MongoClient.connect('mongodb+srv://<username>:<password>@p7dbvdjaxse6yrim3-hceff.l2ohbwk.mongodb.net/?retryWrites=true&w=majority')
    const list = mongo.db('test').collection('list')
    const result = await list.findOne({_id: new ObjectId(req.query.slug)})
    mongo.close()
    res.status(201).json(result)
  }
}
export default handler