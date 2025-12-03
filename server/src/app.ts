import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import config from './config';
import routes from './routes';
import { errorHandler, notFoundHandler, requestLogger } from './middleware';

const app: Express = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use(requestLogger);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'VisaEase API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use(config.api.prefix, routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;