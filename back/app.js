const express = require('express');
require('dotenv').config({ path: 'config/.env' });
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site"}
}))

app.use('/images', express.static(path.join(__dirname, 'images')));

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes)

const postRoutes = require('./routes/post');
app.use('/api/posts', postRoutes);








module.exports = app;