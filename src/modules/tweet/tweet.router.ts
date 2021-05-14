import { authorize } from '@shared/middlewares/authorize';
import { errorHandler } from '@shared/middlewares/errorHandler';
import { validateOrRejectDtos } from '@shared/middlewares/validateOrReject';
import { Router } from 'express';
import { TweetDto, UpdateTweetDto } from './dto/tweet.dto';
import {
  addTweetByUserId,
  deleteTweet,
  getTweetsByUserId,
  getTweetByTweetId,
  updateTweet,
} from './tweet.controller';

const twitterRouter = Router();

twitterRouter.post(
  '/',
  validateOrRejectDtos(TweetDto, 'body'),
  authorize,
  errorHandler(addTweetByUserId)
);
twitterRouter.get('/u/:id', authorize, errorHandler(getTweetsByUserId));
twitterRouter.get('/t/:id', authorize, errorHandler(getTweetByTweetId));
twitterRouter.delete('/t/:id', authorize, errorHandler(deleteTweet));
twitterRouter.patch(
  '/t/:id',
  validateOrRejectDtos(UpdateTweetDto, 'body'),
  authorize,
  errorHandler(updateTweet)
);

export default twitterRouter;
