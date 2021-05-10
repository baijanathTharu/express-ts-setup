import { IsOptional, IsString, Length } from 'class-validator';

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export class UserDto implements IUser {
  @Length(10, 20)
  username: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  constructor({ username, email, password }: any) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export class UpdateUserDto implements IUser {
  @Length(10, 20)
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  constructor({ username, email, password }: any) {
    if (username) {
      this.username = username;
    }
    if (email) {
      this.email = email;
    }
    if (password) {
      this.password = password;
    }
  }
}
