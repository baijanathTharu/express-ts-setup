/* eslint-disable @typescript-eslint/no-misused-promises */
import { authorize } from '@shared/middlewares/authorize';
import { errorHandler } from '@shared/middlewares/errorHandler';
import { validateOrRejectDtos } from '@shared/middlewares/validateOrReject';
import { Router } from 'express';
import { UpdateUserDto, UserDto } from './dto/user.dto';
import {
  addUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from './user.controller';

const userRouter = Router();

userRouter.get('/', errorHandler(getUsers));
userRouter.post('/', validateOrRejectDtos(UserDto), errorHandler(addUser));
userRouter.get('/:id', errorHandler(authorize), errorHandler(getUser));
userRouter.patch(
  '/:id',
  validateOrRejectDtos(UpdateUserDto),
  errorHandler(authorize),
  errorHandler(updateUser)
);
userRouter.delete('/:id', errorHandler(deleteUser));

export default userRouter;
