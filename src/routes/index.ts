import { Router } from 'express';
import userRouter from 'src/modules/user/user.router';

// Export the base-router
const baseRouter = Router();
baseRouter.use('/users', userRouter);
export default baseRouter;
