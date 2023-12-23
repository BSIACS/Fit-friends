/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { TrainerDTO } from '../../../dto/trainer.dto';
import { UUID } from '../../../types/uuid.type';
import Slider, { Settings } from 'react-slick';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateTrainerDataThunk } from '../../../store/slices/application.thunk';
import { useAppSelector } from '../../../hooks/useAppSelector';

type CertificateComponentProps = {
  trainerId: UUID,
  certificateFileName: string,
}

const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
  adaptiveHeight: true,
  arrows: true,
};

export function CertificateComponent({ trainerId, certificateFileName }: CertificateComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const trainer = useAppSelector(state => state.application.actualTrainerData);

  const [isEditable, setIsEditable] = useState<boolean>(false);

  const loadFileInputRef = useRef<HTMLInputElement | null>(null);

  const loadFileButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    loadFileInputRef.current?.click();
  }

  const deleteFileButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const formData = new FormData();
    formData.set('id', trainerId);
    trainer.certificateFilesNames?.forEach(item => item !== certificateFileName ? formData.append('certificateFilesNames[]', item) : undefined);
    dispatch(updateTrainerDataThunk({ formData: formData }))
  }

  const onSaveButtonHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEditable(false);
  }

  const onEditButtonHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEditable(true);
  }

  return (
    <li className="personal-account-coach__item">
      <div className="certificate-card" style={{ margin: '0 20px 0 0' }}>
        <div className="certificate-card__image">
          <picture >
            <Document file={`assets/certificates/${certificateFileName}`} >
              <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={false} />
            </Document>
          </picture>
          {/* <Document file={`http://localhost:3042/assets/training-data/625240c7-05e0-4f13-9d0b-1363dad1c76d/6.pdf`}>
                <Page pageNumber={1} />
              </Document> */}
        </div>
        <div className="certificate-card__buttons">
          {
            !isEditable &&
            <button
              className="btn-flat btn-flat--underlined certificate-card__buttons certificate-card__button--edit"
              type="button" onClick={onEditButtonHandler}>
              <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <span>Изменить</span>
            </button>
          }
          {
            isEditable &&
            <button
              className="btn-flat btn-flat--underlined certificate-card__buttons certificate-card__button--edit"
              type="button" onClick={onSaveButtonHandler}>
              <input type='file' hidden={true} ref={loadFileInputRef} />
              <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
              <span>Сохранить</span>
            </button>
          }

          {
            isEditable &&
            <div className="certificate-card__controls" style={{ display: 'flex' }}>
              <button className="btn-icon certificate-card__control" type="button" aria-label="next"
                onClick={loadFileButtonClickHandler}>
                <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
              </button>
              <button className="btn-icon certificate-card__control" type="button" aria-label="next"
                onClick={deleteFileButtonClickHandler}>
                <svg width="14" height="16" aria-hidden="true" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.184C12.41 3.92 9.80444 3.784 7.20667 3.784C5.66667 3.784 4.12667 3.864 2.58667 4.024L1 4.184M5.27778 3.376L5.44889 2.328C5.57333 1.568 5.66667 1 6.98111 1H9.01889C10.3333 1 10.4344 1.6 10.5511 2.336L10.7222 3.376M13.3278 6.712L12.8222 14.768C12.7367 16.024 12.6667 17 10.4967 17H5.50333C3.33333 17 3.26333 16.024 3.17778 14.768L2.67222 6.712M6.70111 12.6H9.29111M6.05556 9.4H9.94444" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </button>
            </div>
          }
        </div>
      </div>
    </li>
  )
}
