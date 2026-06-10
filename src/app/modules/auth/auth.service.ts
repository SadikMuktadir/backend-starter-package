import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import { ILoginUser, IRegisterUser } from './auth.interface';
import User from './auth.model';
import config from '../../config';

const registerUser = async (payload: IRegisterUser) => {
  const hashedPassword = await bcrypt.hash(payload.password, 12);
  const userData = { ...payload, password: hashedPassword };
  const result = await User.create(userData);
  const token = jwt.sign(
    {
      _id: result?._id,
      email: result?.email,
      role: result?.role,
    },
    config.jwt_secret_token || 'jwt-secret-token',
    { expiresIn: '30d' },
  );

  return { token, user: result };
};

const loginUser = async (payload: ILoginUser) => {
  const result = await User.findOne({
    email: payload?.email,
  }).select('+password');

  if (!result) {
    throw new Error('User not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    result?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Invalid credentials');
  }

  if (!config.jwt_secret_token) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign(
    {
      _id: result?._id,
      email: result?.email,
      role: result?.role,
    },
    config.jwt_secret_token || 'jwt-secret-token',
    { expiresIn: '30d' },
  );

  return { token, user: result };
};

export const authService = {
  registerUser,
  loginUser,
};
