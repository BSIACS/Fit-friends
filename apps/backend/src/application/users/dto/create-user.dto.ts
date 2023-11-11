import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEmail, IsEnum, IsInt, IsNumberString, IsOptional, Matches, Max, MaxLength, Min, MinLength, Validate } from 'class-validator';
import { LocationEnum } from '../../../types/location.enum';
import { SexEnum } from '../../../types/sex.enum';
import { TrainingDurationEnum } from '../../../types/training-duration.enum';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Наталья',
  })
  @Matches(/^[a-zа-яА-Я]+$/i)
  @MinLength(1)
  @MaxLength(15)
  name: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'natalia@somemail.ru',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'testpass'
  })
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @ApiProperty({
    description: 'User`s sex',
    example: 'female'
  })
  @IsEnum(SexEnum)
  sex: SexEnum;

  @ApiProperty({
    description: 'User birth date',
    example: '1990-03-12',
  })
  @IsOptional()
  birthDate: Date;

  @ApiProperty({
    description: 'User information',
    example: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой.',
  })
  @MinLength(10)
  @MaxLength(140)
  description: string;

  @ApiProperty({
    description: 'Metro station',
    example: 'Petrogradskaya',
  })
  @IsEnum(LocationEnum)
  location: LocationEnum;

  @ApiProperty({
    description: 'Users`s training level',
    example: 'amateur',
  })
  @IsEnum(TrainingLevelEnum)
  trainingLevel: TrainingLevelEnum;

  @ApiProperty({
    description: 'Training types',
    example: ['box', 'yoga'],
  })
  @IsArray({ message: 'Field trainingType must be an array' })
  @ArrayMinSize(0)
  @ArrayMaxSize(3)
  @IsEnum(TrainingTypeEnum, { each: true })
  trainingType: TrainingTypeEnum[];

  @ApiProperty({
    description: 'Training duration',
    example: '50-80',
  })
  @IsEnum(TrainingDurationEnum)
  trainingDuration: TrainingDurationEnum;

  @ApiProperty({
    description: 'Number of calories to lose',
    example: '5000',
  })
  @IsNumberString()
  @Validate((value) => +value >= 1000 && +value <= 5000)
  calories: number;

  @ApiProperty({
    description: 'Number of calories to burn per day',
    example: 1000,
  })
  @IsNumberString()
  @Validate((value) => +value >= 1000 && +value <= 5000)
  caloriesPerDay: number;

  @ApiProperty({
    description: 'Ready for training',
    example: true,
  })
  @Validate((value) => value === 'false' || value === 'true')
  isReadyForTraining: string;
}
