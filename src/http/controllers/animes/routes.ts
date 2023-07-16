import jwtAuthenticate from '@/http/middlewares/authMiddleware';
import { Router } from 'express';
import { anime } from './anime';

const router = Router();

router.post('/mylist', jwtAuthenticate, anime);

export default router;
