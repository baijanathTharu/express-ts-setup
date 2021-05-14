import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  addTweetByUserIdService,
  deleteTweetService,
  getTweetByTweetIdService,
  getTweetsByUserIdService,
  updateTweetService,
} from './tweet.service';

const { FORBIDDEN } = StatusCodes;

export async function getTweetsByUserId(
  req: Request,
  res: Response
): Promise<void> {
  // const userId = req.userId as number;
  const userId = req.params.id;
  let page = 1,
    limit = 10;
  if (req.query) {
    page = req.query.page as number;
    limit = req.query.limit as number;
  }
  const tweets = await getTweetsByUserIdService(parseInt(userId), page, limit);

  res.json({
    data: tweets,
    page,
  });
}

export async function getTweetByTweetId(
  req: Request,
  res: Response
): Promise<void> {
  const userId = req.userId as number;
  const tweetId = req.params.id;
  let page = 1,
    limit = 10;
  if (req.query) {
    page = req.query.page as number;
    limit = req.query.limit as number;
  }

  const tweet = await getTweetByTweetIdService(userId, parseInt(tweetId));

  // console.log({ userId, twetUser: tweet?.userId });

  // if (tweet && tweet.userId !== userId) {
  //   res.status(FORBIDDEN).json({
  //     error: 'not permitted',
  //   });
  //   return;
  // }

  res.json({
    data: tweet,
  });
}

export async function addTweetByUserId(
  req: Request,
  res: Response
): Promise<void> {
  const payload = req.body as any;

  const userId = req.userId as number;

  const addedTweet = await addTweetByUserIdService(payload, userId);

  res.json({
    data: addedTweet,
  });
}

export async function updateTweet(req: Request, res: Response): Promise<void> {
  const payload = req.body as any;
  const tweetId = req.params.id;
  const userId = req.userId as number;

  const updatedTweet = await updateTweetService(
    payload,
    userId,
    parseInt(tweetId)
  );

  res.json({
    data: updatedTweet,
  });
}

export async function deleteTweet(req: Request, res: Response): Promise<void> {
  const userId = req.userId as number;
  const tweetId = req.params.id;

  const deleted = await deleteTweetService(userId, parseInt(tweetId));

  res.json({
    data: deleted,
  });
}
