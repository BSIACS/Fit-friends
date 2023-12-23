import { IsBoolean, IsEnum, IsInt, IsUUID, MaxLength, MinLength, Validate } from 'class-validator';
import { TrainingLevelEnum } from '../../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../../types/training-type.enum';
import { TrainingDurationEnum } from '../../../../types/training-duration.enum';
import { SexEnum } from '../../../../types/sex.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';


export class CreateTrainingDto {
  @ApiProperty({
    description: 'Training name',
    example: 'TECHNIQUE TRAINING',
  })
  @MinLength(1)
  @MaxLength(15)
  name: string;

  @ApiProperty({
    description: 'Background image',
    example: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
  })
  backgroundImgFileName: string;

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
  @IsInt()
  @Validate((value) => +value >= 0)
  @Transform(({value}) => +value)
  price: number;

  @ApiProperty({
    description: 'Number of calories to lose',
    example: '5000',
  })
  @IsInt()
  @Validate((value) => +value >= 1000 && +value <= 5000)
  @Transform(({value}) => +value)
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
    description: 'Trainer, training creator',
    example: '6c81306f-beb0-495d-a044-4fc6a2209724',
  })
  @IsUUID()
  trainingCreatorId: string;
}
