import { IsBoolean, IsEnum, IsInt, IsNumber, IsOptional, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { TrainingDurationEnum } from '../../../types/training-duration.enum';
import { SexEnum } from '../../../types/sex.enum';
import { UUID } from '../../../types/uuid.type';


export class UpdateTrainingDto {
  @IsUUID()
  id: UUID;

  @MinLength(1)
  @MaxLength(15)
  @IsOptional()
  name?: string;

  @IsOptional()
  backgroundImg?: string;                    //jpg/png взять из макета

  @IsEnum(TrainingLevelEnum)
  @IsOptional()
  trainingLevel?: TrainingLevelEnum;

  @IsEnum(TrainingTypeEnum)
  @IsOptional()
  trainingType?: TrainingTypeEnum;

  @IsEnum(TrainingDurationEnum)
  @IsOptional()
  trainingDuration?: TrainingDurationEnum;

  @Min(0)
  @IsNumber()
  @IsOptional()
  price?: number;

  @Min(1000)
  @Max(5000)
  @IsInt()
  @IsOptional()
  calories?: number;

  @MinLength(10)
  @MaxLength(140)
  @IsOptional()
  description?: string;

  @IsEnum(SexEnum)
  @IsOptional()
  sex?: SexEnum;

  @IsOptional()
  videoDemoSrc?: string;                        //mov/avi/mp4

  @IsOptional()
  rating?: number;

  @IsUUID()
  @IsOptional()
  trainingCreatorId?: string;

  @IsBoolean()
  @IsOptional()
  isSpecial?: boolean;
}
