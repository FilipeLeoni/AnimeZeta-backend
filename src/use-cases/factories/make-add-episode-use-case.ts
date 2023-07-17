import { PrismaEpisodesRepository } from '@/repositories/prisma/prisma-episode-repository';
import { AddEpisodeUseCase } from '../episodes';

export function makeAddEpisodeToListUseCase() {
  const episodesRepository = new PrismaEpisodesRepository();
  const addEpisodeToListUseCase = new AddEpisodeUseCase(episodesRepository);

  return addEpisodeToListUseCase;
}
