import { useEffect, useRef, useState } from 'react';
import { UUID } from '../../types/uuid.type';
import { ReviewDTO } from '../../dto/review.dto';
import { ReviewSideBarItemComponent } from '../../components/review-side-bar-item/review-side-bar-item';
import axios from 'axios';
import { InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from '../../services/token';
import { useParams } from 'react-router-dom';
import { TrainingDTO } from '../../dto/training.dto';
import { BadRequestPage } from '../bad-request/bad-request.page';
import { LoaderComponent } from '../../components/loader/loader.component';
import { HeaderComponent } from '../../components/header/header.component';

const requestWithAccessTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;

  return config;
}

export function TrainingCardTrainerPage(): JSX.Element {
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [trainingFormData, setTrainingFormData] = useState({ description: '' });
  const [training, setTraining] = useState<TrainingDTO>({});
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isVideoReplacementInProgress, setIsVideoReplacementInProgress] = useState<boolean>(false);
  const [isReviewsLoaded, setIsReviewsLoaded] = useState<boolean>(false);
  const [isTrainingDataLoaded, setIsTrainingDataLoaded] = useState<boolean>(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const updateVideoFormElement: React.MutableRefObject<any> = useRef(null);


  const { id } = useParams();

  useEffect(() => {
    getTrainingData();
    getReviewsData();
  }, []);

  //#region API

  const getTrainingData = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      const response = await axiosInstance.post<TrainingDTO>(`http://localhost:3042/api/trainings/detail`, { id: id });
      setTraining(response.data);
      setIsTrainingDataLoaded(true);
    }
    catch (error) {
      setIsTrainingDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const updateTrainingData = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      console.log(training);

      const response = await axiosInstance.patch<TrainingDTO>(`http://localhost:3042/api/trainerAccount/updateTraining`, { id: id, description: training.description, price: Number(training.price), isSpecial: training.isSpecial });
      console.log('response - ', response.data);

      setTraining(response.data);
      setIsTrainingDataLoaded(true);
    }
    catch (error) {
      setIsTrainingDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const getReviewsData = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      const response = await axiosInstance.get<ReviewDTO[]>(`http://localhost:3042/api/reviews/${id}`);
      setReviews(response.data.sort((item_1, item_2) => ((new Date(item_2.createdAt as string)).getTime() / 1000) - ((new Date(item_1.createdAt as string)).getTime() / 1000)));
      setIsReviewsLoaded(true);
    }
    catch (error) {
      setIsReviewsLoaded(true);
      setIsRequestError(true);
    }
  }

  //#endregion

  //#region HANDLERS

  const descriptionInputChangedHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTraining({ ...training, description: evt.currentTarget.value });
  }

  const priceInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTraining({ ...training, price: evt.currentTarget.value });
  }

  const isSpecialButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isEditable) {
      return;
    }
    setTraining({ ...training, isSpecial: !training.isSpecial as boolean });
  }

  const deleteVideoButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsVideoReplacementInProgress(true);
  }

  const saveVideoButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const form = new FormData(updateVideoFormElement.current)
    console.log(form.get('trainingVideo'));

    // setIsVideoReplacementInProgress(false);
    // setIsEditable(false);
  }

  const editButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsEditable(true);
  }

  const saveButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    updateTrainingData();
    setIsVideoReplacementInProgress(false);
    setIsEditable(false);
  }

  //#endregion

  if (isRequestError) {
    return <BadRequestPage />;
  }

  return (
    <>
      {/* <div style={{ width: '100%', height: '100%', position: 'fixed', backgroundColor: 'black', zIndex: '100', opacity: .5 }}
        hidden={isReviewsLoaded && isTrainingDataLoaded}></div> */}
      <LoaderComponent isHidden={isReviewsLoaded && isTrainingDataLoaded}/>
      <div className="wrapper">
        <HeaderComponent />
        <main>
          <section className="inner-page">
            <div className="container">
              <div className="inner-page__wrapper">
                <h1 className="visually-hidden">Карточка тренировки</h1>
                <aside className="reviews-side-bar">
                  <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button">
                    <svg width="14" height="10" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>Назад</span>
                  </button>
                  <h2 className="reviews-side-bar__title">Отзывы</h2>
                  <ul className="reviews-side-bar__list">
                    {reviews.map((item) => <ReviewSideBarItemComponent key={item.id} userId={item.userId as UUID} name={item.user?.name as string} avatarFileName={item.user?.avatarFileName as string} rating={item.rating as number} text={item.text as string} />)}
                  </ul>
                  <button className="btn btn--medium reviews-side-bar__button" type="button" disabled>Оставить отзыв</button>
                </aside>
                <div className="training-card training-card--edit">
                  <div className="training-info">
                    <h2 className="visually-hidden">Информация о тренировке</h2>
                    <div className="training-info__header">
                      <div className="training-info__coach">
                        <div className="training-info__photo">
                          <picture>
                            <source type="image/webp"
                              srcSet="assets/img/content/avatars/coaches/photo-1.webp, assets/img/content/avatars/coaches/photo-1@2x.webp 2x" />
                            <img src="http://localhost:3042/assets/users-data/9584ad02-ed85-438e-aead-797fd55978d8/photo-1.png"
                              srcSet={`http://localhost:3042/assets/users-data/${training.trainer?.id}/${training.trainer?.avatarFileName} 2x`} width="64" height="64"
                              alt="Изображение тренера" />
                          </picture>
                        </div>
                        <div className="training-info__coach-info"><span className="training-info__label">Тренер</span><span
                          className="training-info__name">{training.trainer?.name}</span></div>
                      </div>
                      {!isEditable && <button className="btn-flat btn-flat--light training-info__edit" type="button" onClick={editButtonClickHandler}>
                        <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                        <span>Редактировать</span>
                      </button>}
                      {isEditable && <button
                        className="btn-flat btn-flat--light btn-flat--underlined training-info__edit training-info__edit--save"
                        type="button" onClick={saveButtonClickHandler}>
                        <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                        <span>Сохранить</span>
                      </button>}
                    </div>
                    <div className="training-info__main-content">
                      <form action="#" method="get">
                        <div className="training-info__form-wrapper">
                          <div className="training-info__info-wrapper">
                            <div className="training-info__input training-info__input--training">
                              <label>
                                <span className="training-info__label">Название тренировки</span>
                                <input type="text" name="training" value={training.name} disabled={!isEditable} />
                              </label>
                              <div className="training-info__error">Обязательное поле</div>
                            </div>
                            <div className="training-info__textarea">
                              <label><span className="training-info__label">Описание тренировки</span>
                                <textarea name="description" disabled={!isEditable} onChange={descriptionInputChangedHandler}
                                  value={training.description}></textarea>
                              </label>
                            </div>
                          </div>
                          <div className="training-info__rating-wrapper">
                            <div className="training-info__input training-info__input--rating">
                              <label>
                                <span className="training-info__label">Рейтинг</span>
                                <span className="training-info__rating-icon">
                                  <svg width="18" height="18" aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.38211 1.15534L10.79 3.9943C10.9819 4.3895 11.4939 4.76856 11.9258 4.84115L14.4775 5.2686C16.1094 5.54282 16.4933 6.73647 15.3175 7.914L13.3337 9.91417C12.9977 10.2529 12.8137 10.9062 12.9177 11.374L13.4857 13.85C13.9336 15.8098 12.9017 16.568 11.1819 15.5437L8.79017 14.1162C8.35822 13.8581 7.6463 13.8581 7.20635 14.1162L4.81461 15.5437C3.1028 16.568 2.06292 15.8018 2.51087 13.85L3.07881 11.374C3.18279 10.9062 2.99881 10.2529 2.66285 9.91417L0.679071 7.914C-0.4888 6.73647 -0.112841 5.54282 1.51898 5.2686L4.0707 4.84115C4.49465 4.76856 5.00659 4.3895 5.19857 3.9943L6.60642 1.15534C7.37433 -0.385114 8.62219 -0.385114 9.38211 1.15534Z" fill="currentColor" /></svg>
                                </span>
                                <input type="number" name="rating" value="4" disabled />
                              </label>
                            </div>
                            <ul className="training-info__list">
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white"><span>#пилатес</span></div>
                              </li>
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white"><span>#для_всех</span></div>
                              </li>
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white"><span>#320ккал</span></div>
                              </li>
                              <li className="training-info__item">
                                <div className="hashtag hashtag--white"><span>#30_50минут</span></div>
                              </li>
                            </ul>
                          </div>
                          <div className="training-info__price-wrapper">
                            <div className="training-info__input training-info__input--price">
                              <label><span className="training-info__label">Стоимость</span>
                                <input type="number" name="price" value={`${training.price}`} onChange={priceInputChangeHandler} disabled={!isEditable} />
                              </label>
                              <div className="training-info__error">Введите число</div>
                            </div>
                            <button className="btn-flat btn-flat--light btn-flat--underlined training-info__discount"
                              type="button" onClick={isSpecialButtonClickHandler}>
                              <svg width="14" height="14" aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.90462 10.0959L10.1109 5.88955M9.75655 9.74533H9.76285M6.2513 6.24008H6.25759M2.39158 9.8578L1.32599 8.79219C0.891337 8.35754 0.891337 7.64246 1.32599 7.20781L2.39158 6.1422C2.57385 5.95993 2.72107 5.60239 2.72107 5.35001V3.84273C2.72107 3.22581 3.22584 2.72107 3.84276 2.72107H5.35002C5.6024 2.72107 5.95993 2.57387 6.14221 2.3916L7.2078 1.32599C7.64245 0.891337 8.35753 0.891337 8.79218 1.32599L9.85779 2.3916C10.0401 2.57387 10.3976 2.72107 10.65 2.72107H12.1572C12.7742 2.72107 13.2789 3.22581 13.2789 3.84273V5.35001C13.2789 5.60239 13.4261 5.95993 13.6084 6.1422L14.674 7.20781C15.1087 7.64246 15.1087 8.35754 14.674 8.79219L13.6084 9.8578C13.4261 10.0401 13.2789 10.3976 13.2789 10.65V12.1572C13.2789 12.7741 12.7742 13.2789 12.1572 13.2789H10.65C10.3976 13.2789 10.0401 13.4261 9.85779 13.6084L8.79218 14.674C8.35753 15.1087 7.64245 15.1087 7.2078 14.674L6.14221 13.6084C5.95993 13.4261 5.6024 13.2789 5.35002 13.2789H3.84276C3.22584 13.2789 2.72107 12.7741 2.72107 12.1572V10.65C2.72107 10.3906 2.57385 10.0331 2.39158 9.8578Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              <span>{training.isSpecial ? 'Отменить' : 'Сделать'} скидку 10%</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="training-video">
                    <h2 className="training-video__title">Видео</h2>
                    <div className="training-video__video" style={{ display: !isVideoReplacementInProgress ? 'block' : 'none' }}>
                      {isTrainingDataLoaded && <video controls>
                        <source src={`http://localhost:3042/assets/training-data/${training.id}/${training.videoDemoFileName}`} type='video/mp4' />
                      </video>}
                    </div>
                    <div className="training-video__drop-files" style={{ display: isVideoReplacementInProgress ? 'block' : 'none' }}>
                      <form action="#" method="post" ref={updateVideoFormElement}>
                        <div className="training-video__form-wrapper">
                          <div className="drag-and-drop">
                            <label>
                              <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или
                                MP4
                                <svg width="20" height="20" aria-hidden="true" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 8V14C21 19 19 21 14 21H8C3 21 1 19 1 14V8C1 3 3 1 8 1H14M17 1V7M17 7L19 5M17 7L15 5M8.1 9.52C8.1 7.61 9.45 6.84 11.1 7.79L13.66 9.27C15.31 10.22 15.31 11.78 13.66 12.73L11.1 14.21C9.45 15.16 8.1 14.38 8.1 12.48V9.52Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              </span>
                              <input type="file" name="trainingVideo" tabIndex={-1} accept=".mov, .avi, .mp4" />
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="training-video__buttons-wrapper" style={{marginTop: '15px'}}>
                      <button className="btn training-video__button" type="button"
                        style={{ display: !isEditable ? 'block' : 'none' }} disabled>Приступить</button>
                      <div className="training-video__edit-buttons" style={{ display: isEditable ? 'grid' : 'none' }}>
                        <button className="btn" type="button" onClick={saveVideoButtonClickHandler}>Сохранить</button>
                        <button className="btn btn--outlined" type="button" onClick={deleteVideoButtonClickHandler}>Удалить</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
