import jwtAuthenticate from '@/http/middlewares/authMiddleware';
import { Router } from 'express';
import { anime } from './anime';
import { getAnimeList } from './get-anime-list';
import { UpdateAnimeStatus } from './update-anime-status';
import { RemoveAnime } from './remove-anime';

const router = Router();

router.post('/mylist', jwtAuthenticate, anime);
router.get('/mylist', jwtAuthenticate, getAnimeList);
router.patch('/status', jwtAuthenticate, UpdateAnimeStatus);
router.delete('/anime', jwtAuthenticate, RemoveAnime);

export default router;
