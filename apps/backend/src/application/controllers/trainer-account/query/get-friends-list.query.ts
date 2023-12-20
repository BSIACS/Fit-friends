import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';


export class GetFriendsListQuery{
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  public friendsPerPage: number;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  public pageNumber: number;
}
