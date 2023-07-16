import { Request, Response } from 'express';
import { z } from 'zod';
import { makeAnimeListUseCase } from '@/use-cases/factories/make-anime-list-use-case';
import { makeGetAnimeList } from '@/use-cases/factories/make-get-anime-list-use-case';
import { makeUpdateAnimeStatus } from '@/use-cases/factories/make-update-anime-status-use-case';
import { AnimeStatus } from '@/@types/animeStatus';

export async function UpdateAnimeStatus(req: Request, res: Response) {
  const UpdateAnimeStatusBodySchema = z.object({
    id: z.string(),
    status: z.any(),
  });

  try {
    const { id, status } = UpdateAnimeStatusBodySchema.parse(req.body);
    const UpdateAnimeStatusUseCase = makeUpdateAnimeStatus();

    const anime = await UpdateAnimeStatusUseCase.execute({
      id,
      status,
    });

    return res.status(200).json({ anime });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create anime' });
  }
}
