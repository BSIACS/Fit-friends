import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsNumber, IsNumberString, IsOptional, IsString, Max, Min } from 'class-validator';
import { TrainingDurationEnum } from '../../../types/training-duration.enum';
import { Transform } from 'class-transformer';


export class GetTrainingsListQuery{
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({},{each: true})
  @Transform(({value}) => [Number(+value[0]), Number(value[1])])
  @IsOptional()
  public priceRange: number[];

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({},{each: true})
  @Transform(({value}) => [Number(+value[0]), Number(value[1])])
  @IsOptional()
  public caloriesRange: number[];

  @IsNumber()
  @Min(1)
  @Max(5)
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  public rate: number;

  @IsEnum(TrainingDurationEnum)
  @IsOptional()
  public duration: string;
}
