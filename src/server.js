const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User } = require('./models/User');

const MONGO_URI =
  'mongodb+srv://admin:6GTWpNcZI7I5Zoi3@mongodbtutorial.qpzn6.mongodb.net/BlogService?retryWrites=true&w=majority';

const server = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongodb Connected');
    app.use(express.json());

    app.get('/user', async (req, res) => {
      try {
        const users = await User.find({});
        return res.send({ users });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    app.post('/user', async (req, res) => {
      try {
        let { username, name } = req.body;
        if (!username)
          return res.status(400).send({ err: 'username is required' });
        if (!name || !name.first || !name.last)
          return res
            .status(400)
            .send({ err: 'Both first and last names are required' });

        const user = new User(req.body);
        await user.save();
        return res.send({ user });
      } catch (err) {
        console.log(err);
        return res.status(500).send({ err: err.message });
      }
    });

    app.listen(3000, () => console.log('server listeing on port 3000'));
  } catch (err) {
    console.log(err);
  }
};

server();
