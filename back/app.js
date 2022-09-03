const express = require('express');
const { json } = require('body-parser');
require('dotenv').config({ path: 'config/.env' });
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

require('./config/db');

const app = express();
app.use(json());

app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site"}
}))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
  });
app.use(cors());

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes)

const postRoutes = require('./routes/post');

app.use('/api/posts', postRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;