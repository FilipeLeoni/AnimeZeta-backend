import { PrismaEpisodesRepository } from '@/repositories/prisma/prisma-episode-repository';
import { GetEpisodeUseCase } from '../get-episodes';

export function makeGetEpisodes() {
  const EpisodesRepository = new PrismaEpisodesRepository();
  const getEpisodesByUserId = new GetEpisodeUseCase(EpisodesRepository);

  return getEpisodesByUserId;
}
