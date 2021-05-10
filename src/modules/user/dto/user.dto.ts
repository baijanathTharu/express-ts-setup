import {
  IsAlphanumeric,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export interface IUser {
  name: string;
  description: string;
  isPublished: string | boolean;
  views: number;
  filename: string;
}

export class UserDto implements IUser {
  @Length(10, 20)
  name: string;

  @IsString()
  description: string;

  @IsAlphanumeric()
  filename: string;

  @IsInt()
  views: number;

  @IsBoolean()
  isPublished: boolean;

  constructor({ name, description, filename, views, isPublished }: any) {
    if (isPublished === 'true') {
      isPublished = true;
    } else {
      isPublished = false;
    }
    this.name = name;
    this.description = description;
    this.filename = filename;
    this.views = parseInt(views);
    this.isPublished = isPublished;
  }
}

export class UpdateUserDto implements IUser {
  @Length(10, 20)
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsAlphanumeric()
  @IsOptional()
  filename: string;

  @IsInt()
  @IsOptional()
  views: number;

  @IsBoolean()
  @IsOptional()
  isPublished: boolean;

  constructor({ name, description, filename, views, isPublished }: any) {
    if (isPublished === 'true') {
      isPublished = true;
    } else {
      isPublished = false;
    }
    if (name) {
      this.name = name;
    }
    if (description) {
      this.description = description;
    }
    if (filename) {
      this.filename = filename;
    }
    if (views) {
      this.views = parseInt(views);
    }
    if (isPublished) {
      this.isPublished = isPublished;
    }
  }
}
