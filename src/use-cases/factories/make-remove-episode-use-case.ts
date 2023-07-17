import { PrismaEpisodesRepository } from '@/repositories/prisma/prisma-episode-repository';
import { RemoveEpisodeUseCase } from '../remove-episode';

export function makeRemoveEpisodeUseCase() {
  const episodesRepository = new PrismaEpisodesRepository();
  const removeEpisodeUseCase = new RemoveEpisodeUseCase(episodesRepository);

  return removeEpisodeUseCase;
}
