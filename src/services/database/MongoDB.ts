import mongoose from 'mongoose';
import { config } from '../../config';
import { logger } from '../../utils/logger';

let isConnected = false;

export async function connectDatabase(): Promise<void> {
    if (isConnected) {
          logger.debug('Already connected to MongoDB');
          return;
    }

    if (!config.mongodb.uri) {
          throw new Error('MONGODB_URI is not set in environment variables');
    }

    try {
          mongoose.set('strictQuery', false);

          await mongoose.connect(config.mongodb.uri, {
                  maxPoolSize: 10,
                  serverSelectionTimeoutMS: 5000,
                  socketTimeoutMS: 45000,
          });

          isConnected = true;
          logger.info('Connected to MongoDB Atlas');

          mongoose.connection.on('error', (error) => {
                  logger.error('MongoDB connection error:', error);
                  isConnected = false;
          });

          mongoose.connection.on('disconnected', () => {
                  logger.warn('MongoDB disconnected. Attempting to reconnect...');
                  isConnected = false;
          });

          mongoose.connection.on('reconnected', () => {
                  logger.info('MongoDB reconnected');
                  isConnected = true;
          });

    } catch (error) {
          logger.error('Failed to connect to MongoDB:', error);
          throw error;
    }
}

export async function disconnectDatabase(): Promise<void> {
    if (isConnected) {
          await mongoose.disconnect();
          isConnected = false;
          logger.info('Disconnected from MongoDB');
    }
}

export { mongoose };
