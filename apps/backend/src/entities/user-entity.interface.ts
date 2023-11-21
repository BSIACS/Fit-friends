import { UUID } from '../types/uuid.type'

export interface UserEntityInterface {
  id: UUID,
  name: string,
  email: string,
  avatarFileName: string,
  passwordHash: string,
  sex: string,
  birthDate: Date,
  role: string,
  description: string,
  location: string,
  backgroundImgFileName: string,
  createdAt: Date,
  trainingLevel: string,
  trainingType: string[],
  trainingDuration: string,
  calories: number,
  caloriesPerDay: number,
  isReadyForTraining: boolean,
  friends: string[],
}
