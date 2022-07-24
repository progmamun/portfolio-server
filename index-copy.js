const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(require('./routes'));

run().catch(console.dir);

// 404 error handler
app.use((req, res, next) => {
  next('Requested url was not found!');
});

app.use((err, req, res, next) => {
  if (res.headersSend) {
    next('There was a problem!');
  } else {
    if (err.message) {
      res.status(500).send(err.message);
    } else {
      res.send('There was an error!');
    }
  }
});

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV}`));
