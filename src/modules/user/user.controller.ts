/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from 'express';

import {
  addUserService,
  deleteUserService,
  getAllUsersService,
  getUserService,
  updateUserService,
} from './user.service';
import { IUser } from './dto/user.dto';

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
