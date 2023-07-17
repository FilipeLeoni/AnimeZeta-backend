import { PrismaEpisodesRepository } from '@/repositories/prisma/prisma-episode-repository';
import { UpdateEpisodeStatus } from '../update-episode-status';

export function makeUpdateEpisodeStatusUseCase() {
  const episodesRepository = new PrismaEpisodesRepository();
  const UpdateEpisodeUseCase = new UpdateEpisodeStatus(episodesRepository);

  return UpdateEpisodeUseCase;
}
