import cors from 'cors';
import { config } from './env.js';

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || config.corsOrigin === '*' || origin.includes('localhost') || origin.includes('run.app')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow for development versatility
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

export const configureCors = () => cors(corsOptions);
