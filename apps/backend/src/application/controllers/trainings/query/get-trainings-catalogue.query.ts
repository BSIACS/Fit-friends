import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { TrainingTypeEnum } from '../../../../types/training-type.enum';
import { SortEnum } from '../../../../types/sort.enum';


export class GetTrainingsCatalogueQuery {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public minPrice: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public maxPrice: number;


  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public minCalories: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public maxCalories: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public minRate: number;

  @IsNumber({})
  @Transform(({ value }) => Number(value))
  @IsOptional()
  public maxRate: number;

  @IsOptional()
  public trainingType: string;

  @IsEnum(SortEnum)
  @IsOptional()
  public sortDirection: SortEnum = SortEnum.ASC;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  public trainingsPerPage: number;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  public pageNumber: number;
}
