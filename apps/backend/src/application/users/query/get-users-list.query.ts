import { IsArray, IsEnum, IsOptional } from 'class-validator';
import { LocationEnum } from '../../../types/location.enum';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../types/training-type.enum';
import { UserRoleEnum } from '../../../types/user-role.enum';


export class GetUsersListQuery{
  @IsEnum(LocationEnum)
  @IsOptional()
  public location: string;

  @IsEnum(TrainingLevelEnum)
  @IsOptional()
  public trainingLevel: TrainingLevelEnum;

  @IsEnum(TrainingTypeEnum, { each: true })
  @IsArray()
  @IsOptional()
  public trainingType: TrainingTypeEnum[];

  @IsEnum(UserRoleEnum)
  @IsOptional()
  public sortPriority: UserRoleEnum;
}
