import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TErrorResponse } from './typeDefine';

export const handleGenericsError = (err: TErrorResponse, res: Response) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    name: err.name,
    message: err.message,
    error: err,
  });
};
