import { PrismaAnimeListRepository } from '@/repositories/prisma/prisma-anime-list-repository';
import { UpdateAnimeStatus } from '../update-anime-status';
import { RemoveAnimeUseCase } from '../remove-anime';

export function makeRemoveAnime() {
  const AnimesRepository = new PrismaAnimeListRepository();
  const RemoveAnime = new RemoveAnimeUseCase(AnimesRepository);

  return RemoveAnime;
}
