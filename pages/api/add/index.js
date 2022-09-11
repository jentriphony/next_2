import {MongoClient} from 'mongodb'
const handler = async (req, res) => {
  if(req.method === 'post' || req.method === 'POST') {
    const mongo = await MongoClient.connect('mongodb+srv://<username>:<password>@p7dbvdjaxse6yrim3-hceff.l2ohbwk.mongodb.net/?retryWrites=true&w=majority')
    const list = mongo.db('test').collection('list')
    await list.insertOne({title: req.body.title, image: req.body.image, address: req.body.address, description: req.body.description})
    mongo.close()
    res.status(201).json({title: req.body.title, image: req.body.image, address: req.body.address, description: req.body.description})
  }
}
export default handler
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://jbCbHJhukhEdWX7josq8L7S76a4VnLit:<password>@p7dbvdjaxse6yrim3-hceff.l2ohbwk.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });