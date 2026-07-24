import express from 'express';
import helmet from 'helmet';
import { configureCors } from './config/cors.js';
import { globalRateLimiter } from './middlewares/rateLimiter.js';
import { requestLogger } from './middlewares/logger.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import apiRoutes from './routes/index.js';

export const createApp = () => {
  const app = express();

  // Basic security and parsing middlewares
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(configureCors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(globalRateLimiter);
  app.use(requestLogger);

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'UP',
      service: 'Multi-Tier Web App API Backend',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    });
  });

  // Mount API router
  app.use('/api', apiRoutes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
