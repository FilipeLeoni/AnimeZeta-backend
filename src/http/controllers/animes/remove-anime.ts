import { Request, Response } from 'express';
import { z } from 'zod';
import { makeAnimeListUseCase } from '@/use-cases/factories/make-anime-list-use-case';
import { makeGetAnimeList } from '@/use-cases/factories/make-get-anime-list-use-case';
import { makeUpdateAnimeStatus } from '@/use-cases/factories/make-update-anime-status-use-case';
import { AnimeStatus } from '@/@types/animeStatus';
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
