require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFound = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handle');

// middleware
app.use(express.json());

// route
app.get('/', (req, res) => {
  res.send('store api');
});

app.use('/api/v1/products', productsRouter);

// products route

app.use(notFound);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const url = process.env.MONGO_URL;

const start = async () => {
  try {
    await connectDB(url);
    app.listen(port, console.log(`Server listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
