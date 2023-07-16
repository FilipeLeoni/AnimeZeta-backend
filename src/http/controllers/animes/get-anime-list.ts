import { Request, Response } from 'express';
import { z } from 'zod';
import { makeAnimeListUseCase } from '@/use-cases/factories/make-anime-list-use-case';
import { makeGetAnimeList } from '@/use-cases/factories/make-get-anime-list-use-case';

export async function getAnimeList(req: Request, res: Response) {
  try {
    const AnimeListUseCase = makeGetAnimeList();

    const userId = req.user.sub;

    const animeList = await AnimeListUseCase.execute(userId);

    return res.status(200).json({ animeList });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create anime' });
  }
}
