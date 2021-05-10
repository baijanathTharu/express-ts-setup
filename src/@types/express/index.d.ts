import { User } from 'src/modules/user/user.entity';

declare module 'express' {
  export interface Request {
    body: {
      user: User;
    };
  }
}
