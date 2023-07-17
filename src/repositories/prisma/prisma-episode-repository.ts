import { prisma } from '@/lib/prisma';
import { Episode, Prisma } from '@prisma/client';
import { EpisodesRepository } from '../episodes-repository';

export class PrismaEpisodesRepository implements EpisodesRepository {
  async updateStatus(
    id: string,
    number: number,
    status: string,
  ): Promise<Episode> {
    const episode = await prisma.episode.update({
      where: {
        id,
        number,
      },
      data: {
        status,
      },
    });

    return episode;
  }

  async findEpisodesByAnimeId(animeId: string): Promise<any> {
    const anime = await prisma.anime.findFirst({
      where: {
        id: animeId,
      },
    });

    const episodes = await prisma.episode.findMany({
      where: {
        animeId,
      },
    });

    return {
      anime,
      episodes,
    };
  }

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

  async remove(id: string) {
    await prisma.episode.delete({
      where: {
        id: id,
      },
    });
    return null;
  }
}
