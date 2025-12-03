import mongoose from 'mongoose';
import config from '../config';

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.database.url);
    console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Database connection failed: ${error.message}`);
    } else {
      console.error('❌ Database connection failed');
    }
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('📦 MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error(`📦 MongoDB error: ${err}`);
});

export default mongoose;
