import { prisma } from '@/lib/prisma';
import { Episode, Prisma } from '@prisma/client';
import { AnimesRepository } from '../animes-repository';
import { EpisodesRepository } from '../episodes-repository';

export class PrismaEpisodesRepository implements EpisodesRepository {
  async findByAnimeIdAndNumber(
    animeId: string,
    number: number,
  ): Promise<Episode | null> {
    const episode = await prisma.episode.findFirst({
      where: {
        animeId,
        number,
      },
    });

    return episode;
  }

  async create(data: Prisma.EpisodeUncheckedCreateInput): Promise<Episode> {
    const episode = await prisma.episode.create({
      data,
    });

    return episode;
  }
}
