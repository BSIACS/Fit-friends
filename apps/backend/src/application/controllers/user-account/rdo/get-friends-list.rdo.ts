import { UUID } from '../../../../types/uuid.type';
import { TrainerRdo } from '../../users/rdo/trainer.rdo';
import { UserRdo } from '../../users/rdo/user.rdo';

export class GetFriendsListRdo {
  friends: (UserRdo | TrainerRdo)[];
  friendsNumber: number;
}
