import { AnimesRepository } from '@/repositories/animes-repository';
import { Anime } from '@prisma/client';
import { AnimeAlredyAdded } from './errors/anime-alredy-added';

interface AnimeListUseCaseRequest {
  jikanId: string;
  title: string;
  imageUrl: string;
  status: string;
  userId: string;
  episodeProgress: number;
  episodes?: number;
}

interface AnimeListUseCaseResponse {
  anime: Anime;
}

export class AnimeListUseCase {
  constructor(private AnimesRepository: AnimesRepository) {}

  async execute({
    jikanId,
    title,
    imageUrl,
    status,
    userId,
    episodeProgress,
    episodes,
  }: AnimeListUseCaseRequest): Promise<AnimeListUseCaseResponse> {
    const addSameAnime = await this.AnimesRepository.findByJikanId(jikanId);

    if (addSameAnime) {
      throw new AnimeAlredyAdded();
    }

    const anime = await this.AnimesRepository.create({
      jikanId,
      title,
      imageUrl,
      status,
      userId,
      episodeProgress,
      episodes,
    });

    return {
      anime,
    };
  }
}
