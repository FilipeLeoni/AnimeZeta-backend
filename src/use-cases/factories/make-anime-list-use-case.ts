import { AnimeListUseCase } from '../anime-list';
import { PrismaAnimeListRepository } from '@/repositories/prisma/prisma-anime-list-repository';

export function makeAnimeListUseCase() {
  const animeRepository = new PrismaAnimeListRepository();
  const animeList = new AnimeListUseCase(animeRepository);

  return animeList;
}
