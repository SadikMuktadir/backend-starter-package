import { Router } from 'express';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';
import validatedRequest from '../../../middlewares/validateRequest';

const authRouter = Router();

authRouter.post(
  '/register-user',
  validatedRequest(authValidation.registerUserValidationSchema),
  authController.registerUser,
);
authRouter.post(
  '/login-user',
  validatedRequest(authValidation.loginUserValidationSchema),
  authController.loginUser,
);

export default authRouter;
