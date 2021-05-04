const express = require('express');
const app = express();
const { userRouter } = require('./routes/userRoutes');
const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://admin:6GTWpNcZI7I5Zoi3@mongodbtutorial.qpzn6.mongodb.net/BlogService?retryWrites=true&w=majority';

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Mongodb Connected');
    app.use(express.json());
    app.use('/user', userRouter);

    app.listen(3000, () => console.log('server listeing on port 3000'));
  } catch (err) {
    console.log(err);
  }
};

server();
