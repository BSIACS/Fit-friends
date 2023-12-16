import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserDTO } from '../../dto/user.dto';
import { getAccessToken } from '../../services/token';
import axios from 'axios';
import { InternalAxiosRequestConfig } from 'axios';
import { LoaderComponent } from '../../components/loader/loader.component';
import { HeaderComponent } from '../../components/header/header.component';
import { getLocation, getTypeTrainingTag } from '../../utils/view-transform';
import { TrainingTypeEnum } from '../../types/training-type.enum';
import { LocationEnum } from '../../types/location.enum';
import { useAppSelector } from '../../hooks/useAppSelector';
import { UUID } from '../../types/uuid.type';
import { BadRequestPage } from '../bad-request/bad-request.page';
import { PopupMapComponent } from '../../components/popup-map/popup-map.component';
import { GEOCODES, Geocode } from '../../constants/geocodes';
import { AppRoutes } from '../../constants/app-routes.constants';
import { TrainerDTO } from '../../dto/trainer.dto';
import { TrainingDTO } from '../../dto/training.dto';
import { TrainingListItemComponent } from '../../components/training-list-item/training-list-item.component';
import { UserCardTrainingListItemComponent } from '../../components/user-card-training-list-item/user-card-training-list-item.component';
import { PersonalTrainingSuggestionDTO } from '../../dto/personal-training-suggestion.dto';
import { PersonalTrainingRequestStatusEnum } from '../../types/personal-training-request-status.enum';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";

const requestWithAccessTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;

  return config;
}

