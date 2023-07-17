import { Request, Response } from 'express';
import { z } from 'zod';
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
  return res.status(201).send('User Created');
}
