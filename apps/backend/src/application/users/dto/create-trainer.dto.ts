import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEmail, IsEnum, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { LocationEnum } from '../../../types/location.enum';
import { SexEnum } from '../../../types/sex.enum';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { UserRoleEnum } from '../../../types/user-role.enum';

export class CreateTrainerDto {
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

  // certificates: string;                 //PDF. Только один файл

  @MinLength(10)
  @MaxLength(140)
  merits: string;

  @IsBoolean()
  isReadyForTraining: boolean;
}
