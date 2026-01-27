import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { healthCheck, db } from './db';
import contactsRouter from './routes/contacts';
import dealsRouter from './routes/deals';
import activitiesRouter from './routes/activities';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check endpoint
app.get('/api/health', async (req: Request, res: Response) => {
  const dbOk = await healthCheck();
  res.json({ status: 'ok', db: dbOk ? 'up' : 'down', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/contacts', contactsRouter);
app.use('/api/deals', dealsRouter);
app.use('/api/activities', activitiesRouter);

const server = app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
const shutdown = async () => {
  console.log('Shutting down server...');
  await db.destroy();
  server.close(() => process.exit(0));
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
