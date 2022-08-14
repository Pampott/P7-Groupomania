const express = require('express');
const cookieParser = require('cookie-parser')
require('dotenv').config({ path: './config/.env' });
const path = require('path');

require('./config/db');

const app = express();

app.use(express.json());
app.use(cookieParser(process.env.TOKEN))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, XMLHttpRequest, Content, Accept, Content-Type"
    );
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Authorization', 'Bearer' + ' ' + process.env.TOKEN)
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

//jwt verification
const auth = require('./middlewares/auth');
app.get('*', auth);

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes)

const postRoutes = require('./routes/post');
app.use('/api/posts', postRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));






module.exports = app;