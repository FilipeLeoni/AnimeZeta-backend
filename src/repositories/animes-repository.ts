import { AnimeStatus } from '@/@types/animeStatus';
import { Anime } from '@prisma/client';

export interface AnimesRepository {
  create(data: any): Promise<Anime>;
  findByJikanId(jikanId: string): Promise<Anime | null>;
  findAnime(id: string, userId: string): Promise<Anime | null>;
  updateStatus(
    id: string,
    status?: AnimeStatus,
    episodes?: number,
  ): Promise<Anime>;
  findAnimesByUserId(userId: string): Promise<Anime[] | null>;
  remove(id: string): Promise<null>;
}
