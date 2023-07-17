import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';

export async function profile(req: Request, res: Response) {
  try {
    const getUserProfile = makeGetUserProfileUseCase();

    const { user } = await getUserProfile.execute({
      userId: req.user.sub,
    });

    return res.status(200).json({
      user: {
        ...user,
        password: undefined,
      },
    });
  } catch (err) {
    return res.status(500).send();
  }
}
