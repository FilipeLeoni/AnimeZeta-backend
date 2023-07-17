import { Request, Response } from 'express';
import { z } from 'zod';
import { makeUpdateEpisodeStatusUseCase } from '@/use-cases/factories/make-update-episode-status-use-case';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function updateEpisodeStatus(req: Request, res: Response) {
  const episodeBodySchema = z.object({
    number: z.number().positive(),
    status: z.string(),
  });

  const { number, status } = episodeBodySchema.parse(req.body);
  const id = req.params.id;

  try {
    const updateEpisodeStatusUseCase = makeUpdateEpisodeStatusUseCase();

    const episode = await updateEpisodeStatusUseCase.execute({
      id,
      number,
      status,
    });
    return res.status(201).json(episode);
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message });
    }

    return res.status(500).send();
  }
}
