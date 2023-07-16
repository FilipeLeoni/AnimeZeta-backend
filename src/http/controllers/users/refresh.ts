import { Request, Response } from 'express';
import { z } from 'zod';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case';
import { env } from '@/env';
import { sign, verify, JwtPayload } from 'jsonwebtoken';

export async function refresh(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Token de refresh ausente' });
    }

    try {
      const decoded = verify(refreshToken, env.JWT_SECRET) as JwtPayload;

      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return res.status(401).json({ message: 'Token de refresh expirado' });
      }

      const accessToken = sign({ sub: decoded.sub }, env.JWT_SECRET, {
        expiresIn: '1h',
      });

      const newRefreshToken = sign({ sub: decoded.sub }, env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('refreshToken', newRefreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
        signed: false,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      return res.status(200).json({ accessToken });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Erro ao processar o token de refresh' });
    }
  } catch (error) {
    const refreshToken = req;
    return console.log(refreshToken);
  }
}
