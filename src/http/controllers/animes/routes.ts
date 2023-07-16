import jwtAuthenticate from '@/http/middlewares/authMiddleware';
import { Router } from 'express';
import { anime } from './anime';
import { getAnimeList } from './get-anime-list';

const router = Router();

router.post('/mylist', jwtAuthenticate, anime);
router.get('/mylist', jwtAuthenticate, getAnimeList);

export default router;
