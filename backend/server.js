import path from 'path';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.route.js';
import waterSourceRouter from './routes/waterSource.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const _dirname = path.resolve();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: CLIENT_URL }));
}
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/water-sources', waterSourceRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_dirname, 'frontend', 'dist')));

  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(_dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
