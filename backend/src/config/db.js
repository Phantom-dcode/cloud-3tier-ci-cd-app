import mongoose from 'mongoose';
import { config } from './env.js';
import { logger } from './logger.js';

export const connectDatabase = async () => {
  if (!config.mongoUri) {
    logger.info('MONGODB_URI not provided. Running with high-performance In-Memory Enterprise Database Store.');
    return false;
  }

  try {
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    logger.info(`MongoDB Atlas Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    logger.warn(`MongoDB Connection Warning: ${error.message}. Falling back to In-Memory Data Engine.`);
    return false;
  }
};
