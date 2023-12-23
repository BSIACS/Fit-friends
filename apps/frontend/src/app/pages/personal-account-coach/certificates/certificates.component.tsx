/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { TrainerDTO } from '../../../dto/trainer.dto';
import { UUID } from '../../../types/uuid.type';
import Slider, { Settings } from 'react-slick';
import { CertificateComponent } from '../certificate/certificate.component';
import { useAppSelector } from '../../../hooks/useAppSelector';

type CertificatesComponentProps = {
  trainerId: UUID,
  certificateFilesNames: string[],
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

export function CertificatesComponent({ trainerId }: CertificatesComponentProps): JSX.Element {
  const certificatesSliderRef = useRef<any>();
  const certificates = useAppSelector((state) => state.application.actualTrainerData.certificateFilesNames);

  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;


  const certificatesLeftArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    certificatesSliderRef.current.slickPrev();
  }

  const certificatesRightArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    certificatesSliderRef.current.slickNext();
  }


  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
          <svg width="14" height="14" aria-hidden="true" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21H14C19 21 21 19 21 14V9M17 1V7M17 7L19 5M17 7L15 5M1.67 17.95L6.6 14.64C7.39 14.11 8.53 14.17 9.24 14.78L9.57 15.07C10.35 15.74 11.61 15.74 12.39 15.07L16.55 11.5C17.33 10.83 18.59 10.83 19.37 11.5L21 12.9M10 7C10 8.10457 9.10457 9 8 9C6.89543 9 6 8.10457 6 7C6 5.89543 6.89543 5 8 5C9.10457 5 10 5.89543 10 7Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span>Загрузить</span>
        </button>
        <div className="personal-account-coach__controls">
          <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous"
            onClick={certificatesLeftArrowButtonClickHandler}>
            <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
          <button className="btn-icon personal-account-coach__control" type="button" aria-label="next"
            onClick={certificatesRightArrowButtonClickHandler}>
            <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0012 1L15 6L10.0012 11M1 6H14.86" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </div>
      </div>
      <ul className="personal-account-coach__list">
        {
          <Slider ref={certificatesSliderRef} {...settings}>
            {
              certificates &&
              certificates.map((item) =>
                <CertificateComponent key={item} trainerId={trainerId} certificateFileName={item as string}/>
              )
            }
            {/* <li className="personal-account-coach__item">
              <div className="certificate-card certificate-card--edit">
                <div className="certificate-card__image">
                  <picture>
                    <source type="image/webp"
                      srcSet="assets/img/content/certificates-and-diplomas/certificate-1.webp, img/content/certificates-and-diplomas/certificate-1@2x.webp 2x" />
                    <img src="assets/img/content/certificates-and-diplomas/certificate-1.jpg"
                      srcSet="assets/img/content/certificates-and-diplomas/certificate-1@2x.jpg 2x" width="294"
                      height="360" alt="Сертификат - Биомеханика ударов в боксе" />
                  </picture>
                </div>
                <div className="certificate-card__buttons">
                  <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                    <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>Изменить!</span>
                  </button>
                  <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                    <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>Сохранить</span>
                  </button>
                  <div className="certificate-card__controls">
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
                    </button>
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="14" height="16" aria-hidden="true" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.184C12.41 3.92 9.80444 3.784 7.20667 3.784C5.66667 3.784 4.12667 3.864 2.58667 4.024L1 4.184M5.27778 3.376L5.44889 2.328C5.57333 1.568 5.66667 1 6.98111 1H9.01889C10.3333 1 10.4344 1.6 10.5511 2.336L10.7222 3.376M13.3278 6.712L12.8222 14.768C12.7367 16.024 12.6667 17 10.4967 17H5.50333C3.33333 17 3.26333 16.024 3.17778 14.768L2.67222 6.712M6.70111 12.6H9.29111M6.05556 9.4H9.94444" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="personal-account-coach__item">
              <div className="certificate-card">
                <div className="certificate-card__image">
                  <picture>
                    <source type="image/webp"
                      srcSet="assets/img/content/certificates-and-diplomas/certificate-2.webp, img/content/certificates-and-diplomas/certificate-2@2x.webp 2x" />
                    <img src="assets/img/content/certificates-and-diplomas/certificate-2.jpg"
                      srcSet="assets/img/content/certificates-and-diplomas/certificate-2@2x.jpg 2x" width="294"
                      height="360"
                      alt="Сертификат - Организационно-методическая подготовка и проведение групповых и индивидуальных физкультурно-оздоровительных занятий" />
                  </picture>
                </div>
                <div className="certificate-card__buttons">
                  <button
                    className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                    type="button">
                    <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>Изменить</span>
                  </button>
                  <button
                    className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                    type="button">
                    <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>Сохранить</span>
                  </button>
                  <div className="certificate-card__controls">
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
                    </button>
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="14" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="personal-account-coach__item">
              <div className="certificate-card">
                <div className="certificate-card__image">
                  <picture>
                    <source type="image/webp" srcSet="assets/img/content/certificates-and-diplomas/certificate-3.webp, img/content/certificates-and-diplomas/certificate-3@2x.webp 2x" />
                    <img src="assets/img/content/certificates-and-diplomas/certificate-3.jpg"
                      srcSet="assets/img/content/certificates-and-diplomas/certificate-3@2x.jpg 2x" width="294"
                      height="360" alt="Сертифиционный курс по кроссфиту 2-го уровня" />
                  </picture>
                </div>
                <div className="certificate-card__buttons">
                  <button
                    className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                    type="button">
                    <svg width="14" height="14" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>Изменить</span>
                  </button>
                  <button
                    className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                    type="button">
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg><span>Сохранить</span>
                  </button>
                  <div className="certificate-card__controls">
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
                    </button>
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="14" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="personal-account-coach__item">
              <div className="certificate-card">
                <div className="certificate-card__image">
                  <picture>
                    <source type="image/webp"
                      srcSet="assets/img/content/certificates-and-diplomas/certificate-4.webp, img/content/certificates-and-diplomas/certificate-4@2x.webp 2x" />
                    <img src="assets/img/content/certificates-and-diplomas/certificate-4.jpg"
                      srcSet="assets/img/content/certificates-and-diplomas/certificate-4@2x.jpg 2x" width="294"
                      height="360" alt="Сертификат инструкторов йоги" />
                  </picture>
                </div>
                <div className="certificate-card__buttons">
                  <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                    <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>Изменить</span>
                  </button>
                  <button
                    className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                    type="button">
                    <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>Сохранить</span>
                  </button>
                  <div className="certificate-card__controls">
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
                    </button>
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="14" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li className="personal-account-coach__item">
              <div className="certificate-card">
                <div className="certificate-card__image">
                  <picture>
                    <source type="image/webp"
                      srcSet="assets/img/content/certificates-and-diplomas/certificate-5.webp, img/content/certificates-and-diplomas/certificate-5@2x.webp 2x" />
                    <img src="assets/img/content/certificates-and-diplomas/certificate-5.jpg"
                      srcSet="assets/img/content/certificates-and-diplomas/certificate-5@2x.jpg 2x" width="294"
                      height="360" alt="Сертификат фитне аэробики" />
                  </picture>
                </div>
                <div className="certificate-card__buttons">
                  <button
                    className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                    type="button">
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg><span>Изменить</span>
                  </button>
                  <button
                    className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                    type="button">
                    <svg width="12" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-edit"></use>
                    </svg><span>Сохранить</span>
                  </button>
                  <div className="certificate-card__controls">
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
                    </button>
                    <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                      <svg width="14" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-trash"></use>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li> */}
          </Slider>
        }
      </ul>
    </div>
  )
}
