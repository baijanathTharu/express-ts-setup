import { Router } from 'express';
import authRouter from 'src/modules/auth/auth.router';
import userRouter from 'src/modules/user/user.router';

// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
baseRouter.use('/auth', authRouter);

export default baseRouter;
