/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export {};
