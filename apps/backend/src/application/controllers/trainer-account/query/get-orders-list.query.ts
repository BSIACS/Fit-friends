import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';


export class GetOrdersQuery{
  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  public ordersPerPage: number;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  public pageNumber: number;

  @IsOptional()
  public sortBy: string;

  @IsOptional()
  public sortDirection: string;
}
