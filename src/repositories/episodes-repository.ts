import { Episode, Prisma } from '@prisma/client';

export interface EpisodesRepository {
  findByAnimeIdAndNumber(
    animeId: string,
    number: number,
  ): Promise<Episode | null>;
  create(data: Prisma.EpisodeUncheckedCreateInput): Promise<Episode>;
  findEpisodesByAnimeId(animeId: string): Promise<any>;
  updateStatus(id: string, number: number, status: string): Promise<Episode>;
  remove(id: string): Promise<null>;
}
