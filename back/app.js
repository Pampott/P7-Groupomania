const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });
const {checkUser, requireAuth} = require('./middlewares/auth');

require('./config/db');

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({origin: process.env.PORT}));

//jwt verification
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

const userRoutes = require('./routes/user');
app.use('/api/auth', userRoutes)

const postRoutes = require('./routes/post');
app.use('/api/posts', postRoutes);





module.exports = app;