import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { UserProfileDTO } from '@/@types/users.dto';

export class PrismaUserRepository implements UsersRepository {
  async findById(id: string): Promise<UserProfileDTO | any> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        anime: true,
      },
    });

    if (!user) {
      return null;
    }

    const totalAnimeCount = user.anime.length;
    const completedAnimeCount = user.anime.filter(
      anime => anime.status === 'Completed',
    ).length;
    const totalEpisodesWatched = user.anime.reduce(
      (total, anime) => total + anime.episodeProgress,
      0,
    );

    const userProfile: UserProfileDTO = {
      id: user.id,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      totalAnimeCount,
      completedAnimeCount,
      totalEpisodesWatched,
    };

    return userProfile;
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

  async save(
    id: string,
    username?: string,
    password?: string,
    avatarUrl?: string,
  ) {
    const userUpdated = await prisma.user.update({
      where: { id: id },
      data: {
        username,
        password,
        avatarUrl,
      },
    });

    return userUpdated;
  }
}
