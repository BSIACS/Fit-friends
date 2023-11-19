import { IsUUID } from 'class-validator';


export class SendNewTrainingNotificationsDto {
  @IsUUID()
  trainingId: string;

  @IsUUID()
  trainingCreatorId: string;
}
