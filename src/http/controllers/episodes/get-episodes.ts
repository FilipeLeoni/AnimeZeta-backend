import { Request, Response } from 'express';
import { makeGetEpisodes } from '@/use-cases/factories/make-get-episodes-use-case';

export async function getEpisode(req: Request, res: Response) {
  const animeId = req.params.animeId;

  try {
    const GetEpisodesUseCase = makeGetEpisodes();

    const Episodes = await GetEpisodesUseCase.execute({
      animeId,
    });
    return res.status(201).json(Episodes);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to add episode to list' });
  }
}
