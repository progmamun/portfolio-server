const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(require('./routes'));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@portfolio.cjd9a.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const worksCollection = client.db('portfolio').collection('works');
    const projects = await worksCollection.find({}).toArray();
    // console.log(projects);
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Mamun portfolio!');
});

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV}`));
