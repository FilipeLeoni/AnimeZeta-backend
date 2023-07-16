import { describe, it, expect, beforeEach } from 'vitest';
import { hash } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let userRepository: InMemoryUserRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new AuthenticateUseCase(userRepository);
  });
  it('should be able to authenticate', async () => {
    await userRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('secretpassword', 5),
    });

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: 'secretpassword',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'secretpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('notsecretpassword', 5),
    });

    expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'secretpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
