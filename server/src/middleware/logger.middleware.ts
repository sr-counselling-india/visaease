import { Request, Response, NextFunction } from 'express';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const log = {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    };

    // Color-coded logging based on status code
    if (res.statusCode >= 500) {
      console.error('🔴', JSON.stringify(log));
    } else if (res.statusCode >= 400) {
      console.warn('🟡', JSON.stringify(log));
    } else {
      console.log('🟢', JSON.stringify(log));
    }
  });

  next();
};
