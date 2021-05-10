/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from 'express';

import {
  PRIVATE_KEY_FOR_ACCESSTOKEN,
  PRIVATE_KEY_FOR_REFRESHTOKEN,
} from '@shared/constants';
import { createToken, encryptPassword, wrapPromise } from '@shared/functions';

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

  // encrypt password
  const [encrypted, encryptErr] = await wrapPromise(
    encryptPassword(payload.password)
  );
  if (encryptErr) throw encryptErr;
  payload.password = encrypted;

  const user = await addUserService(payload);

  // Todo: create tokens
  const [accessToken, accessTokenErr] = await wrapPromise(
    createToken(payload, PRIVATE_KEY_FOR_ACCESSTOKEN, 60 * 15)
  );
  if (accessTokenErr) throw accessTokenErr;
  const [refreshToken, refreshTokenErr] = await wrapPromise(
    createToken(payload, PRIVATE_KEY_FOR_REFRESHTOKEN, 60 * 60 * 24 * 7)
  );
  if (refreshTokenErr) throw refreshTokenErr;

  res.json({ data: user, accessToken, refreshToken });
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

  // encrypt password
  if (payload.password) {
    const [encrypted, encryptErr] = await wrapPromise(
      encryptPassword(payload.password)
    );
    if (encryptErr) throw encryptErr;
    payload.password = encrypted;
  }

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
