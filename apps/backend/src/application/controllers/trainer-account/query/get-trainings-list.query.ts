import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from 'class-validator';
import { TrainingDurationEnum } from '../../../../types/training-duration.enum';
import { Transform } from 'class-transformer';


export class GetTrainingsListQuery{
  @IsNumber()
  @Transform(({value}) => Number(value))
  @IsOptional()
  public minPrice: number;

  @IsNumber()
  @Transform(({value}) => Number(value))
  @IsOptional()
  public maxPrice: number;


  @IsNumber()
  @Transform(({value}) => Number(value))
  @IsOptional()
  public minCalories: number;

  @IsNumber()
  @Transform(({value}) => Number(value))
  @IsOptional()
  public maxCalories: number;

  @IsNumber()
  @Transform(({value}) => Number(value))
  @IsOptional()
  public minRate: number;

  @IsNumber({})
  @Transform(({value}) => Number(value))
  @IsOptional()
  public maxRate: number;

  @IsOptional()
  public trainingDuration: string;

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
