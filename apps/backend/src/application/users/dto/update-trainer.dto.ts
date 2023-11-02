import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEmail, IsEnum, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { LocationEnum } from '../../../types/location.enum';
import { SexEnum } from '../../../types/sex.enum';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { UserRoleEnum } from '../../../types/user-role.enum';
import { UUID } from '../../../types/uuid.type';

export class UpdateTrainerDto {
  id: UUID;

  @Matches(/^[a-zа-яА-Я]+$/i)
  @MinLength(1)
  @MaxLength(15)
  @IsOptional()
  name?: string;

  @IsEmail()
  email?: string;

  //avatar: string;

  @MinLength(6)
  @MaxLength(12)
  @IsOptional()
  password?: string;

  @IsEnum(SexEnum)
  @IsOptional()
  sex?: SexEnum;

  @IsOptional()
  @IsOptional()
  birthDate?: Date;

  @IsEnum(UserRoleEnum)
  role?: UserRoleEnum;

  @MinLength(10)
  @MaxLength(140)
  @IsOptional()
  description?: string;

  @IsEnum(LocationEnum)
  @IsOptional()
  location?: LocationEnum;

  @IsEnum(TrainingLevelEnum)
  @IsOptional()
  trainingLevel?: TrainingLevelEnum;

  @IsArray({ message: 'Field trainingType must be an array' })
  @ArrayMinSize(0)
  @ArrayMaxSize(3)
  @IsEnum(TrainingTypeEnum, { each: true })
  @IsOptional()
  trainingType?: TrainingTypeEnum[];

  // certificates: string;                 //PDF. Только один файл

  @MinLength(10)
  @MaxLength(140)
  @IsOptional()
  merits?: string;

  @IsBoolean()
  @IsOptional()
  isReadyForTraining?: boolean;
}
