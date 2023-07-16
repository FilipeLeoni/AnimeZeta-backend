import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { updateProfileUseCase } from '../update-profile';

export function makeUpdateProfileUseCase() {
  const userRepository = new PrismaUserRepository();
  const UpdateProfileUseCase = new updateProfileUseCase(userRepository);

  return UpdateProfileUseCase;
}
