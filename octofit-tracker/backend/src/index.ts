import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import { apiBaseUrl } from './config/env.js';
import apiRouter from './routes/api.js';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', database: db.name || 'mongodb', apiBaseUrl });
});

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on ${apiBaseUrl}`);
});
