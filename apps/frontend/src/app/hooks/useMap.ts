import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer } from 'leaflet';
import 'leaflet/dist/leaflet.css';


export function useMap(mapContainerRef: MutableRefObject<HTMLDivElement | null>): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  /**
   * Single call flag
   */
  const isAlreadyCalled: MutableRefObject<boolean> = useRef(false);

  useEffect(() => {
    if(isAlreadyCalled.current){
      return;
    }

    isAlreadyCalled.current = true;

    if(mapContainerRef.current !== null && map === null){
      const instance = new Map(
        mapContainerRef.current as HTMLElement,
      );

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);

      setMap(instance);
    }
  }, []);

  return map;
}
