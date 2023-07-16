import { Router } from 'express';
import { register } from './register';
import { refresh } from './refresh';
import { authenticate } from './authenticate';
import jwtAuthenticate from '@/http/middlewares/authMiddleware';
import { profile } from './profile';
import { updateProfile } from './update-profile';

const router = Router();
router.post('/user', register);
router.patch('/token/refresh', refresh);
router.post('/sessions', authenticate);
router.get('/user', jwtAuthenticate, profile);
router.patch('/update-profile', jwtAuthenticate, updateProfile);

export default router;
