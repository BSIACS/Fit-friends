import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { LocationEnum } from '../../../types/location.enum';
import { SexEnum } from '../../../types/sex.enum';
import { TrainingDurationEnum } from '../../../types/training-duration.enum';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { UserRoleEnum } from '../../../types/user-role.enum';

export class CreateUserDto {
  @Matches(/^[a-zа-яА-Я]+$/i)
  @MinLength(1)
  @MaxLength(15)
  name: string;

  @IsEmail()
  email: string;

  //avatar: string;

  @MinLength(6)
  @MaxLength(12)
  password: string;

  @IsEnum(SexEnum)
  sex: SexEnum;

  @IsOptional()
  birthDate: Date;

  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @MinLength(10)
  @MaxLength(140)
  description: string;

  @IsEnum(LocationEnum)
  location: LocationEnum;

  @IsEnum(TrainingLevelEnum)
  trainingLevel: TrainingLevelEnum;

  @IsArray({ message: 'Field trainingType must be an array' })
  @ArrayMinSize(0)
  @ArrayMaxSize(3)
  @IsEnum(TrainingTypeEnum, { each: true })
  trainingType: TrainingTypeEnum[];

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

  @IsBoolean()
  isReadyForTraining: boolean;
}
