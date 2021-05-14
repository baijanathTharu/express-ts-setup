import { getRepository } from 'typeorm';
import { Tweet } from './tweet.entity';

export async function addTweetByUserIdService(
  payload: any,
  userId: number
): Promise<Tweet> {
  const tweetRepo = getRepository(Tweet);

  const tweet = new Tweet();

  tweet.content = payload.content;
  tweet.userId = userId;

  const savedTweet = await tweetRepo.save(tweet);

  return savedTweet;
}

export async function getTweetsByUserIdService(
  userId: number,
  page = 1,
  limit = 10
): Promise<Tweet[]> {
  const skipItems = (page - 1) * limit;

  const tweetRepo = getRepository(Tweet);

  const tweets = await tweetRepo
    .createQueryBuilder()
    .where({ userId })
    .limit(limit)
    .skip(skipItems)
    .getMany();

  return tweets;
}

export async function getTweetByTweetIdService(
  userId: number,
  tweetId: number
): Promise<Tweet | undefined> {
  const tweetRepo = getRepository(Tweet);

  const tweet = await tweetRepo.findOne(tweetId);

  return tweet;
}

export async function deleteTweetService(
  userId: number,
  tweetId: number
): Promise<Tweet> {
  const tweetRepo = getRepository(Tweet);

  const tweetToDelete = await getTweetByTweetIdService(userId, tweetId);

  if (userId !== tweetToDelete?.userId) {
    throw 'not permitted';
  }

  const deleted = await tweetRepo.remove(tweetToDelete);

  return deleted;
}

export async function updateTweetService(
  payload: any,
  userId: number,
  tweetId: number
): Promise<Tweet | undefined> {
  const tweetRepo = getRepository(Tweet);

  const tweetToUpdate = await tweetRepo.findOne(tweetId);

  if (tweetToUpdate?.userId !== userId) throw 'not permitted';

  if (tweetToUpdate) {
    tweetToUpdate.content = payload.content;

    const savedTweet = await tweetRepo.save(tweetToUpdate);
    return savedTweet;
  }
}
