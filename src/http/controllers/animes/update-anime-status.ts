import { Request, Response } from 'express';
import { z } from 'zod';
import { makeUpdateAnimeStatus } from '@/use-cases/factories/make-update-anime-status-use-case';

export async function UpdateAnimeStatus(req: Request, res: Response) {
  const UpdateAnimeStatusBodySchema = z.object({
    id: z.string(),
    status: z.any(),
  });

  const userId = req.user.sub;

  try {
    const { id, status } = UpdateAnimeStatusBodySchema.parse(req.body);
    const UpdateAnimeStatusUseCase = makeUpdateAnimeStatus();

    const anime = await UpdateAnimeStatusUseCase.execute({
      id,
      status,
      userId,
    });

    return res.status(200).json({ anime });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create anime' });
  }
}
