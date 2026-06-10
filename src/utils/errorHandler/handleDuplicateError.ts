import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { TErrorResponse } from './typeDefine';


export const handleDuplicateError = (err: TErrorResponse, res: Response) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: err.errorResponse.errmsg,
    error: err,
  });
};
