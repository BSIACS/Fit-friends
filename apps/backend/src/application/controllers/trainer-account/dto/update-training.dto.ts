import { IsBoolean, IsEnum, IsInt, IsOptional, IsUUID, MaxLength, MinLength, Validate } from 'class-validator';
import { TrainingLevelEnum } from '../../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../../types/training-type.enum';
import { TrainingDurationEnum } from '../../../../types/training-duration.enum';
import { SexEnum } from '../../../../types/sex.enum';
import { UUID } from '../../../../types/uuid.type';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';


export class UpdateTrainingDto {
  @ApiProperty({
    description: 'Training unique Id',
    example: '59bce336-fc4f-4a72-8840-ae903102caf9',
  })
  @IsUUID()
  @IsOptional()
  id?: UUID;

  @ApiProperty({
    description: 'Training name',
    example: 'TECHNIQUE TRAINING',
    required: false
  })
  @MinLength(1)
  @MaxLength(15)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Background image',
    example: 'cc8e3b0e8be3d74cf94c2375a4dff6ff',
    required: false
  })
  backgroundImgFileName?: string;

  @ApiProperty({
    description: 'The user level for which the training is designed',
    example: 'pro',
    required: false
  })
  @IsEnum(TrainingLevelEnum)
  @IsOptional()
  trainingLevel: TrainingLevelEnum;

  @ApiProperty({
    description: 'Training type',
    example: 'box',
    required: false
  })
  @IsEnum(TrainingTypeEnum)
  @IsOptional()
  trainingType?: TrainingTypeEnum;

  @ApiProperty({
    description: 'Duration of the training in minutes',
    example: '80-100',
    required: false
  })
  @IsEnum(TrainingDurationEnum)
  @IsOptional()
  trainingDuration?: TrainingDurationEnum;

  @ApiProperty({
    description: 'Cost of training in rubles',
    example: 3042,
    required: false
  })
  @IsInt()
  @Validate((value) => +value >= 0)
  @Transform(({value}) => +value)
  @IsOptional()
  price?: number;

  @ApiProperty({
    description: 'Number of calories to lose',
    example: '5000',
    required: false
  })
  @IsInt()
  @Validate((value) => +value >= 1000 && +value <= 5000)
  @Transform(({value}) => +value)
  @IsOptional()
  calories?: number;

  @ApiProperty({
    description: 'Training description',
    example: 'Тактические тренировки помогают боксерам развивать свою тактику в бою и учиться читать соперника. На таких тренировках спортсмены могут изучать видеозаписи своих боев и боев других боксеров, анализировать ошибки и разрабатывать новые тактические приемы.',
    required: false
  })
  @MinLength(10)
  @MaxLength(140)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Sex of the user for whom the training is intended',
    example: 'male',
    required: false
  })
  @IsEnum(SexEnum)
  @IsOptional()
  sex?: SexEnum;

  @ApiProperty({
    description: 'Trainer, training creator',
    example: '6c81306f-beb0-495d-a044-4fc6a2209724',
    required: false
  })
  @IsUUID()
  @IsOptional()
  trainingCreatorId?: string;

  @ApiProperty({
    description: 'The flag identifies the training participation as a special offer',
    example: false,
    required: false
  })
  @Transform(({value}) => value === 'true')
  @IsBoolean()
  @IsOptional()
  isSpecial?: boolean;
}
