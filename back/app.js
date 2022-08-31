const express = require('express');
const { json } = require('body-parser');
require('dotenv').config({ path: 'config/.env' });
const cors = require('cors');
const helmet = require('helmet');
const { join } = require('path');

require('./config/db');

const app = express();
app.use(json());
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site"}
}))

app.set('/images', (join(__dirname, 'images')));

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes)

const postRoutes = require('./routes/post');

app.use('/api/posts', postRoutes);

module.exports = app;