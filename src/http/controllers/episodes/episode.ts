import { Request, Response } from 'express';
import { z } from 'zod';
import { makeAnimeListUseCase } from '@/use-cases/factories/make-anime-list-use-case';
import { makeAddEpisodeToListUseCase } from '@/use-cases/factories/make-add-episode-use-case';

export async function episode(req: Request, res: Response) {
  const episodeBodySchema = z.object({
    animeId: z.string(),
    number: z.number().positive(),
    status: z.string(),
  });

  const { animeId, number, status } = episodeBodySchema.parse(req.body);

  try {
    const addEpisodeToListUseCase = makeAddEpisodeToListUseCase();

    await addEpisodeToListUseCase.execute({
      animeId,
      number,
      status,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to add episode to list' });
  }
  return res.status(201).send();
}
