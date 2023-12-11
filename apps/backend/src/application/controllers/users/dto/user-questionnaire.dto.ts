import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsInt, IsOptional, IsString, IsUUID, Validate } from 'class-validator';
import { TrainingDurationEnum } from '../../../../types/training-duration.enum';
import { UUID } from '../../../../types/uuid.type';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UserQuestionnaireDto {
  @IsUUID()
  @IsOptional()
  id: UUID;

  @ApiProperty({
    description: 'Users`s training level',
    example: 'amateur',
    required: false
  })
  @IsString()
  @IsOptional()
  trainingLevel: string;

  @ApiProperty({
    description: 'Training types',
    example: ['box', 'yoga'],
    required: false
  })
  @IsArray({ message: 'Field trainingType must be an array' })
  @ArrayMinSize(0)
  @ArrayMaxSize(3)
  @IsOptional()
  trainingType?: string[];

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
  @IsInt()
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
  @IsInt()
  @Validate((value) => +value >= 1000 && +value <= 5000)
  @Transform(({value}) => +value)
  @IsOptional()
  caloriesPerDay?: number;
}
