import { Request, Response } from 'express';
import { makeRemoveEpisodeUseCase } from '@/use-cases/factories/make-remove-episode-use-case';

export async function RemoveEpisode(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const RemoveEpisodeUseCase = makeRemoveEpisodeUseCase();

    await RemoveEpisodeUseCase.execute({
      id,
    });

    return res.status(200).json({ message: 'Episode removed success' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to remove episode' });
  }
}
