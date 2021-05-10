import { mapPayloadToRepo } from '@shared/functions';
import { getRepository } from 'typeorm';
import { IUser } from './dto/user.dto';
import { User } from './user.entity';

/**
 * This adds user to database
 *
 * @param user IUser
 * @returns user
 */
export async function addUserService(payload: IUser): Promise<User> {
  const userRepo = getRepository(User);

  // const userToSave = new User();

  // userToSave.name = payload.name;
  // userToSave.description = payload.description;
  // userToSave.filename = payload.filename;
  // userToSave.isPublished = payload.isPublished as string;
  // userToSave.views = 1;

  const userToSave = mapPayloadToRepo(payload, User);

  const savedUser = await userRepo.save(userToSave);
  return savedUser;
}

/**
 * This gets user by id
 *
 * @param id userId
 * @returns user
 */
export async function getUserService(id: number): Promise<User> {
  const userRepo = getRepository(User);
  const user = await userRepo.findOne(id);

  if (!user) throw `user with id - ${id} not found`;

  return user;
}

/**
 * This gets all users
 *
 * @returns users
 */
export async function getAllUsersService(): Promise<User[]> {
  const userRepo = getRepository(User);
  const users = await userRepo.find();

  return users;
}

export async function updateUserService(
  id: number,
  payload: IUser
): Promise<User> {
  const { name, description, isPublished, views, filename } = payload;

  const userToUpdate = await getUserService(id);

  // if (name) {
  //   userToUpdate.name = name;
  // }
  // if (description) {
  //   userToUpdate.description = description;
  // }
  // if (isPublished) {
  //   userToUpdate.isPublished = isPublished as string;
  // }
  // if (views) {
  //   userToUpdate.views = views;
  // }
  // if (filename) {
  //   userToUpdate.filename = filename;
  // }

  const updateIt = mapPayloadToRepo(payload, userToUpdate);

  const userRepo = getRepository(User);

  const savedUser = await userRepo.save(updateIt);

  return savedUser;
}

/**
 * This removes user by id
 *
 * @param id userId
 * @returns
 */
export async function deleteUserService(id: number): Promise<any> {
  const user = await getUserService(id);

  const userRepo = getRepository(User);

  const deleted = await userRepo.remove(user);
  return deleted;
}
