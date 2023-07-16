import { AnimesRepository } from '@/repositories/animes-repository';
import { Anime, Episode } from '@prisma/client';
import { AnimeAlredyAdded } from './errors/anime-alredy-added';
import { EpisodesRepository } from '@/repositories/episodes-repository';

interface AddEpisodeToListUseCaseRequest {
  animeId: string;
  number: number;
  status: string;
}

interface AddEpisodeToListUseCaseResponse {
  episode: Episode;
}

export class AddEpisodeUseCase {
  constructor(private episodesRepository: EpisodesRepository) {}

  async execute({
    animeId,
    number,
    status,
  }: AddEpisodeToListUseCaseRequest): Promise<AddEpisodeToListUseCaseResponse> {
    const episodeExists = await this.episodesRepository.findByAnimeIdAndNumber(
      animeId,
      number,
    );

    if (episodeExists) {
      throw new Error('Episode already exists');
    }

    const episode = await this.episodesRepository.create({
      animeId,
      number,
      status,
    });

    return {
      episode,
    };
  }
}
