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
    episodes: z.number(),
  });

  const { jikanId, title, imageUrl, status, episodes } = animeBodySchema.parse(
    req.body,
  );

  const userId = req.user.sub;

  try {
    const AnimeListUseCase = makeAnimeListUseCase();

    await AnimeListUseCase.execute({
      jikanId,
      title,
      imageUrl,
      status,
      userId,
      episodes,
    });
  } catch (err) {
    if (err instanceof AnimeAlredyAdded) {
      return res.status(409).send({ message: err.message });
    }
    return res.status(500).json({ error: 'Failed to add anime to list' });
  }
  return res.status(201).send();
}
