import { Router } from 'express';
import healthRoutes from './health.routes';
// Import other routes as you create them
// import authRoutes from './auth.routes';
// import userRoutes from './user.routes';
// import visaRoutes from './visa.routes';

const router = Router();

// Health check routes
router.use('/health', healthRoutes);

// Auth routes
// router.use('/auth', authRoutes);

// User routes
// router.use('/users', userRoutes);

// Visa routes
// router.use('/visas', visaRoutes);

export default router;
