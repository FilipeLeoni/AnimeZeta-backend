import { UsersRepository } from '../repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface updateProfileUseCaseRequest {
  userId: string;
  username?: string;
  password?: string;
}

interface updateProfileUseCaseResponse {
  user: User;
}

export class updateProfileUseCase {
  constructor(private UsersRepository: UsersRepository) {}

  async execute({
    userId,
    username,
    password,
  }: updateProfileUseCaseRequest): Promise<updateProfileUseCaseResponse> {
    const user = await this.UsersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = password;
    }

    await this.UsersRepository.save(user.id, user.username, user.password);

    return {
      user,
    };
  }
}
