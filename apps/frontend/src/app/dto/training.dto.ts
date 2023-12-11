export class TrainingDTO {
  public id?: string;
  public name?: string;
  public backgroundImgFileName?: string;
  public trainingLevel?: string;
  public trainingType?: string;
  public trainingDuration?: string;
  public price?: string;
  public calories?: string;
  public description?: string;
  public sex?: string;
  public videoDemoFileName?: string;
  public rating?: string;
  public votesNumber?: string;
  public trainingCreatorId?: string;
  public isSpecial?: boolean;
  public trainer?: {
    id: string;
    name: string;
    avatarFileName: string;
  }
}
