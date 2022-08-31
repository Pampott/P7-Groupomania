import express, { json } from 'express';
require('dotenv').config({ path: 'config/.env' });
import cors from 'cors';
import helmet from 'helmet';
import { join } from 'path';

import './config/db';

const app = express();
app.use(json());
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: { policy: "same-site"}
}))

app.use('/images', (join(__dirname, 'images')));

import userRoutes from './routes/user';
app.use('/api/auth', userRoutes)

import postRoutes from './routes/post';
app.use('/api/posts', postRoutes);

export default app;