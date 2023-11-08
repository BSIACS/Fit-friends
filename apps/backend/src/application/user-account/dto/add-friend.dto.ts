import { UUID } from '../../../types/uuid.type';


export class AddFriendDto {
  userId: UUID;
  newFriendId: UUID;
}
