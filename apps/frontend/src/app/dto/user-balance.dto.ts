export interface UserBalance{
  id: string;
  userId: string;
  trainingId: string;
  remained: number;
  training: {
    id: string;
    name: string;
    backgroundImgFileName: string;
    trainingLevel: string;
    trainingType: string;
    trainingDuration: string;
    price: string;
    calories: string;
    description: string;
    sex: string;
    videoDemoFileName: string;
    rating: string;
    votesNumber: string;
    trainingCreatorId: string;
    isSpecial: string;
  };
}

