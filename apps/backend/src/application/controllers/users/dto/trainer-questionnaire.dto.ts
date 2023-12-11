import { ArrayMaxSize, ArrayMinSize, IsArray, IsEnum, IsUUID, MaxLength, MinLength, Validate } from 'class-validator';
import { TrainingLevelEnum } from '../../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../../types/training-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { UUID } from '../../../../types/uuid.type';

export class TrainerQuestionnaireDto {
  @IsUUID()
  id: UUID;

  @ApiProperty({
    description: 'Users`s training level',
    example: 'amateur',
  })
  trainingLevel: string;

  @ApiProperty({
    description: 'Training types',
    example: ['box', 'yoga'],
  })
  @IsArray({ message: 'Field trainingType must be an array' })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  trainingType: string[];

  @ApiProperty({
    description: 'Merits of the trainer',
    example: 'Привет! Я профессиональный тренер по боксу. Не боюсь пробовать новое, также увлекаюсь кроссфитом и силовыми тренировками.',
  })
  @MinLength(10)
  @MaxLength(140)
  merits: string;

  @ApiProperty({
    description: 'Ready for training',
    example: 'true',
  })
  @Validate((value) => value === 'false' || value === 'true')
  @Transform(({ value }) => value === 'true')
  isReadyForTraining: boolean;
}
