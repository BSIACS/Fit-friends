import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, IsEmail, IsEnum, IsOptional, IsUUID, Matches, MaxLength, MinLength, Validate } from 'class-validator';
import { LocationEnum } from '../../../../types/location.enum';
import { SexEnum } from '../../../../types/sex.enum';
import { TrainingLevelEnum } from '../../../../types/training-level.enum';
import { TrainingTypeEnum } from '../../../../types/training-type.enum';
import { UUID } from '../../../../types/uuid.type';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateTrainerDto {
  @IsUUID()
  id: UUID;

  @ApiProperty({
    description: 'User name',
    example: 'Михаил',
    required: false
  })
  @Matches(/^[a-zа-яА-Я]+$/i)
  @MinLength(1)
  @MaxLength(15)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'User password',
    example: 'testpass',
    required: false
  })
  @MinLength(6)
  @MaxLength(12)
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'User sex',
    example: 'male',
    required: false,
    enum: SexEnum
  })
  @IsEnum(SexEnum)
  @IsOptional()
  sex?: SexEnum;

  @ApiProperty({
    description: 'User birth date',
    example: '1990-03-12',
    required: false,
  })
  @IsOptional()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty({
    description: 'User information',
    example: 'Привет! Обожаю спорт и все, что с ним связанно. Регулярно хожу на тренировки по кроссфиту, также занимаюсь йогой.',
    required: false,
  })
  @MinLength(10)
  @MaxLength(140)
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Metro station',
    example: 'Petrogradskaya',
    required: false,
    enum: LocationEnum
  })
  @IsEnum(LocationEnum)
  @IsOptional()
  location?: LocationEnum;

  @ApiProperty({
    description: 'Users`s training level',
    example: 'amateur',
    required: false,
    enum: TrainingLevelEnum
  })
  @IsEnum(TrainingLevelEnum)
  @IsOptional()
  trainingLevel?: TrainingLevelEnum;

  @ApiProperty({
    description: 'Training types',
    example: ['box', 'yoga'],
    required: false,
    isArray: true,
    enum: TrainingTypeEnum
  })
  @IsArray({ message: 'Field trainingType must be an array' })
  @ArrayMinSize(0)
  @ArrayMaxSize(3)
  @IsEnum(TrainingTypeEnum, { each: true })
  @IsOptional()
  trainingType?: TrainingTypeEnum[];


  @ApiProperty({
    description: 'Merits of the trainer',
    required: false,
  })
  @MinLength(10)
  @MaxLength(140)
  @IsOptional()
  merits?: string;

  @ApiProperty({
    description: 'Ready for training',
    example: 'true',
    type: 'string',
    required: false
  })
  @Validate((value) => value === 'false' || value === 'true')
  @Transform(({value}) => value === 'true')
  @IsOptional()
  isReadyForTraining?: boolean;
}
