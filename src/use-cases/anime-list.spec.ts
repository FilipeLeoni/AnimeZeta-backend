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

let animeRepository: InMemoryAnimeRepository;
let sut: AnimeListUseCase;

describe('Anime List Use Case', () => {
  beforeEach(() => {
    animeRepository = new InMemoryAnimeRepository();
    sut = new AnimeListUseCase(animeRepository);
  });
  it('should be able to add a anime to list', async () => {
    const { anime } = await sut.execute({
      jikanId: '098471',
      title: 'My Hero Academia',
      imageUrl: 'https://example.com/my-hero-academia.jpg',
      status: 'Watching',
      userId: '64b28ad5ac88a6b864a1203c',
    });

    expect(anime.userId).toEqual('64b28ad5ac88a6b864a1203c');
  });

  it('should not be able to add same anime twice', async () => {
    await sut.execute({
      jikanId: '098471',
      title: 'My Hero Academia',
      imageUrl: 'https://example.com/my-hero-academia.jpg',
      status: 'Watching',
      userId: '64b28ad5ac88a6b864a1203c',
    });

    await expect(() =>
      sut.execute({
        jikanId: '098471',
        title: 'My Hero Academia',
        imageUrl: 'https://example.com/my-hero-academia.jpg',
        status: 'Watching',
        userId: '64b28ad5ac88a6b864a1203c',
      }),
    ).rejects.toBeInstanceOf(AnimeAlredyAdded);
  });
});
