import { Router } from 'express';
import { healthCheck, readinessCheck } from '../controllers/health.controller';

const router = Router();

// GET /api/v1/health - Basic health check
router.get('/', healthCheck);

// GET /api/v1/health/ready - Readiness check (for k8s/docker)
router.get('/ready', readinessCheck);

export default router;
