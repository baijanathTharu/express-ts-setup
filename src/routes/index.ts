import { authorize } from '@shared/middlewares/authorize';
import { Router } from 'express';
import authRouter from 'src/modules/auth/auth.router';
import twitterRouter from 'src/modules/tweet/tweet.router';
import userRouter from 'src/modules/user/user.router';

// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/auth', authRouter);
baseRouter.use('/tweets', twitterRouter);

export default baseRouter;
