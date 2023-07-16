import { prisma } from '@/lib/prisma';
import { AnimesRepository } from '../animes-repository';
import { GetResult } from '@prisma/client/runtime/library';

export class PrismaAnimeListRepository implements AnimesRepository {
  async findAnimesByUserId(userId: string) {
    const animes = await prisma.anime.findMany({
      where: { userId },
    });

    return animes;
  }

  async findByJikanId(jikanId: string) {
    const anime = await prisma.anime.findFirst({
      where: {
        jikanId,
      },
    });

    return anime;
  }

  async create(data: any) {
    const anime = await prisma.anime.create({
      data,
    });

    return anime;
  }
}
