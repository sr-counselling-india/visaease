import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const healthCheck = (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'healthy',
    message: 'VisaEase API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
};

export const readinessCheck = (req: Request, res: Response): void => {
  const dbState = mongoose.connection.readyState;
  const dbStatus: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized',
  };
  
  const isReady = dbState === 1;
  
  if (isReady) {
    res.status(200).json({
      status: 'ready',
      checks: {
        server: 'up',
        database: dbStatus[dbState] || 'unknown',
      },
      timestamp: new Date().toISOString(),
    });
  } else {
    res.status(503).json({
      status: 'not ready',
      checks: {
        server: 'up',
        database: dbStatus[dbState] || 'unknown',
      },
      message: 'Service dependencies not available',
    });
  }
};
