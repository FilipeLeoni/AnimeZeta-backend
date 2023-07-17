import { Request, Response } from 'express';
import { z } from 'zod';

import { makeRemoveAnime } from '@/use-cases/factories/make-remove-anime-use-case';

export async function RemoveAnime(req: Request, res: Response) {
  const RemoveAnimeBodySchema = z.object({
    id: z.string(),
  });

  try {
    const { id } = RemoveAnimeBodySchema.parse(req.body);
    const userId = req.user.sub;
    const RemoveAnimeUseCase = makeRemoveAnime();

    await RemoveAnimeUseCase.execute({
      id,
      userId,
    });

    return res.status(200).json({ message: 'Anime removed success' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create anime' });
  }
}
