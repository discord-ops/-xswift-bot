import express from 'express';
import { config } from '../config';
import { logger } from './logger';

let server: ReturnType<typeof express.application.listen> | null = null;

export function startHealthServer(): void {
  const app = express();
  const port = config.bot.port;

  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
    });
  });

  app.get('/', (_req, res) => {
    res.status(200).send('xSwift Bot is running!');
  });

  server = app.listen(port, () => {
    logger.info(`Health check server running on port ${port}`);
  });
}

export function stopHealthServer(): void {
  if (server) {
    server.close();
    server = null;
  }
}
