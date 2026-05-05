import { createLogger, format, transports } from 'winston';
import { config } from '../config';

const { combine, timestamp, colorize, printf, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

export const logger = createLogger({
  level: config.bot.logLevel || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    config.bot.nodeEnv === 'production'
      ? format.json()
      : combine(colorize(), logFormat)
  ),
  transports: [
    new transports.Console(),
  ],
  exitOnError: false,
});

// Stream for morgan-style logging (if needed)
export const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
