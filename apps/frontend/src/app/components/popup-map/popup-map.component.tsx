import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import styles from './popup-map.module.css';
import { svgIcon } from './svg-icon';
import { Geocode } from '../../constants/geocodes';



type PopupMapComponentProps = {
  isActive: boolean;
  geocode: Geocode;
  location: string;
  handleSetIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>;
}


export function PopupMapComponent({ isActive, geocode, location, handleSetIsPopupActive }: PopupMapComponentProps): JSX.Element {

  const closeButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleSetIsPopupActive(false);
  }

  return (
    <div className={`popup-form popup-form--map ${styles.popupFixed} ${isActive ? styles.visible : styles.invisible}`}>
      <section className="popup">
        <div className="popup__wrapper popup__wrapper--map">
          <div className="popup-head popup-head--address">
            <h2 className="popup-head__header">Валерия</h2>
            <p className="popup-head__address">
              <svg width="12" height="14" aria-hidden="true" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00001 8.62182C8.19902 8.62182 9.17101 7.69035 9.17101 6.54132C9.17101 5.39229 8.19902 4.46083 7.00001 4.46083C5.801 4.46083 4.82901 5.39229 4.82901 6.54132C4.82901 7.69035 5.801 8.62182 7.00001 8.62182Z" stroke="currentColor" /><path d="M1.16892 5.3277C2.53971 -0.447009 11.4673 -0.440341 12.8311 5.33437C13.6313 8.72184 11.4325 12.256 9.50502 14.0298C8.10639 15.3234 5.89363 15.3234 4.48805 14.0298C2.56755 12.256 0.368708 8.71517 1.16892 5.3277Z" stroke="currentColor" /></svg>
              <span>{location}</span>
            </p>
            <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={closeButtonClickHandler}>
              <svg width="20" height="20" aria-hidden="true" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L21 21M1 21L21 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="popup__content-map">
            <div className="popup__map" >
              <MapContainer center={geocode} zoom={14} style={{ height: '50vh', width: '50wh' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
                />
                <Marker position={geocode} icon={svgIcon}></Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
