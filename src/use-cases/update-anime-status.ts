import { AnimesRepository } from '@/repositories/animes-repository';
import { Anime } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { AnimeStatus } from '@/@types/animeStatus';

interface AnimeListUseCaseRequest {
  id: string;
  status?: any;
  episodes?: number;
  userId: string;
}

interface AnimeListUseCaseResponse {
  data: Anime;
}

export class UpdateAnimeStatus {
  constructor(private AnimesRepository: AnimesRepository) {}

  async execute({
    id,
    status,
    episodes,
    userId,
  }: AnimeListUseCaseRequest): Promise<AnimeListUseCaseResponse> {
    const animeFound = await this.AnimesRepository.findAnime(id, userId);

    if (!animeFound) {
      throw new ResourceNotFoundError();
    }

    const data = await this.AnimesRepository.updateStatus(id, status, episodes);

    return {
      data,
    };
  }
}
