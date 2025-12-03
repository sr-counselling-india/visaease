import app from './app';
import config from './config';
import { connectDB } from './db';

const startServer = async (): Promise<void> => {
  try {
    // Connect to database (when configured)
    await connectDB();

    // Start server
    const server = app.listen(config.port, () => {
      console.log('');
      console.log('🚀 VisaEase Server Started');
      console.log('─'.repeat(40));
      console.log(`📍 Environment: ${config.nodeEnv}`);
      console.log(`🌐 URL: http://localhost:${config.port}`);
      console.log(`📡 API: http://localhost:${config.port}${config.api.prefix}`);
      console.log(`💚 Health: http://localhost:${config.port}${config.api.prefix}/health`);
      console.log('─'.repeat(40));
      console.log('');
    });

    // Graceful shutdown handlers
    const shutdown = (signal: string) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();