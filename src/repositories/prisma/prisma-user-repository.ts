import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { UsersRepository } from '../users-repository';

export class PrismaUserRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async save(id: string, username?: string, password?: string) {
    const userUpdated = await prisma.user.update({
      where: { id: id },
      data: {
        username,
        password,
      },
    });

    return userUpdated;
  }
}
