import { IsDateString, IsInt, IsUUID, Max, MaxLength, Min, MinLength } from 'class-validator';
import { UUID } from '../../../types/uuid.type';


export class CreateReviewDto{
  @IsUUID()
  userId: UUID;

  @IsUUID()
  trainingId: UUID;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @MinLength(100)
  @MaxLength(1024)
  text: string;

  @IsDateString()
  createdAt: Date;
}
