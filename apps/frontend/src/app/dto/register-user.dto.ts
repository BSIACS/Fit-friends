import { UserDTO } from './user.dto';

export class RegisterUserDTO {
  public user?: UserDTO;
  public tokensPair?: {
    accessToken: string;
    refreshToken: string;
  }
}
