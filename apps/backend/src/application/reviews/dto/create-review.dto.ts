import { IsInt, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';
import { UUID } from '../../../types/uuid.type';
import { ApiProperty } from '@nestjs/swagger';


export class CreateReviewDto{
  @ApiProperty({
    description: 'Training UUID',
    example: '59bce336-fc4f-4a72-8840-ae903102caf9',
  })
  @IsUUID()
  trainingId: UUID;

  @ApiProperty({
    description: 'Youre rate value',
    example: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    description: 'Training unique Id',
    example: 'Спасибо, классная тренировка! Понятная и интересная, с акцентом на правильную технику, как я люблю, но все же не хватило немного динамики. Для меня оказалась слишком легкой.',
  })
  @MinLength(100)
  @MaxLength(1024)
  text: string;
}
