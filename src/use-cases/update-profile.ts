import { UsersRepository } from '../repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface updateProfileUseCaseRequest {
  userId: string;
  username?: string;
  password?: string;
  avatarUrl?: string;
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
    avatarUrl,
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

    if (avatarUrl) {
      user.avatarUrl = avatarUrl;
    }

    await this.UsersRepository.save(
      user.id,
      user.username,
      user.password,
      user.avatarUrl,
    );

    return {
      user,
    };
  }
}
