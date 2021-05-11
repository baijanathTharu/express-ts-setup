import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;

  constructor({ page, limit }: any) {
    if (page) {
      this.page = parseInt(page);
    }
    if (limit) {
      this.limit = parseInt(limit);
    }
  }
}
