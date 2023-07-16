import { describe, it, expect, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { InMemoryAnimeRepository } from '@/repositories/in-memory/in-memory-anime-list-repository';
import { AnimeListUseCase } from './anime-list';
import { AnimeAlredyAdded } from './errors/anime-alredy-added';
import { InMemoryEpisodesRepository } from '@/repositories/in-memory/in-memory-episode-repository';
import { AddEpisodeUseCase } from './episodes';

let episodesRepository: InMemoryEpisodesRepository;
let sut: AddEpisodeUseCase;

describe('Anime List Use Case', () => {
  beforeEach(() => {
    episodesRepository = new InMemoryEpisodesRepository();
    sut = new AddEpisodeUseCase(episodesRepository);
  });
  it('should be able to add an episode', async () => {
    const { episode } = await sut.execute({
      animeId: 'animeId',
      number: 1,
      status: 'watching',
    });

    expect(episode.number).toEqual(1);
    expect(episode.status).toEqual('watching');
  });
});
