import { Request, Response } from 'express';
import { z } from 'zod';
import { makeAnimeListUseCase } from '@/use-cases/factories/make-anime-list-use-case';

export async function anime(req: Request, res: Response) {
  const animeBodySchema = z.object({
    jikanId: z.string().nonempty(),
    title: z.string(),
    imageUrl: z.string(),
    status: z.string(),
  });

  const { jikanId, title, imageUrl, status } = animeBodySchema.parse(req.body);

  const userId = req.user.sub;

  try {
    const AnimeListUseCase = makeAnimeListUseCase();

    await AnimeListUseCase.execute({
      jikanId,
      title,
      imageUrl,
      status,
      userId,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create anime' });
  }
  return res.status(201).send();
}
