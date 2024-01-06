import { useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { UUID } from '../../../types/uuid.type';
import Slider, { Settings } from 'react-slick';
import { CertificateComponent } from '../certificate/certificate.component';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { updateTrainerDataThunk } from '../../../store/slices/application.thunk';
import { useAppDispatch } from '../../../hooks/useAppDispatch';

type CertificatesComponentProps = {
  trainerId: UUID,
  certificateFilesNames: string[],
}

const settings: Settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
  adaptiveHeight: true,
  arrows: true,
};

export function CertificatesComponent({ trainerId }: CertificatesComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const certificatesSliderRef = useRef<any>();
  const certificates = useAppSelector((state) =>  state.application.actualTrainerData ? state.application.actualTrainerData.certificateFilesNames : []);
  const loadFileInputRef = useRef<HTMLInputElement | null>(null);

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


  const certificatesLeftArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    certificatesSliderRef.current.slickPrev();
  }

  const certificatesRightArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    certificatesSliderRef.current.slickNext();
  }

  const onSaveButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    loadFileInputRef.current?.click();
  }

  const inputHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    if (loadFileInputRef.current?.files) {
      const formData = new FormData();
      formData.set('id', trainerId);
      formData.set('certificate', loadFileInputRef.current?.files[0]);

      dispatch(updateTrainerDataThunk({formData: formData}));
    }
  }

  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button" onClick={onSaveButtonClickHandler}>
          <svg width="14" height="14" aria-hidden="true" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21H14C19 21 21 19 21 14V9M17 1V7M17 7L19 5M17 7L15 5M1.67 17.95L6.6 14.64C7.39 14.11 8.53 14.17 9.24 14.78L9.57 15.07C10.35 15.74 11.61 15.74 12.39 15.07L16.55 11.5C17.33 10.83 18.59 10.83 19.37 11.5L21 12.9M10 7C10 8.10457 9.10457 9 8 9C6.89543 9 6 8.10457 6 7C6 5.89543 6.89543 5 8 5C9.10457 5 10 5.89543 10 7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span>Загрузить</span>
        </button>
        <input type='file' hidden={true} ref={loadFileInputRef} onInput={inputHandler}/>
        {
          certificates && certificates.length > 3 &&
          <div className="personal-account-coach__controls">
            <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous"
              onClick={certificatesLeftArrowButtonClickHandler}>
              <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button className="btn-icon personal-account-coach__control" type="button" aria-label="next"
              onClick={certificatesRightArrowButtonClickHandler}>
              <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0012 1L15 6L10.0012 11M1 6H14.86" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        }
      </div>
      <ul className="personal-account-coach__list">
        {
          <Slider ref={certificatesSliderRef} {...settings}>
            {
              certificates &&
              certificates.map((item) =>
                <CertificateComponent key={item} trainerId={trainerId} certificateFileName={item as string} />
              )
            }
          </Slider>
        }
      </ul>
    </div>
  )
}
