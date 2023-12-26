import { IsArray, IsBoolean, IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { LocationEnum } from '../../../../types/location.enum';
import { TrainingLevelEnum } from '../../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../../types/training-type.enum';
import { UserRoleEnum } from '../../../../types/user-role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';


export class GetUsersListQuery{
  @ApiProperty({
    description: 'Location',
    enum: LocationEnum,
    required: false
  })
  @IsOptional()
  public locations: string[];

  @ApiProperty({
    description: 'Training level',
    enum: TrainingLevelEnum,
    required: false
  })
  @IsEnum(TrainingLevelEnum)
  @IsOptional()
  public trainingLevel: TrainingLevelEnum;

  @ApiProperty({
    description: 'Training type',
    enum: TrainingTypeEnum,
    required: false
  })
  @IsEnum(TrainingTypeEnum, { each: true })
  @IsArray()
  @IsOptional()
  public trainingType: TrainingTypeEnum[];

  @ApiProperty({
    description: 'Sort by priority',
    enum: UserRoleEnum,
    required: false
  })
  @IsEnum(UserRoleEnum)
  @IsOptional()
  public sortPriority: UserRoleEnum;

  @ApiProperty({
    description: 'Sort by priority',
    enum: UserRoleEnum,
    required: false
  })
  @IsString()
  @IsIn(['false', 'true'])
  @IsOptional()
  public isReadyForTraining: string;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  public usersPerPage: number;

  @IsNumber()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  public pageNumber: number;
}
