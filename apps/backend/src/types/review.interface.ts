export interface ReviewInterface{
  user: string;                   //GUID
  training: string;               //GUID
  rating: number;
  text: string;
  createdAt: Date;
}
