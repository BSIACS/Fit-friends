import { TrainerDTO } from './trainer.dto';

export class RegisterTrainerDTO {
  public trainer?: TrainerDTO;
  public tokensPair?: {
    accessToken: string;
    refreshToken: string;
  }
}
