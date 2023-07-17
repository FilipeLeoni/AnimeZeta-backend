import { EpisodesRepository } from '@/repositories/episodes-repository';

interface RemoveEpisodeUseCaseRequest {
  id: string;
}

export class RemoveEpisodeUseCase {
  constructor(private EpisodeRepository: EpisodesRepository) {}

  async execute({ id }: RemoveEpisodeUseCaseRequest) {
    await this.EpisodeRepository.remove(id);
  }
}
