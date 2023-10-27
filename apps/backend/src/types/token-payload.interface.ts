import { UUID } from './uuid.type';

export interface TokenPayload {
  userId: UUID;
  email: string;
  name: string;
  role: string;
}
