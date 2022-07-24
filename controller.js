const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@portfolio.cjd9a.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect();

const worksCollection = client.db('portfolio').collection('works');
const projects = worksCollection.find({}).toArray();

exports.homeController = (req, res) => {
  res.send('Hello Mamun portfolio!');
};

exports.allProductsController = (req, res) => {
  const query = {};
  const cursor = worksCollection.find(query);
  const projects = cursor.toArray();
  res.send(projects);
};

exports.singleProductController = (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const projects = worksCollection.findOne(query);
  res.send(projects);
};
