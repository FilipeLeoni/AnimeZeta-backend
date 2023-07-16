import { Router } from 'express';
import jwtAuthenticate from '@/http/middlewares/authMiddleware';
import { episode } from './episode';

const router = Router();

router.post('/episode', jwtAuthenticate, episode);

export default router;
