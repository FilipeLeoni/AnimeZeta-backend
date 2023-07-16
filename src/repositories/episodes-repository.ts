import { Anime, Episode, Prisma } from '@prisma/client';

export interface EpisodesRepository {
  findByAnimeIdAndNumber(
    animeId: string,
    number: number,
  ): Promise<Episode | null>;
  create(data: Prisma.EpisodeUncheckedCreateInput): Promise<Episode>;
}
