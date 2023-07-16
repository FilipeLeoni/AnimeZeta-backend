import { AnimesRepository } from '@/repositories/animes-repository';
import { Anime } from '@prisma/client';
import { AnimeAlredyAdded } from './errors/anime-alredy-added';

interface GetAnimeListUseCaseRequest {
  userId: string;
}

interface GetAnimeListUseCaseResponse {
  anime: Anime;
}

export class GetAnimeListUseCase {
  constructor(private AnimesRepository: AnimesRepository) {}

  async execute(userId: string) {
    const anime = await this.AnimesRepository.findAnimesByUserId(userId);

    return {
      anime,
    };
  }
}
