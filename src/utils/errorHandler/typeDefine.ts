/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorResponse = {
  [x: string]: any;
  code: number;
  errorResponse: any;
  success: boolean;
  message: string;
  error: any;
};