export function UserCardTrainerPage(): JSX.Element {
  const authoriztionData = useAppSelector(state => state.authorization.authoriztionData);
  const isAuthoriztionDataLoading = useAppSelector(state => state.authorization.isLoading);
  const [trainer, setTrainer] = useState<TrainerDTO>();
  const [trainings, setTrainings] = useState<TrainingDTO[]>();
  const [friends, setFriends] = useState<UUID[]>();
  const [subscribers, setSubscribers] = useState<UUID[]>([]);
  const [isTrainerDataLoaded, setIsTrainerDataLoaded] = useState<boolean>(false);
  const [isTrainingsDataLoaded, setIsTrainingsDataLoaded] = useState<boolean>(false);
  const [isFriendsDataLoaded, setIsFriendsDataLoaded] = useState<boolean>(false);
  const [isSubscribersDataLoaded, setIsSubscribersDataLoaded] = useState<boolean>(false);
  const [isPersonalTrainingSuggestionDataLoaded, setIsPersonalTrainingSuggestionDataLoaded] = useState<boolean>(false);
  const [actualPersonalTrainingSuggestion, setActualPersonalTrainingSuggestion] = useState<PersonalTrainingSuggestionDTO>();
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);
  const sliderRef = useRef<any>();

  const { id } = useParams();

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    arrows: false,
  };

  useEffect(() => {
    getTrainerData();
    getTrainingData();
    getActualPersonalTrainingSuggestion();
  }, []);

  console.log('++++++', actualPersonalTrainingSuggestion);
  console.log('------', isPersonalTrainingSuggestionDataLoaded);


  useEffect(() => {
    if (authoriztionData.role) {
      getFriendsData();
    }
  }, [authoriztionData]);

  //#region API

  const getTrainerData = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      const response = await axiosInstance.get<TrainerDTO>(`http://localhost:3042/api/users/detail/trainer/${id}`);
      setTrainer(response.data);
      setSubscribers([...response.data.subscribers as UUID[]]);
      setIsTrainerDataLoaded(true);
      setIsSubscribersDataLoaded(true);
    }
    catch (error) {
      setIsTrainerDataLoaded(true);
      setIsSubscribersDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const getTrainingData = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      const response = await axiosInstance.post(`http://localhost:3042/api/trainings/catalogue`, {
        trainerId: id
      });
      setTrainings(response.data);
      setIsTrainingsDataLoaded(true);
    }
    catch (error) {
      setIsTrainingsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const getFriendsData = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      const response = await axiosInstance.get<UserDTO[]>(`http://localhost:3042/api/userAccount/friends/${authoriztionData.userId}`);
      const friends = response.data.map((item) => item.id);
      console.log(response.data);

      setFriends(friends as string[]);
      setIsFriendsDataLoaded(true);
    }
    catch (error) {
      setIsFriendsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const addToFriends = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsFriendsDataLoaded(false);
      await axiosInstance.post(`http://localhost:3042/api/userAccount/friends`, {
        newFriendId: id
      });
      if (friends && id) {
        setFriends([...friends, id]);
      }
      setIsFriendsDataLoaded(true);
    }
    catch (error) {
      setIsFriendsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const removeFromFriends = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsFriendsDataLoaded(false);
      await axiosInstance.post(`http://localhost:3042/api/userAccount/friends/remove`, {
        friendId: id
      });

      if (friends && id) {
        const indexToDelete = friends.indexOf(id);
        const newFriends = friends;
        newFriends.splice(indexToDelete, 1);
        setFriends([...newFriends]);
      }
      setIsFriendsDataLoaded(true);
    }
    catch (error) {
      setIsFriendsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const subscribeForNotification = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsSubscribersDataLoaded(false);
      await axiosInstance.post(`http://localhost:3042/api/userAccount/subscribe`, {
        trainerId: id
      });
      if (subscribers && id) {
        setSubscribers([...subscribers, id]);
      }
      setIsSubscribersDataLoaded(true);
    }
    catch (error) {
      setIsSubscribersDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const unsubscribeFromNotification = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsSubscribersDataLoaded(false);
      await axiosInstance.post(`http://localhost:3042/api/userAccount/unsubscribe`, {
        trainerId: id
      });
      if (subscribers && id) {
        const indexToDelete = subscribers.indexOf(id);
        const newSubscribers = subscribers;
        newSubscribers.splice(indexToDelete, 1);
        setSubscribers([...newSubscribers]);
      }
      setIsSubscribersDataLoaded(true);
    }
    catch (error) {
      setIsSubscribersDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const getActualPersonalTrainingSuggestion = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsPersonalTrainingSuggestionDataLoaded(false);
      const response = await axiosInstance.post<PersonalTrainingSuggestionDTO>(`http://localhost:3042/api/personalTrainingRequest/getUnderConsideration`,
        {
          responserId: id,
        },
      );
      console.log('response.data - ', response.data.id);

      setActualPersonalTrainingSuggestion(response.data.id ? response.data : undefined);
      setIsPersonalTrainingSuggestionDataLoaded(true);
    }
    catch (error) {
      setIsPersonalTrainingSuggestionDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const createPersonalTrainingSuggestion = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsPersonalTrainingSuggestionDataLoaded(false);
      const response = await axiosInstance.post<PersonalTrainingSuggestionDTO>(`http://localhost:3042/api/personalTrainingRequest`, {
        responserId: id
      });
      setActualPersonalTrainingSuggestion(response.data);
      setIsPersonalTrainingSuggestionDataLoaded(true);
    }
    catch (error) {
      setIsPersonalTrainingSuggestionDataLoaded(true);
      setIsRequestError(true);
    }
  }

  //#endregion

  const addToFriendsButtonHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    addToFriends();
  }

  const removeFromFriendsButtonHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    removeFromFriends();
  }

  const locationButtonClickHandler = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsPopupActive(true);
  }

  const subscribeInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.currentTarget.checked) {
      subscribeForNotification();
    }
    else {
      unsubscribeFromNotification();
    }
  }

  const wantPersonalTrainingButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    createPersonalTrainingSuggestion();
  }

  const leftArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sliderRef.current.slickPrev();
  }

  const rightArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sliderRef.current.slickNext();
  }

  if (isRequestError) {
    return <BadRequestPage />
  }

  return (
    <div className="wrapper">
      <LoaderComponent isHidden={isTrainerDataLoaded && !isAuthoriztionDataLoading && isFriendsDataLoaded && isSubscribersDataLoaded && isPersonalTrainingSuggestionDataLoaded} />
      <HeaderComponent />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <Link className="btn-flat inner-page__back" to={AppRoutes.USERS_CATALOG} type="button">
                <svg width="14" height="10" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>Назад</span>
              </Link>
              <div className="inner-page__content">
                <section className="user-card-coach">
                  <h1 className="visually-hidden">Карточка пользователя роль тренер</h1>
                  <div className="user-card-coach__wrapper">
                    <div className="user-card-coach__card">
                      <div className="user-card-coach__content">
                        <div className="user-card-coach__head">
                          <h2 className="user-card__title">{trainer?.name}</h2>
                        </div>
                        <div className="user-card-coach__label" onClick={locationButtonClickHandler}>
                          <div style={{ cursor: 'pointer', color: '#333333' }}>
                            <svg width="12" height="14" aria-hidden="true" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00001 8.62182C8.19902 8.62182 9.17101 7.69035 9.17101 6.54132C9.17101 5.39229 8.19902 4.46083 7.00001 4.46083C5.801 4.46083 4.82901 5.39229 4.82901 6.54132C4.82901 7.69035 5.801 8.62182 7.00001 8.62182Z" stroke="currentColor" /><path d="M1.16892 5.3277C2.53971 -0.447009 11.4673 -0.440341 12.8311 5.33437C13.6313 8.72184 11.4325 12.256 9.50502 14.0298C8.10639 15.3234 5.89363 15.3234 4.48805 14.0298C2.56755 12.256 0.368708 8.71517 1.16892 5.3277Z" stroke="currentColor" /></svg>
                            <span>{getLocation(trainer?.location as LocationEnum)}</span>
                          </div>
                        </div>
                        <div className="user-card-coach__status-container">
                          <div className="user-card-coach__status user-card-coach__status--tag">
                            <svg className="user-card-coach__icon-cup" width="12" height="13" aria-hidden="true" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.53704 10.5625H4.14815C3.46914 10.5625 2.91358 11.1475 2.91358 11.8625V12.025H2.2963C2.04321 12.025 1.83333 12.246 1.83333 12.5125C1.83333 12.779 2.04321 13 2.2963 13H9.7037C9.95679 13 10.1667 12.779 10.1667 12.5125C10.1667 12.246 9.95679 12.025 9.7037 12.025H9.08642V11.8625C9.08642 11.1475 8.53086 10.5625 7.85185 10.5625H6.46296V9.074C6.30864 9.0935 6.15432 9.1 6 9.1C5.84568 9.1 5.69136 9.0935 5.53704 9.074V10.5625Z" fill="currentColor" /><path d="M10 6.266C10.4074 6.1035 10.7654 5.837 11.0494 5.538C11.6235 4.8685 12 4.069 12 3.133C12 2.197 11.3025 1.4625 10.4136 1.4625H10.0679C9.66667 0.598 8.82716 0 7.85185 0H4.14815C3.17284 0 2.33333 0.598 1.9321 1.4625H1.58642C0.697531 1.4625 0 2.197 0 3.133C0 4.069 0.376543 4.8685 0.950617 5.538C1.23457 5.837 1.59259 6.1035 2 6.266C2.64198 7.93 4.18519 9.1 6 9.1C7.81482 9.1 9.35802 7.93 10 6.266ZM7.75309 4.1925L7.37037 4.6865C7.30864 4.758 7.26543 4.901 7.27161 4.9985L7.30864 5.6355C7.33333 6.0255 7.0679 6.227 6.72222 6.084L6.16049 5.85C6.07407 5.8175 5.92593 5.8175 5.83951 5.85L5.27778 6.084C4.9321 6.227 4.66667 6.0255 4.69136 5.6355L4.7284 4.9985C4.73457 4.901 4.69136 4.758 4.62963 4.6865L4.24691 4.1925C4.00617 3.8935 4.11111 3.562 4.46914 3.4645L5.05556 3.3085C5.14815 3.2825 5.25926 3.1915 5.30864 3.107L5.6358 2.574C5.83951 2.2425 6.16049 2.2425 6.3642 2.574L6.69136 3.107C6.74074 3.1915 6.85185 3.2825 6.94445 3.3085L7.53086 3.4645C7.88889 3.562 7.99383 3.8935 7.75309 4.1925Z" fill="currentColor" /></svg>
                            <span>Тренер</span>
                          </div>
                          <div className={`${trainer?.isReadyForTraining ? 'user-card-coach__status user-card-coach__status--check' : 'user-card-coach__status-not-ready user-card-coach__status--check-not-ready'}`}>
                            <span>{`${trainer?.isReadyForTraining ? 'Готов' : 'Не готов'} к тренировке`}</span>
                          </div>
                        </div>
                        <div className="user-card__text">
                          {trainer?.description}
                        </div>
                        <button className="btn-flat user-card-coach__sertificate" type="button">
                          <svg width="12" height="13" aria-hidden="true" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.94134 8.20416L2.93497 11.2532C2.93497 12.0789 3.55926 12.9631 4.32369 13.2231L6.35581 13.9122C6.70617 14.0293 7.28587 14.0293 7.6426 13.9122L9.67472 13.2231C10.4392 12.9631 11.0634 12.0789 11.0634 11.2532V8.23667M12.9873 9.4524V5.55167M5.757 1.34538L1.9221 3.90036C0.692634 4.71951 0.692634 6.55286 1.9221 7.37201L5.757 9.92699C6.44499 10.3886 7.5789 10.3886 8.26689 9.92699L12.0827 7.37201C13.3058 6.55286 13.3058 4.72601 12.0827 3.90686L8.26689 1.35188C7.5789 0.883795 6.44499 0.883795 5.757 1.34538Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                          <span>Посмотреть сертификаты</span>
                        </button>
                        <ul className="user-card__hashtag-list">
                          {trainer?.trainingType?.map((item, index) =>
                            <li className="user-card__hashtag-item" key={index}>
                              <div className="hashtag"><span>{getTypeTrainingTag(item as TrainingTypeEnum)}</span></div>
                            </li>
                          )}
                        </ul>
                        {!friends?.includes(id as string) &&
                          <button className="btn user-card__btn" type="button" onClick={addToFriendsButtonHandler}>
                            Добавить в друзья</button>
                        }
                        {friends?.includes(id as string) &&
                          <button className="btn user-card__btn" type="button" onClick={removeFromFriendsButtonHandler}>
                            Удалить из друзей</button>
                        }
                      </div>
                      <div className="user-card-coach__gallary">
                        <ul className="user-card-coach__gallary-list">
                          <li className="user-card-coach__gallary-item"><img src="assets/img/content/user-coach-photo1.jpg"
                            srcSet="assets/img/content/user-coach-photo1@2x.jpg 2x" width="334" height="573" alt="photo1" />
                          </li>
                          <li className="user-card-coach__gallary-item"><img src="assets/img/content/user-coach-photo2.jpg"
                            srcSet="assets/img/content/user-coach-photo2@2x.jpg 2x" width="334" height="573" alt="photo2" />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="user-card-coach__training">
                      <div className="user-card-coach__training-head">
                        <h2 className="user-card-coach__training-title">Тренировки</h2>
                        <div className="user-card-coach__training-bts">
                          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="back" onClick={leftArrowButtonClickHandler}>
                            <svg width="14" height="10" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                          </button>
                          <button className="btn-icon user-card-coach__training-btn" type="button" aria-label="next" onClick={rightArrowButtonClickHandler}>
                            <svg width="14" height="10" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0012 1L15 6L10.0012 11M1 6H14.86" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                          </button>
                        </div>
                      </div>
                      {trainings && <Slider ref={sliderRef} {...settings}>
                        {
                          trainings.map((item) =>
                            <UserCardTrainingListItemComponent key={item.id} training={item} />)
                        }
                      </Slider>}
                      <form className="user-card-coach__training-form">
                        {
                          <button className="btn user-card-coach__btn-training" type="button" disabled={actualPersonalTrainingSuggestion !== undefined || !friends?.includes(id as UUID)}
                            onClick={wantPersonalTrainingButtonClickHandler}>Хочу персональную
                            тренировку</button>
                        }
                        {isTrainerDataLoaded && !isAuthoriztionDataLoading &&
                          <div className="user-card-coach__training-check">
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input type="checkbox" value="user-agreement-1" name="user-agreement" onChange={subscribeInputChangeHandler} defaultChecked={subscribers.includes(authoriztionData.userId as UUID)} />
                                <span className="custom-toggle__icon">
                                  <svg width="9" height="6" aria-hidden="true" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.99647 7L10 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                </span>
                                <span className="custom-toggle__label">Получать уведомление на почту о новой тренировке</span>
                              </label>
                            </div>
                          </div>
                        }
                      </form>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        {trainer && <PopupMapComponent isActive={isPopupActive} geocode={GEOCODES[trainer?.location as LocationEnum] as Geocode}
          handleSetIsPopupActive={setIsPopupActive} location={getLocation(trainer?.location as LocationEnum)} />}
      </main>
    </div>
  );
}
