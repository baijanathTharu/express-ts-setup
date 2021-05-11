import { IsOptional, IsString, Length } from 'class-validator';

export class TweetDto {
  @Length(5, 100)
  @IsString()
  content: string;

  constructor({ content }: any) {
    this.content = content;
  }
}

export class UpdateTweetDto {
  @IsString()
  @Length(5, 100)
  content: string;

  constructor({ content }: any) {
    if (content) {
      this.content = content;
    }
  }
}
