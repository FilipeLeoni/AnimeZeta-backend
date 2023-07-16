import { prisma } from '@/lib/prisma';
import { Request, Response } from 'express';
import { z } from 'zod';
import { hash } from 'bcryptjs';
import { RegisterUseCase } from '@/use-cases/register';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-alredy-exists';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';

export async function register(req: Request, res: Response) {
  const registerBodySchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { username, email, password } = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      username,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message });
    }

    return res.status(500).send();
  }
  console.log('user created');
  return res.status(201).send();
}

export async function getUser(req: Request, res: Response) {
  // Lógica para obter um usuário
}

export async function updateUser(req: Request, res: Response) {
  // Lógica para atualizar um usuário
}

export async function deleteUser(req: Request, res: Response) {
  // Lógica para excluir um usuário
}

// export async function createUser(req: Request, res: Response) {
//   const createUserSchema = z.object({
//     username: z.string().min(3),
//     email: z.string().email(),
//     password: z.string().min(6),
//   });

//   const { username, email, password } = createUserSchema.parse(req.body);

//   try {
//     await CreateUserUseCase({
//       username,
//       email,
//       password,
//     });
//     console.log('user created');
//     return res.status(201).send();
//   } catch (error: any) {
//     if (error.message === 'User already exists') {
//       return res.status(409).json({ error: 'User already exists' });
//     }

//     console.error('Error creating user:', error);
//     return res.status(500).json({ error: 'Failed to create user' });
//   }
// }
