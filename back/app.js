const express = require('express');
require('dotenv').config({ path: 'config/.env' });
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

require('./config/db');

const app = express();

app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site"}
}))
app.use(express.json());
app.use(cors());

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes)

const postRoutes = require('./routes/post');
app.use('/api/posts', postRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));






module.exports = app;