import { Request } from 'express';
import { UserDto } from 'src/modules/user/dto/user.dto';
import { User } from 'src/modules/user/user.entity';

declare module 'express' {
  export interface Request {
    body: {
      user: User;
    };
    userId?: number;
  }
}
