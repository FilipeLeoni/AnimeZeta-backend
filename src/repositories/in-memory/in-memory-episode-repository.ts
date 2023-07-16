import { EpisodesRepository } from '@/repositories/episodes-repository';
import { Episode } from '@prisma/client';
import { GetResult } from '@prisma/client/runtime/library';

export class InMemoryEpisodesRepository implements EpisodesRepository {
  private episodes: Episode[];

  constructor() {
    this.episodes = [];
  }

  async findByAnimeIdAndNumber(
    animeId: string,
    number: number,
  ): Promise<Episode | null> {
    const episode = this.episodes.find(
      e => e.animeId === animeId && e.number === number,
    );
    return episode ?? null;
  }

  async create(data: any): Promise<Episode> {
    const episode = { ...data };
    this.episodes.push(episode);
    return episode;
  }
}
