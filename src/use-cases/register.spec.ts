import { describe, it, expect, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { UserAlreadyExistsError } from './errors/user-alredy-exists';

let userRepository: InMemoryUserRepository;
let sut: RegisterUseCase;

describe('CreateUser', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(userRepository);
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: 'secretpassword',
    });

    const isPasswordCorrectlyHashed = await compare(
      'secretpassword',
      user.password,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com';

    await sut.execute({
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: 'secretpassword',
    });

    await expect(() =>
      sut.execute({
        username: 'John Doe',
        email,
        password: 'secretpassword',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      username: 'John Doe',
      email: 'johndoe@example.com',
      password: 'secretpassword',
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
