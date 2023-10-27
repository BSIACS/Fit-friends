import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsOptional, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { LocationEnum } from '../../../types/location.enum';
import { SexEnum } from '../../../types/sex.enum';
import { TrainingDurationEnum } from '../../../types/training-duration.enum';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';

export class UpdateUserDto {
  @Matches(/^[a-zа-яА-Я]+$/i)
  @MinLength(1)
  @MaxLength(15)
  @IsOptional()
  name?: string;

  //avatar: string;

  @IsEnum(SexEnum)
  @IsOptional()
  sex?: SexEnum;

  @IsOptional()
  @IsOptional()
  birthDate?: Date;

  @MinLength(10)
  @MaxLength(140)
  @IsOptional()
  description?: string;

  @IsEnum(LocationEnum)
  @IsOptional()
  location?: LocationEnum;

  @IsEnum(TrainingLevelEnum)
  @IsOptional()
  trainingLevel?: TrainingLevelEnum;

  @IsArray({ message: 'Field trainingType must be an array' })
  @ArrayMinSize(0)
  @ArrayMaxSize(3)
  @IsEnum(TrainingTypeEnum, { each: true })
  @IsOptional()
  trainingType?: TrainingTypeEnum[];

  @IsEnum(TrainingDurationEnum)
  @IsOptional()
  trainingDuration?: TrainingDurationEnum;

  @IsInt()
  @Min(1000)
  @Max(5000)
  @IsOptional()
  calories?: number;

  @IsInt()
  @Min(1000)
  @Max(5000)
  @IsOptional()
  caloriesPerDay?: number;

  @IsBoolean()
  @IsOptional()
  isReadyForTraining?: boolean;
}
