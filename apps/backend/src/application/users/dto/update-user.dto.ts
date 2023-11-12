import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsNumberString, IsOptional, IsUUID, Matches, Max, MaxLength, Min, MinLength, Validate } from 'class-validator';
import { LocationEnum } from '../../../types/location.enum';
import { SexEnum } from '../../../types/sex.enum';
import { TrainingDurationEnum } from '../../../types/training-duration.enum';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { UUID } from '../../../types/uuid.type';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsUUID()
  id: UUID;

  @ApiProperty({
    description: 'User name',
    example: 'Наталья',
    required: false
  })
  @Matches(/^[a-zа-яА-Я]+$/i)
  @MinLength(1)
  @MaxLength(15)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'User`s sex',
    example: 'female',
    required: false
  })
  @IsEnum(SexEnum)
  @IsOptional()
  sex?: SexEnum;

  @ApiProperty({
    description: 'User birth date',
    example: '1990-03-12',
    required: false
  })
  @IsOptional()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    description: 'User information',
    example: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой.',
    required: false
  })
  @MinLength(10)
  @MaxLength(140)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Metro station',
    example: 'Petrogradskaya',
    required: false
  })
  @IsEnum(LocationEnum)
  @IsOptional()
  location?: LocationEnum;

  @ApiProperty({
    description: 'Users`s training level',
    example: 'amateur',
    required: false
  })
  @IsEnum(TrainingLevelEnum)
  @IsOptional()
  trainingLevel?: TrainingLevelEnum;

  @ApiProperty({
    description: 'Training types',
    example: ['box', 'yoga'],
    required: false
  })
  @IsArray({ message: 'Field trainingType must be an array' })
  @ArrayMinSize(0)
  @ArrayMaxSize(3)
  @IsEnum(TrainingTypeEnum, { each: true })
  @IsOptional()
  trainingType?: TrainingTypeEnum[];

  @ApiProperty({
    description: 'Training duration',
    example: '50-80',
    required: false
  })
  @IsEnum(TrainingDurationEnum)
  @IsOptional()
  trainingDuration?: TrainingDurationEnum;

  @ApiProperty({
    description: 'Number of calories to lose',
    example: '5000',
    type: 'string',
    required: false
  })
  @IsNumberString()
  @Validate((value) => +value >= 1000 && +value <= 5000)
  @Transform(({value}) => +value)
  @IsOptional()
  calories?: number;

  @ApiProperty({
    description: 'Number of calories to burn per day',
    example: '1000',
    type: 'string',
    required: false
  })
  @IsNumberString()
  @Validate((value) => +value >= 1000 && +value <= 5000)
  @Transform(({value}) => +value)
  @IsOptional()
  caloriesPerDay?: number;

  @ApiProperty({
    description: 'Ready for training',
    example: 'true',
    type: 'string',
    required: false
  })
  @Validate((value) => value === 'false' || value === 'true')
  @Transform(({value}) => value === 'true')
  @IsOptional()
  isReadyForTraining?: boolean;
}
