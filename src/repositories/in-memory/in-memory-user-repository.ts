import { GetResult } from '@prisma/client/runtime/library';
import { UsersRepository } from '../users-repository';
import { Prisma, User } from '@prisma/client';

export class InMemoryUserRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string) {
    const user = this.items.find(item => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find(item => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: '99999',
      username: data.username,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      anime: undefined,
    };

    this.items.push(user);

    return user;
  }
}
