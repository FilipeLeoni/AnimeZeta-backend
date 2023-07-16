import { Anime } from '@prisma/client';
import { AnimesRepository } from '../animes-repository';

export class InMemoryAnimeRepository implements AnimesRepository {
  private animes: Anime[];

  constructor() {
    this.animes = [];
  }

  async findByJikanId(jikanId: string): Promise<Anime | null> {
    const anime = this.animes.find(anime => anime.jikanId === jikanId);
    return anime ?? null;
  }

  async create(data: any): Promise<Anime> {
    const anime = { ...data };
    this.animes.push(anime);
    return anime;
  }
}
