import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { GetUserProfileUseCase } from '../get-user-profile';
import { GetAnimeListUseCase } from '../get-anime-list';
import { PrismaAnimeListRepository } from '@/repositories/prisma/prisma-anime-list-repository';

export function makeGetAnimeList() {
  const AnimesRepository = new PrismaAnimeListRepository();
  const getAnimesByUserId = new GetAnimeListUseCase(AnimesRepository);

  return getAnimesByUserId;
}
