import { SexEnum } from './sex.enum';
import { TrainingDurationEnum } from './training-duration.enum';
import { TrainingLevelEnum } from './training-level.enum';
import { TrainingTypeEnum } from './training-type.enum';

export interface Training {
  name: string;
  backgroundImg: string;                    //jpg/png взять из макета
  trainingLevel: TrainingLevelEnum;
  trainingType: TrainingTypeEnum;
  trainingDuration: TrainingDurationEnum;
  price: number;                            //0 - бесплатно
  calories: number;
  description: string;
  sex: SexEnum;
  videoDemo: string;                        //mov/avi/mp4
  raiting: number;
  trainingCreator: string;                  //ссылка GUID
  isSpecial: boolean;
}
