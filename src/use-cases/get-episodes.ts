import { Episode } from '@prisma/client';
import { EpisodesRepository } from '@/repositories/episodes-repository';

interface AddEpisodeToListUseCaseRequest {
  animeId: string;
}

interface AddEpisodeToListUseCaseResponse {
  episode: Episode[] | null;
}

export class GetEpisodeUseCase {
  constructor(private episodesRepository: EpisodesRepository) {}

  async execute({
    animeId,
  }: AddEpisodeToListUseCaseRequest): Promise<AddEpisodeToListUseCaseResponse> {
    const episode = await this.episodesRepository.findEpisodesByAnimeId(
      animeId,
    );

    return {
      episode,
    };
  }
}
