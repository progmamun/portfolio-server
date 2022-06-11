const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const PORT = process.env.PORT || 5000;


const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@portfolio.cjd9a.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    await client.connect();
    const worksCollection = client.db('portfolio').collection('works');
    const projects = await worksCollection.find({}).toArray();
    // console.log(projects);

    // get all projects
    app.get('/api/projects', async (req, res) => {
      const query = {};
      const cursor = worksCollection.find(query);
      const projects = await cursor.toArray();
      res.send(projects);
    });
    // get single projects
    app.get('/api/project/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const projects = await worksCollection.findOne(query);
      res.send(projects);
    });
  } finally{

  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Mamun portfolio!');
});

app.listen(PORT,
  console.log(`Server running in ${process.env.NODE_ENV}`)
)