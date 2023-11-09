import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { SortEnum } from '../../../types/sort.enum';


export class GetTrainingsCatalogueQuery{
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

  @IsEnum(TrainingTypeEnum)
  @IsOptional()
  public trainingType: string;

  @IsEnum(SortEnum)
  @IsOptional()
  public sortDirection: SortEnum = SortEnum.ASC;
}
