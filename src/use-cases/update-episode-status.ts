import { Episode } from '@prisma/client';
import { EpisodesRepository } from '@/repositories/episodes-repository';

interface AnimeListUseCaseRequest {
  id: string;
  status: string;
  number: number;
}

interface AnimeListUseCaseResponse {
  updateEpisode: Episode;
}

export class UpdateEpisodeStatus {
  constructor(private EpisodeRepository: EpisodesRepository) {}

  async execute({
    id,
    number,
    status,
  }: AnimeListUseCaseRequest): Promise<AnimeListUseCaseResponse> {
    const updateEpisode = await this.EpisodeRepository.updateStatus(
      id,
      number,
      status,
    );

    return {
      updateEpisode,
    };
  }
}
