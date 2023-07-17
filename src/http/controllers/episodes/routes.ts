import { Router } from 'express';
import jwtAuthenticate from '@/http/middlewares/authMiddleware';
import { episode } from './episode';
import { getEpisode } from './get-episodes';
import { updateEpisodeStatus } from './update-episode-status';
import { RemoveEpisode } from './remove-episode';

const router = Router();

router.post('/episode', jwtAuthenticate, episode);
router.get('/episode/:animeId', jwtAuthenticate, getEpisode);
router.patch('/episode/status/:id', jwtAuthenticate, updateEpisodeStatus);
router.delete('/episode/:id', jwtAuthenticate, RemoveEpisode);

export default router;
