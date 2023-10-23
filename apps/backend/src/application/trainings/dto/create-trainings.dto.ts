import { IsBoolean, IsEnum, IsInt, IsNumber, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { TrainingDurationEnum } from '../../../types/training-duration.enum';
import { SexEnum } from '../../../types/sex.enum';


export class CreateTrainingDto {
  @MinLength(1)
  @MaxLength(15)
  name: string;

  backgroundImg: string;                    //jpg/png взять из макета

  @IsEnum(TrainingLevelEnum)
  trainingLevel: TrainingLevelEnum;

  @IsEnum(TrainingTypeEnum)
  trainingType: TrainingTypeEnum;

  @IsEnum(TrainingDurationEnum)
  trainingDuration: TrainingDurationEnum;

  @Min(0)
  @IsNumber()
  price: number;

  @Min(1000)
  @Max(5000)
  @IsInt()
  calories: number;

  @MinLength(10)
  @MaxLength(140)
  description: string;

  @IsEnum(SexEnum)
  sex: SexEnum;

  videoDemo: string;                        //mov/avi/mp4

  @IsUUID()
  trainingCreator: string;

  @IsBoolean()
  isSpecial: boolean;
}
