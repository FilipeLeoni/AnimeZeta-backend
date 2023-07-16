import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { AnimesRepository } from '../animes-repository';

export class PrismaAnimeListRepository implements AnimesRepository {
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
