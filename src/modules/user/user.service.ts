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

export async function getUserByEmailOrUsername(
  email: string | undefined,
  username: string | undefined
): Promise<User> {
  const userRepo = getRepository(User);
  const user = await userRepo.find({
    where: [{ username: username }, { email: email }],
  });
  // console.log('user: ', user);
  return user[0];
}

/**
 * This gets all users
 *
 * @returns users
 */
export async function getAllUsersService(
  page = 1,
  limit = 10
): Promise<User[]> {
  const userRepo = getRepository(User);

  const skipItems = (page - 1) * limit;

  const users = await userRepo
    .createQueryBuilder('user')
    .orderBy('user.createdAt', 'DESC')
    .offset(skipItems)
    .limit(limit)
    .getMany();

  return users;
}

export async function updateUserService(
  id: number,
  payload: IUser
): Promise<User> {
  const userToUpdate = await getUserService(id);

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
export async function deleteUserService(id: number): Promise<User> {
  const user = await getUserService(id);

  const userRepo = getRepository(User);

  const deleted = await userRepo.remove(user);
  return deleted;
}
