import { IsBoolean, IsEnum, IsInt, IsNumber, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { TrainingDurationEnum } from '../../../types/training-duration.enum';
import { SexEnum } from '../../../types/sex.enum';
import { ApiProperty } from '@nestjs/swagger';


export class CreateTrainingDto {
  @ApiProperty({
    description: 'Training name',
    example: 'Пархай как бабочка, жаль как пчела',
  })
  @MinLength(1)
  @MaxLength(15)
  name: string;

  @ApiProperty({
    description: 'Background image',
    example: '',
  })
  backgroundImgSrc: string;                    //jpg/png взять из макета

  @ApiProperty({
    description: 'The user level for which the training is designed',
    example: 'pro',
  })
  @IsEnum(TrainingLevelEnum)
  trainingLevel: TrainingLevelEnum;

  @ApiProperty({
    description: 'Training type',
    example: 'box',
  })
  @IsEnum(TrainingTypeEnum)
  trainingType: TrainingTypeEnum;

  @ApiProperty({
    description: 'Duration of the training in minutes',
    example: '80-100',
  })
  @IsEnum(TrainingDurationEnum)
  trainingDuration: TrainingDurationEnum;

  @ApiProperty({
    description: 'Cost of training in rubles',
    example: 3042,
  })
  @Min(0)
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Number of calories',
    example: 1000,
  })
  @Min(1000)
  @Max(5000)
  @IsInt()
  calories: number;

  @ApiProperty({
    description: 'Training description',
    example: 'Тактические тренировки помогают боксерам развивать свою тактику в бою и учиться читать соперника. На таких тренировках спортсмены могут изучать видеозаписи своих боев и боев других боксеров, анализировать ошибки и разрабатывать новые тактические приемы.',
  })
  @MinLength(10)
  @MaxLength(140)
  description: string;

  @ApiProperty({
    description: 'Sex of the user for whom the training is intended',
    example: 'male',
  })
  @IsEnum(SexEnum)
  sex: SexEnum;

  @ApiProperty({
    description: 'Video file demonstrating training',
    example: '',
  })
  videoDemoSrc: string;                        //mov/avi/mp4


  @ApiProperty({
    description: 'Training rating',
    example: 0,
  })
  rating: number;

  @ApiProperty({
    description: 'Trainer, training creator',
    example: '6c81306f-beb0-495d-a044-4fc6a2209724',
  })
  @IsUUID()
  trainingCreatorId: string;

  @ApiProperty({
    description: 'The flag identifies the training participation as a special offer',
    example: false,
  })
  @IsBoolean()
  isSpecial: boolean;
}
