import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-alredy-exists';
import { User } from '@prisma/client';

interface RegisterUseCaseRequest {
  username: string;
  email: string;
  password: string;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    username,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 5);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      username,
      email,
      password: password_hash,
    });

    return {
      user,
    };
  }
}

// const prismaUsersRepository = new PrismaUsersRepository();

// interface createUserUseCaseReq {
//   username: string;
//   email: string;
//   password: string;
// }

// export async function CreateUserUseCase({
//   username,
//   email,
//   password,
// }: createUserUseCaseReq) {
//   const password_hash = await hash(password, 5);

//   const userWithSameEmail = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   });

//   if (userWithSameEmail) {
//     throw new Error('User already exists');
//   }

//   const prismaUsersRepository = new CreateUsersRepository();

//   await prismaUsersRepository.create({
//     username,
//     email,
//     password: password_hash,
//   });
// }
