import { Anime } from '@prisma/client';

export interface AnimesRepository {
  findByJikanId(jikanId: string): Promise<Anime | null>;
  findAnimesByUserId(userId: string): Promise<Anime[] | null>;
  create(data: any): Promise<Anime>;
}
