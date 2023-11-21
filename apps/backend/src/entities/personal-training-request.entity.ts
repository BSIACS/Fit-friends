export interface PersonalTrainingRequestEntityInterface {
  id: string;
  requestorId: string;
  responserId: string;
  createdAt: Date;
  statusChangedAt: Date;
  status: string;
}
