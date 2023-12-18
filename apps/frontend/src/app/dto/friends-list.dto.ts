import { TrainerDTO } from './trainer.dto';
import { UserDTO } from './user.dto';

export class FriendsListDTO {
  friends?: (UserDTO | TrainerDTO)[];
  friendsNumber?: number;
}
