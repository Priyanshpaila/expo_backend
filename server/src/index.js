import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { leadRouter } from './routes/leads.js';

const app = express();

// middleware
app.use(helmet());
app.use(cors({ origin: ["https://expo.rrispat.in", 'http://localhost:5173'], credentials: true }));
app.use(express.json({ limit: '256kb' }));
app.use(morgan('dev'));

// routes
app.get('/health', (_, res) => res.json({ ok: true, status: 'healthy' }));
app.use('/api/leads', leadRouter);

// boot
const start = async () => {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(`🚀 Server running on ${env.PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
};

start();
