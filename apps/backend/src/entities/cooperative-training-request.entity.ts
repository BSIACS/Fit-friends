export interface CooperativeTrainingRequestEntityInterface {
  id: string;
  requesterId: string;
  responserId: string;
  createdAt: Date;
  statusChangedAt: Date;
  status: string;
}
