import { Request, Response } from 'express';
import { makeUpdateProfileUseCase } from '@/use-cases/factories/make-update-profile-use-case';
import { z } from 'zod';

export async function updateProfile(req: Request, res: Response) {
  const updateProfileBodySchema = z.object({
    username: z.string().min(3).optional(),
    password: z.string().min(6).optional(),
    avatarUrl: z.string().min(3).optional(),
  });

  const { username, password, avatarUrl } = updateProfileBodySchema.parse(
    req.body,
  );

  try {
    const updateUserUseCase = makeUpdateProfileUseCase();

    await updateUserUseCase.execute({
      userId: req.user.sub,
      username,
      password,
      avatarUrl,
    });

    return res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Failed to update user' });
  }
}
