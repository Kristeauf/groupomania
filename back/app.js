const express = require('express')
const app = express();
// const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const path = require('path');
const bodyParser = require('body-Parser');
const dataBase =require('./mysqlconfig')
require('dotenv').config();
const helmet = require('helmet');


app.use(helmet({ crossOriginResourcePolicy: false, }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// app.use('/api/posts', postRoutes);

app.use('/api/auth', userRoutes);
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app