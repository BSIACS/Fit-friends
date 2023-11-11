import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEnum, IsInt, IsOptional, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { LocationEnum } from '../../../types/location.enum';
import { SexEnum } from '../../../types/sex.enum';
import { TrainingDurationEnum } from '../../../types/training-duration.enum';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { UUID } from '../../../types/uuid.type';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  id: UUID;

  @ApiProperty({
    description: 'User name',
    example: 'Наталья',
  })
  @Matches(/^[a-zа-яА-Я]+$/i)
  @MinLength(1)
  @MaxLength(15)
  @IsOptional()
  name?: string;

  //avatar: string;

  @ApiProperty({
    description: 'User`s sex',
    example: 'female'
  })
  @IsEnum(SexEnum)
  @IsOptional()
  sex?: SexEnum;

  @ApiProperty({
    description: 'User birth date',
    example: '1990-03-12',
  })
  @IsOptional()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    description: 'User information',
    example: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой.',
  })
  @MinLength(10)
  @MaxLength(140)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Metro station',
    example: 'Petrogradskaya',
  })
  @IsEnum(LocationEnum)
  @IsOptional()
  location?: LocationEnum;

  @ApiProperty({
    description: 'Users`s training level',
    example: 'amateur',
  })
  @IsEnum(TrainingLevelEnum)
  @IsOptional()
  trainingLevel?: TrainingLevelEnum;

  @ApiProperty({
    description: 'Training types',
    example: ['box', 'yoga'],
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
  })
  @IsEnum(TrainingDurationEnum)
  @IsOptional()
  trainingDuration?: TrainingDurationEnum;

  @ApiProperty({
    description: 'Number of calories to lose',
    example: 5000,
  })
  @IsInt()
  @Min(1000)
  @Max(5000)
  @IsOptional()
  calories?: number;

  @ApiProperty({
    description: 'Number of calories to burn per day',
    example: 1000,
  })
  @IsInt()
  @Min(1000)
  @Max(5000)
  @IsOptional()
  caloriesPerDay?: number;

  @ApiProperty({
    description: 'Ready for training',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isReadyForTraining?: boolean;
}
