import { AnimesRepository } from '@/repositories/animes-repository';
import { Anime } from '@prisma/client';

interface AnimeListUseCaseRequest {
  id: string;
  userId: string;
}

interface AnimeListUseCaseResponse {
  anime: Anime;
}

export class RemoveAnimeUseCase {
  constructor(private AnimesRepository: AnimesRepository) {}

  async execute({
    id,
    userId,
  }: AnimeListUseCaseRequest): Promise<AnimeListUseCaseResponse> {
    const anime = await this.AnimesRepository.findAnime(id, userId);

    if (!anime) {
      throw new Error('Anime not found in user list');
    }

    await this.AnimesRepository.remove(id);

    return {
      anime,
    };
  }
}
