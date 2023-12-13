import { LocationEnum } from '../types/location.enum';

export type Geocode = [number, number];

export type GeocodeMap = {[key in LocationEnum]?: Geocode};

export const GEOCODES: GeocodeMap = {
  [LocationEnum.PETROGRADSKAYA]: [59.9665705 , 30.3110607],
  [LocationEnum.PIONERSKAYA]: [60.00252, 30.296688],
  [LocationEnum.UDELNAYA]: [60.0179390, 30.3182019],
  [LocationEnum.ZVYOZDNAYA]: [59.8336347, 30.3493071],
  [LocationEnum.SPORTIVNAYA]: [59.9516580, 30.2932400],
}
