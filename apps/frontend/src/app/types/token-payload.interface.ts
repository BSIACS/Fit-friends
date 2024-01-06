import { UUID } from './uuid.type';

export interface TokenPayloadInterface {
  userId: UUID;
  email: string;
  name: string;
  role: string;
  iat: string;
  exp: string;
}
