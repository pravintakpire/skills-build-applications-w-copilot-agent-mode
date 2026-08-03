import app from './app.js';
import { apiBaseUrl } from './config/env.js';

const port = 8000;

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on ${apiBaseUrl}`);
});
