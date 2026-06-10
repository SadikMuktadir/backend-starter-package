/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const handleZodError = (err: any, res: Response) => {
  const issue = err.issues.map((item: any) => {
    return {
      path: item.path.join(' '),
      message: item.message,
    };
  });
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: `${err.message}`,
    issue: issue,
    error: err,
  });
};
