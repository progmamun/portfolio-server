const { ObjectId } = require('mongodb');

exports.allProductsController = async (req, res) => {
  const query = {};
  const cursor = worksCollection.find(query);
  const projects = await cursor.toArray();
  res.send(projects);
};

exports.singleProductController = async (req, res) => {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const projects = await worksCollection.findOne(query);
  res.send(projects);
};
