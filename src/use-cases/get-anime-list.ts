import { AnimesRepository } from '@/repositories/animes-repository';
export class GetAnimeListUseCase {
  constructor(private AnimesRepository: AnimesRepository) {}

  async execute(userId: string) {
    const anime = await this.AnimesRepository.findAnimesByUserId(userId);

    return {
      anime,
    };
  }
}
