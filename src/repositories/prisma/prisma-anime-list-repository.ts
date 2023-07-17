import { prisma } from '@/lib/prisma';
import { AnimesRepository } from '../animes-repository';

export class PrismaAnimeListRepository implements AnimesRepository {
  async findAnime(id: string) {
    const animes = await prisma.anime.findFirst({
      where: { id },
    });

    return animes;
  }

  async updateStatus(id: string, status: any) {
    const anime = await prisma.anime.update({
      where: { id },
      data: {
        status,
      },
    });

    return anime;
  }

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

  async remove(id: string) {
    await prisma.anime.delete({
      where: {
        id: id,
      },
    });
    return null;
  }
}
