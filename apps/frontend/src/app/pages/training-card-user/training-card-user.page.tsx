import { Link, useParams } from 'react-router-dom';
import { HeaderComponent } from '../../components/header/header.component';
import { useEffect, useState } from 'react';
import { UUID } from '../../types/uuid.type';
import axios from 'axios';
import { ReviewDTO } from '../../dto/review.dto';
import { TrainingDTO } from '../../dto/training.dto';
import { ReviewSideBarItemComponent } from '../../components/review-side-bar-item/review-side-bar-item';
import { PopupFeedbackComponent } from '../../components/popup-feedback/popup-feedback.component';
import { PopupBuyComponent } from '../../components/popup-buy/popup-buy.component';
import { getDurationTrainingTag, getSexTrainingTag, getTypeTrainingTag } from '../../utils/view-transform';
import { SexEnum } from '../../types/sex.enum';
import { TrainingTypeEnum } from '../../types/training-type.enum';
import { TrainingDurationEnum } from '../../types/training-duration.enum';
import { UserBalance } from '../../dto/user-balance.dto';
import { BadRequestPage } from '../bad-request/bad-request.page';
import { requestWithAccessTokenInterceptor } from '../../services/interceptors';
import { LoaderComponent } from '../../components/loader/loader.component';
import { AppRoutes } from '../../constants/app-routes.constants';

