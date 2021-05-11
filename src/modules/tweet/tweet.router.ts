import { authorize } from '@shared/middlewares/authorize';
import { errorHandler } from '@shared/middlewares/errorHandler';
import { validateOrRejectDtos } from '@shared/middlewares/validateOrReject';
import { Router } from 'express';
import { TweetDto, UpdateTweetDto } from './dto/tweet.dto';
import {
  addTweet,
  deleteTweet,
  getTweets,
  getTweet,
  updateTweet,
} from './tweet.controller';

const twitterRouter = Router();

twitterRouter.get('/', authorize, errorHandler(getTweets));
twitterRouter.post(
  '/',
  validateOrRejectDtos(TweetDto, 'body'),
  authorize,
  errorHandler(addTweet)
);
twitterRouter.get('/:id', authorize, errorHandler(getTweet));
twitterRouter.delete('/:id', authorize, errorHandler(deleteTweet));
twitterRouter.patch(
  '/:id',
  validateOrRejectDtos(UpdateTweetDto, 'body'),
  authorize,
  errorHandler(updateTweet)
);

export default twitterRouter;
