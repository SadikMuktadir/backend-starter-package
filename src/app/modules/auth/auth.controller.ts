import { Request, Response } from 'express';
import { authService } from './auth.service';
import catchAsync from '../../../utils/catchAsync';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);

  res.cookie('accessToken', result.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(201).send({
    success: true,
    message: 'User created successfully',
    token: result.token,
    data: result.user,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  res.cookie('accessToken', result.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  res.status(201).send({
    success: true,
    message: 'User login successfully',
    token: result?.token,
    data: result?.user,
  });
});
export const authController = {
  registerUser,
  loginUser,
};
