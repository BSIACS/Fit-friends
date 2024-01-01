import { useEffect, useState } from 'react';
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
import { FriendsListDTO } from '../../dto/friends-list.dto';
import { AuthorizationHeader, AxiosFactory } from '../../services/axios';

const requestWithAccessTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;

  return config;
}

export function UserCardPage(): JSX.Element {
  const authoriztionData = useAppSelector(state => state.authorization.authoriztionData);
  const isAuthoriztionDataLoading = useAppSelector(state => state.authorization.isLoading);
  const [user, setUser] = useState<UserDTO>();
  const [friends, setFriends] = useState<UUID[]>();
  const [isUserDataLoaded, setIsUserDataLoaded] = useState<boolean>(false);
  const [isFriendsDataLoaded, setIsFriendsDataLoaded] = useState<boolean>(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [isPopupActive, setIsPopupActive] = useState<boolean>(false);


  const { id } = useParams()

  useEffect(() => {
    getUserData();
  }, []);

  console.log(user);

  useEffect(() => {
    if (authoriztionData?.role) {
      getFriendsData();
    }
  }, [authoriztionData]);

  //#region API

  const getUserData = async () => {
    try {
      const response = await AxiosFactory.createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS }).get(`/users/detail/${id}`);
      setUser(response.data);
      setIsUserDataLoaded(true);
    }
    catch (error) {
      console.log('getUserData +++++++ ', error);

      setIsUserDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const getFriendsData = async () => {

    try {
      const response = await AxiosFactory.createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS }).get<FriendsListDTO>(`/userAccount/friends/${authoriztionData?.userId}`);
      const friends = response.data.friends?.map((item) => item.id);
      setFriends(friends as string[]);
      setIsFriendsDataLoaded(true);
    }
    catch (error) {
      console.log('getFriendsData +++++++ ', error);

      setIsFriendsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const addToFriends = async () => {
    try {
      setIsFriendsDataLoaded(false);
      await AxiosFactory.createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS })
        .post(`http://localhost:3042/api/userAccount/friends`, {
          newFriendId: id
        });
      if (friends && id) {
        setFriends([...friends, id]);
      }
      setIsFriendsDataLoaded(true);
    }
    catch (error) {
      console.log('addToFriends +++++++ ', error);

      setIsFriendsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const removeFromFriends = async () => {
    try {
      setIsFriendsDataLoaded(false);
      await AxiosFactory.createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS })
        .post(`http://localhost:3042/api/userAccount/friends/remove`, {
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
      console.log('removeFromFriends +++++++ ', error);

      setIsFriendsDataLoaded(true);
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

  if (isRequestError) {
    return <BadRequestPage />
  }

  return (
    <div className="wrapper">
      <LoaderComponent isHidden={isUserDataLoaded && !isAuthoriztionDataLoading && isFriendsDataLoaded} />
      <HeaderComponent />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <Link className="btn-flat inner-page__back" to={AppRoutes.USERS_CATALOG} type="button">
                <svg width="14" height="10" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                <span>Назад</span>
              </Link>
              <div className="inner-page__content">
                <section className="user-card">
                  <h1 className="visually-hidden">Карточка пользователя</h1>
                  <div className="user-card__wrapper">
                    <div className="user-card__content">
                      <div className="user-card__head">
                        <h2 className="user-card__title">{user?.name}</h2>
                      </div>
                      <div className="user-card__label" onClick={locationButtonClickHandler}>
                        <div style={{ cursor: 'pointer', color: '#333333' }}>
                          <svg width="12" height="14" aria-hidden="true" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00001 8.62182C8.19902 8.62182 9.17101 7.69035 9.17101 6.54132C9.17101 5.39229 8.19902 4.46083 7.00001 4.46083C5.801 4.46083 4.82901 5.39229 4.82901 6.54132C4.82901 7.69035 5.801 8.62182 7.00001 8.62182Z" stroke="currentColor" /><path d="M1.16892 5.3277C2.53971 -0.447009 11.4673 -0.440341 12.8311 5.33437C13.6313 8.72184 11.4325 12.256 9.50502 14.0298C8.10639 15.3234 5.89363 15.3234 4.48805 14.0298C2.56755 12.256 0.368708 8.71517 1.16892 5.3277Z" stroke="currentColor" /></svg>
                          <span>{getLocation(user?.location as LocationEnum)}</span>
                        </div>
                      </div>
                      <div className={`${user?.isReadyForTraining ? 'user-card__status' : 'user-card__status-not-ready'}`}>
                        <span>{`${user?.isReadyForTraining ? 'Готов' : 'Не готов'} к тренировке`}</span>
                      </div>
                      <div className="user-card__text">
                        {user?.description}
                      </div>
                      <ul className="user-card__hashtag-list">
                        {user?.trainingType?.map((item, index) =>
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
                    <div className="user-card__gallary">
                      <ul className="user-card__gallary-list">
                        <li className="user-card__gallary-item"><img src="assets/img/content/user-card-photo1.jpg"
                          srcSet="assets/img/content/user-card-photo1@2x.jpg 2x" width="334" height="573" alt="photo1" />
                        </li>
                        <li className="user-card__gallary-item"><img src="assets/img/content/user-card-photo2.jpg"
                          srcSet="assets/img/content/user-card-photo2@2x.jpg 2x" width="334" height="573" alt="photo2" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        {user && <PopupMapComponent isActive={isPopupActive} geocode={GEOCODES[user?.location as LocationEnum] as Geocode}
          handleSetIsPopupActive={setIsPopupActive} location={getLocation(user?.location as LocationEnum)} />}
      </main>
    </div>
  );
}
