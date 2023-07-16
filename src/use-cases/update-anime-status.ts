import { AnimesRepository } from '@/repositories/animes-repository';
import { Anime } from '@prisma/client';
import { AnimeAlredyAdded } from './errors/anime-alredy-added';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { AnimeStatus } from '@/@types/animeStatus';

interface AnimeListUseCaseRequest {
  id: string;
  status: AnimeStatus;
  userId: string;
}

interface AnimeListUseCaseResponse {
  updateAnime: Anime;
}

export class UpdateAnimeStatus {
  constructor(private AnimesRepository: AnimesRepository) {}

  async execute({
    id,
    status,
    userId,
  }: AnimeListUseCaseRequest): Promise<AnimeListUseCaseResponse> {
    const anime = await this.AnimesRepository.findAnime(id, userId);

    if (!anime) {
      throw new ResourceNotFoundError();
    }

    const updateAnime = await this.AnimesRepository.updateStatus(id, status);

    return {
      updateAnime,
    };
  }
}
