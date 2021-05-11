import { authorize } from '@shared/middlewares/authorize';
import { errorHandler } from '@shared/middlewares/errorHandler';
import { validateOrRejectDtos } from '@shared/middlewares/validateOrReject';
import { Router } from 'express';
import { UserDto, LoginUserDto } from '../user/dto/user.dto';
import { addUser } from '../user/user.controller';
import { loginController, tokenController } from './auth.controller';

const authRouter = Router();

authRouter.post(
  '/login',
  validateOrRejectDtos(LoginUserDto),
  errorHandler(loginController)
);
authRouter.post(
  '/signup',
  validateOrRejectDtos(UserDto),
  errorHandler(addUser)
);
authRouter.get('/token', errorHandler(tokenController));

export default authRouter;
