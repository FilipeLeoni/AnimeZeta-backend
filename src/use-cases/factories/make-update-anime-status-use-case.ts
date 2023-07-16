import { PrismaAnimeListRepository } from '@/repositories/prisma/prisma-anime-list-repository';
import { UpdateAnimeStatus } from '../update-anime-status';

export function makeUpdateAnimeStatus() {
  const AnimesRepository = new PrismaAnimeListRepository();
  const updateAnimeStatus = new UpdateAnimeStatus(AnimesRepository);

  return updateAnimeStatus;
}
