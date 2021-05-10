/* eslint-disable @typescript-eslint/no-unsafe-call */
import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

import {
  addUserService,
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from './user.service';
import { validateOrReject } from 'class-validator';
import { IUser, UpdateUserDto, UserDto } from './dto/user.dto';

const { BAD_REQUEST, CREATED, OK, NOT_FOUND } = StatusCodes;

/**
 * Get a user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getUser(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);

  const user = await getUserService(id);

  res.json({ data: user });
}

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getUsers(req: Request, res: Response): Promise<void> {
  const users = await getAllUsersService();
  res.json({ users: users });
}

/**
 * Add one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function addUser(req: Request, res: Response): Promise<void> {
  const payload: IUser = req.body as any;

  // const userObj = new UserDto(payload);

  // try {
  //   await validateOrReject(userObj);

  //   const user = await addUserService(userObj);
  //   res.json({ data: user });
  // } catch (error) {
  //   if (error.length > 0) {
  //     res.json({ errors: error });
  //   }
  // }

  const user = await addUserService(payload);
  res.json({ data: user });
}

/**
 * Update one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function updateUser(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  const payload = req.body as any;

  // const userObj = new UpdateUserDto({
  //   ...payload,
  // });

  // validateOrReject(userObj)
  //   .then(async () => {
  //     const updatedUser = await updateUserService(id, userObj);
  //     res.json({ data: updatedUser });
  //   })
  //   .catch((error) => {
  //     if (error.length > 0) {
  //       res.json({ errors: error });
  //       return;
  //     }
  //   });

  const updatedUser = await updateUserService(id, payload);
  res.json({ data: updatedUser });
}

/**
 * Delete one user.
 *
 * @param req
 * @param res
 * @returns
 */
export async function deleteUser(req: Request, res: Response): Promise<void> {
  const id = parseInt(req.params.id);
  const deleted = await deleteUserService(id);

  res.json({ data: deleted });
}
