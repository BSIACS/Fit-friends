import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { LocationEnum } from '../../../types/location.enum';
import { SexEnum } from '../../../types/sex.enum';
import { TrainingDurationEnum } from '../../../types/training-duration.enum';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { UserRoleEnum } from '../../../types/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';

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
    example: 'user@user.ru',
  })
  @IsEmail()
  email: string;

  //avatar: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
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
    description: 'User`s role. <user> or <trainer>',
    example: 'user',
  })
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

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

  @IsInt()
  @Min(1000)
  @Max(5000)
  calories: number;

  @IsInt()
  @Min(1000)
  @Max(5000)
  caloriesPerDay: number;

  @ApiProperty({
    description: 'Ready for training',
    example: true,
  })
  @IsBoolean()
  isReadyForTraining: boolean;
}