export function TrainingCardUserPage(): JSX.Element {
  const [reviews, setReviews] = useState<ReviewDTO[]>([]);
  const [training, setTraining] = useState<TrainingDTO>({});
  const [currentTrainingBalance, setCurrentTrainingBalance] = useState<UserBalance>();
  const [isReviewsLoaded, setIsReviewsLoaded] = useState<boolean>(false);
  const [isUserBalanceLoaded, setIsUserBalanceLoaded] = useState<boolean>(false);
  const [isTrainingDataLoaded, setIsTrainingDataLoaded] = useState<boolean>(false);
  const [isTrainingStarted, setIsTrainingStarted] = useState<boolean>(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [isPopupFeedbackActive, setIsPopupFeedbackActive] = useState<boolean>(false);
  const [isPopupBuyActive, setIsPopupBuyActive] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    getReviewsData();
    getTrainingData();
    getUserBalance();
  }, []);


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

  const getUserBalance = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      const response = await axiosInstance.get<UserBalance[]>(`http://localhost:3042/api/userAccount/balance`);

      response.data.forEach((item) => item.trainingId === id && setCurrentTrainingBalance(item))
      setIsUserBalanceLoaded(true);
    }
    catch (error) {
      setIsUserBalanceLoaded(true);
      setIsRequestError(true);
    }
  }

  const buyTraining = async (paymentMethod: string, quantity: number): Promise<void> => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      await axiosInstance.post(`http://localhost:3042/api/userAccount/balance/add`, {
        trainingId: id,
        quantity: quantity,
      });

      await axiosInstance.post(`http://localhost:3042/api/userAccount/purchase/add`, {
        trainingId: id,
        price: training.price,
        quantity: quantity,
        paymentMethod: paymentMethod,
      });

      if (currentTrainingBalance) {
        setCurrentTrainingBalance({ ...currentTrainingBalance, remained: quantity })
      }
      else {
        setCurrentTrainingBalance({ id: id, remained: quantity } as UserBalance)
      }
      setIsPopupBuyActive(false);
    }
    catch (error) {
      setIsRequestError(true);
    }
  }

  const decrementUserBalance = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsUserBalanceLoaded(false);
      await axiosInstance.post(`http://localhost:3042/api/userAccount/balance/remove`, {
        trainingId: id,
        quantity: 1,
      });
      currentTrainingBalance && setCurrentTrainingBalance({ ...currentTrainingBalance, remained: currentTrainingBalance.remained - 1 });
      setIsUserBalanceLoaded(true);
    }
    catch (error) {
      setIsUserBalanceLoaded(true);
      setIsRequestError(true);
    }
  }

  const addReview = async (rating: number, text: string) => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsReviewsLoaded(false);
      const response = await axiosInstance.post<ReviewDTO>(`http://localhost:3042/api/reviews`, {
        trainingId: id,
        rating: rating,
        text: text,
      });
      const modifiedReviews: ReviewDTO[] = [response.data, ...reviews]
      setReviews(modifiedReviews);
      setIsReviewsLoaded(true);
      setIsPopupFeedbackActive(false);
    }
    catch (error) {
      setIsReviewsLoaded(true);
      setIsRequestError(true);
    }
  }

  const feedbackButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsPopupFeedbackActive(true);
  }

  const buyButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsPopupBuyActive(true);
  }

  const startButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsTrainingStarted(true);
  }

  const stopButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsTrainingStarted(false);
    decrementUserBalance();
  }

  if (isRequestError) {
    return <BadRequestPage />;
  }

  return (

    <div className="wrapper">
      <LoaderComponent isHidden={isReviewsLoaded && isTrainingDataLoaded && isUserBalanceLoaded} />
      <HeaderComponent />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Карточка тренировки</h1>
              <aside className="reviews-side-bar">
                <Link className="btn-flat btn-flat--underlined reviews-side-bar__back" to={AppRoutes.TRAINING_CATALOG}>
                  <svg width="14" height="10" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span>Назад</span>
                </Link>
                <h2 className="reviews-side-bar__title">Отзывы</h2>
                <ul className="reviews-side-bar__list">
                  {reviews.map((item) => <ReviewSideBarItemComponent key={item.id} userId={item.userId as UUID} name={item.user?.name as string} avatarFileName={item.user?.avatarFileName as string} rating={item.rating as number} text={item.text as string} />)}
                </ul>
                <button className="btn btn--medium reviews-side-bar__button" type="button"
                  disabled={currentTrainingBalance === undefined}
                  onClick={feedbackButtonClickHandler}>Оставить отзыв</button>
              </aside>
              <div className="training-card">
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
                  </div>
                  <div className="training-info__main-content">
                    <form action="#" method="get">
                      <div className="training-info__form-wrapper">
                        <div className="training-info__info-wrapper">
                          <div className="training-info__input training-info__input--training">
                            <label>
                              <span className="training-info__label">Название тренировки</span>
                              {
                                training &&
                                <input name="training" defaultValue={training.name} disabled />
                              }
                            </label>
                            <div className="training-info__error">Обязательное поле</div>
                          </div>
                          <div className="training-info__textarea">
                            <label>
                              <span className="training-info__label">Описание тренировки</span>
                              <textarea name="description"
                                disabled value={training.description}></textarea>
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
                              <div className="hashtag hashtag--white"><span>{getTypeTrainingTag(training.trainingType as TrainingTypeEnum)}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>{getSexTrainingTag(training.sex as SexEnum)}</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>#{training.calories}ккал</span></div>
                            </li>
                            <li className="training-info__item">
                              <div className="hashtag hashtag--white"><span>{getDurationTrainingTag(training.trainingDuration as TrainingDurationEnum)}</span></div>
                            </li>
                          </ul>
                        </div>
                        <div className="training-info__price-wrapper">
                          <div className="training-info__input training-info__input--price">
                            <label><span className="training-info__label">Стоимость</span>
                              <input type="text" name="price" value={`${training.price} ₽`} disabled />
                            </label>
                            <div className="training-info__error">Введите число</div>
                          </div>
                          <button className="btn training-info__buy" type="button"
                            disabled={Number(currentTrainingBalance?.remained) > 0}
                            onClick={buyButtonClickHandler}>Купить</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="training-video">
                  <h2 className="training-video__title">Видео</h2>
                  <div className="training-video__video">
                    {
                      isTrainingDataLoaded && training &&
                      <video controls={isTrainingStarted}>
                        <source src={`http://localhost:3042/assets/training-data/${training.id}/${training.videoDemoFileName}`} type='video/mp4' />
                      </video>}
                  </div>
                  <div className="training-video__buttons-wrapper">
                    {!isTrainingStarted && <button className="btn training-video__button training-video__button--start" type="button"
                      onClick={startButtonClickHandler}
                      disabled={currentTrainingBalance === undefined || Number(currentTrainingBalance?.remained) <= 0}>Приступить</button>}
                    {isTrainingStarted && <button className="btn training-video__button" onClick={stopButtonClickHandler}
                      type="button">Закончить</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PopupFeedbackComponent isActive={isPopupFeedbackActive} setIsPopupActive={setIsPopupFeedbackActive} handleAddReviewButtonClick={addReview} />
      <PopupBuyComponent trainingId={training.id as string} name={training.name as string} price={training.price as string}
        imageName={training.backgroundImgFileName as string}
        isActive={isPopupBuyActive} setIsPopupActive={setIsPopupBuyActive} handleBuyButtonClick={buyTraining} />
    </div>
  )
}
