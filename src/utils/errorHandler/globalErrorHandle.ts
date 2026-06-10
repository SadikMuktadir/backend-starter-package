/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { TErrorResponse } from './typeDefine';
import { handleZodError } from './handleZodError';
import { handleCastError } from './handleCastError';
import { handleValidationError } from './handleValidationError';
import { handleDuplicateError } from './handleDuplicateError';
import { handleGenericsError } from './handleGenericsError';

const globalErrorHandler = (
  err: TErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name && err.name === 'ZodError') {
    handleZodError(err, res);
  } else if (err instanceof mongoose.Error.CastError) {
    handleCastError(err, res);
  } else if (err instanceof mongoose.Error.ValidationError) {
    handleValidationError(err, res);
  } else if (err.code && err.code === 11000) {
    handleDuplicateError(err, res);
  } else if (err instanceof Error) {
    handleGenericsError(err, res);
  }
};
export default globalErrorHandler;
