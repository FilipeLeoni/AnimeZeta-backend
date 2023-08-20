import { Request, Response } from 'express';
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';

export async function profile(req: Request, res: Response) {
  try {
    const getUserProfile = makeGetUserProfileUseCase();

    const { user } = await getUserProfile.execute({
      userId: req.user.sub,
    });

    return res.status(200).json({
      user,
    });
  } catch (err) {
    return res.status(500).send();
  }
}
