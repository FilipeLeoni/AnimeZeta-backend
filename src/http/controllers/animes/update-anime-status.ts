import { Request, Response } from 'express';
import { makeUpdateAnimeStatus } from '@/use-cases/factories/make-update-anime-status-use-case';
import { z } from 'zod';

export async function UpdateAnimeStatus(req: Request, res: Response) {
  try {
    const userId = req.user.sub;
    const status = req.body.status;
    const { id } = req.params;

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
