import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../app/config';
import User from '../app/modules/auth/auth.model';


// Extend Express Request type (IMPORTANT)

const auth = (...requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Get token safely
      const authHeader = req.headers.authorization;

      const token =
        req.cookies?.accessToken ||
        (authHeader ? authHeader.split(' ')[1] : undefined);

      // 2. Validate token exists
      if (!token || typeof token !== 'string') {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: no token provided',
        });
      }

      // 3. Verify token
      const decoded = jwt.verify(
        token,
        config.jwt_secret_token as string,
      ) as JwtPayload;

      if (!decoded?.email) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email',
        });
      }

      // 4. Find user
      const user = await User.findOne({ email: decoded.email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

      // 5. Role check
      if (
        requiredRoles.length > 0 &&
        !requiredRoles.includes(user.role as string)
      ) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: insufficient permissions',
        });
      }

      // 6. Attach user to request
      req.user = user;

      next();
    } catch (error) {
      console.error('Auth error:', error);

      return res.status(401).json({
        success: false,
        message: 'Authentication failed',
      });
    }
  };
};

export default auth;
