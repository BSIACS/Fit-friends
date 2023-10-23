import { SexEnum } from './sex.enum';
import { LocationEnum } from './location.enum';
import { UserRoleEnum } from './user-role.enum';

export interface PersonInterface {
  name: string;
  email: string;
  avatar: string;
  password: string;
  sex: SexEnum;
  birthDate: Date;
  role: UserRoleEnum;
  description: string;
  location: LocationEnum;
  backgroundImg: string;
  createdAt: Date;
}
