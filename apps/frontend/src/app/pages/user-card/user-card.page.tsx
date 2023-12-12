import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const requestWithAccessTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;

  return config;
}

export function UserCardPage(): JSX.Element {
  const authoriztionData = useAppSelector(state => state.authorization.authoriztionData);
  const isAuthoriztionDataLoading = useAppSelector(state => state.authorization.isLoading);
  const [user, setUser] = useState<UserDTO>();
  const [loggedUser, setLoggedUser] = useState<UserDTO>();
  const [isUserDataLoaded, setIsUserDataLoaded] = useState<boolean>(false);
  const [isLoggedUserDataLoaded, setIsLoggedUserDataLoaded] = useState<boolean>(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);

  const { id } = useParams()

  useEffect(() => {
    getUserData();
    getLoggedUserData();
  }, []);

  console.log(authoriztionData);


  const getUserData = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      const response = await axiosInstance.get(`http://localhost:3042/api/users/detail/${id}`);
      setUser(response.data);
      setIsUserDataLoaded(true);
    }
    catch (error) {
      setIsUserDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const getLoggedUserData = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      const response = await axiosInstance.get(`http://localhost:3042/api/users/detail/${authoriztionData.userId}`);
      setLoggedUser(response.data);
      setIsLoggedUserDataLoaded(true);
    }
    catch (error) {
      setIsLoggedUserDataLoaded(true);
      setIsRequestError(true);
    }
  }

  if (isRequestError) {
    return <BadRequestPage />
  }

  return (
    <div className="wrapper">
      <LoaderComponent isHidden={isLoggedUserDataLoaded && isUserDataLoaded} />
      <HeaderComponent />
      <main>
        <div className="inner-page inner-page--no-sidebar">
          <div className="container">
            <div className="inner-page__wrapper">
              <button className="btn-flat inner-page__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="inner-page__content">
                <section className="user-card">
                  <h1 className="visually-hidden">Карточка пользователя</h1>
                  <div className="user-card__wrapper">
                    <div className="user-card__content">
                      <div className="user-card__head">
                        <h2 className="user-card__title">{user?.name}</h2>
                      </div>
                      <div className="user-card__label">
                        <a href="" >
                          <svg width="12" height="14" aria-hidden="true" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00001 8.62182C8.19902 8.62182 9.17101 7.69035 9.17101 6.54132C9.17101 5.39229 8.19902 4.46083 7.00001 4.46083C5.801 4.46083 4.82901 5.39229 4.82901 6.54132C4.82901 7.69035 5.801 8.62182 7.00001 8.62182Z" stroke="currentColor" /><path d="M1.16892 5.3277C2.53971 -0.447009 11.4673 -0.440341 12.8311 5.33437C13.6313 8.72184 11.4325 12.256 9.50502 14.0298C8.10639 15.3234 5.89363 15.3234 4.48805 14.0298C2.56755 12.256 0.368708 8.71517 1.16892 5.3277Z" stroke="currentColor" /></svg>
                          <span>{getLocation(user?.location as LocationEnum)}</span>
                        </a>
                      </div>
                      <div className="user-card__status"><span>Готов к тренировке</span></div>
                      <div className="user-card__text">
                        {user?.description}
                      </div>
                      <ul className="user-card__hashtag-list">
                        {user?.trainingType?.map((item) =>
                          <li className="user-card__hashtag-item">
                            <div className="hashtag"><span>{getTypeTrainingTag(item as TrainingTypeEnum)}</span></div>
                          </li>
                        )}
                      </ul>
                      <button className="btn user-card__btn" type="button">Добавить в друзья</button>
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
      </main>
    </div>
  );
}
