import { Request, Response } from 'express';
import { makeUpdateAnimeStatus } from '@/use-cases/factories/make-update-anime-status-use-case';
import { z } from 'zod';

export async function UpdateAnimeStatus(req: Request, res: Response) {
  const schema = z.object({
    status: z.string().optional(),
    episodes: z.number().optional(),
  });
  try {
    const userId = req.user.sub;
    const { id } = req.params;
    const { status, episodes } = schema.parse(req.body);

    const UpdateAnimeStatusUseCase = makeUpdateAnimeStatus();

    const anime = await UpdateAnimeStatusUseCase.execute({
      id,
      status,
      episodes,
      userId,
    });

    return res.status(200).json(anime);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create anime' });
  }
}
