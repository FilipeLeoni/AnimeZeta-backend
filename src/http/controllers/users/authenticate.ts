import { Request, Response } from 'express';
import { z } from 'zod';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';
import { env } from '@/env';
import { sign } from 'jsonwebtoken';

export async function authenticate(req: Request, res: Response) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(req.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const accessToken = sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: '1h',
    });

    const refreshToken = sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: '7d',
    });

    return res
      .cookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
        signed: false,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .status(200)
      .json({ accessToken });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(400).send({ message: err.message });
    }

    return res.status(500).send();
  }
}
