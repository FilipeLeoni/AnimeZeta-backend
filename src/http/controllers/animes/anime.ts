import { Request, Response } from 'express';
import { z } from 'zod';
import { makeAnimeListUseCase } from '@/use-cases/factories/make-anime-list-use-case';
import { AnimeAlredyAdded } from '@/use-cases/errors/anime-alredy-added';

export async function anime(req: Request, res: Response) {
  const animeBodySchema = z.object({
    jikanId: z.string().nonempty(),
    title: z.string(),
    imageUrl: z.string(),
    status: z.string(),
    rating: z.number().optional(),
    episodeProgress: z.number().default(0),
    episodes: z.number().optional(),
  });

  const {
    jikanId,
    title,
    imageUrl,
    status,
    rating,
    episodes,
    episodeProgress,
  } = animeBodySchema.parse(req.body);

  const userId = req.user.sub;

  try {
    const AnimeListUseCase = makeAnimeListUseCase();

    await AnimeListUseCase.execute({
      jikanId,
      title,
      imageUrl,
      status,
      userId,
      rating,
      episodeProgress,
      episodes,
    });
  } catch (err) {
    if (err instanceof AnimeAlredyAdded) {
      return res.status(409).send({ message: err.message });
    }
    return res.status(500).json({ message: 'Failed to add anime to list' });
  }
  return res.status(201).send();
}
