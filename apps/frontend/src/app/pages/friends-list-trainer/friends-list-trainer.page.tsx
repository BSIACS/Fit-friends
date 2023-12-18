import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { HeaderComponent } from '../../components/header/header.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import axios from 'axios';
import { InternalAxiosRequestConfig } from 'axios';
import { getAccessToken } from '../../services/token';
import { UserDTO } from '../../dto/user.dto';
import { UserRoleEnum } from '../../types/user-role.enum';
import { FriendsListItemUserComponent } from '../../components/friends-list-item-user/friends-list-item-user.component';
import { FriendsListItemTrainerComponent } from '../../components/friends-list-item-trainer/friends-list-item-trainer.component';
import { TrainerDTO } from '../../dto/trainer.dto';
import { PersonalTrainingInvitationDTO } from '../../dto/personal-training-suggestion.dto';
import { UUID } from '../../types/uuid.type';
import { AppRoutes } from '../../constants/app-routes.constants';
import { Link } from 'react-router-dom';
import { CooperativeTrainingInvitationDTO } from '../../dto/cooperative-training-suggestion.dto';
import { PersonalTrainingRequestStatusEnum } from '../../types/personal-training-request-status.enum';
import { BadRequestPage } from '../bad-request/bad-request.page';
import { FriendsListDTO } from '../../dto/friends-list.dto';


const requestWithAccessTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;

  return config;
}

export function FriendsListTrainerPage(): JSX.Element {
  const authoriztionData = useAppSelector(state => state.authorization.authoriztionData);
  const isAuthoriztionDataLoading = useAppSelector(state => state.authorization.isLoading);
  //Список друзей авторизованного пользователя
  const [friends, setFriends] = useState<(UserDTO | TrainerDTO)[]>();
  //Запрсы авторизованного пользователя
  const [сooperativeTrainingRequests, setCooperativeTrainingRequests] = useState<CooperativeTrainingInvitationDTO[]>();
  //Ответы авторизованному пользователю
  const [сooperativeTrainingResponses, setСooperativeTrainingResponses] = useState<CooperativeTrainingInvitationDTO[]>();
  //Ответы авторизованному пользователю
  const [personalTrainingResponses, setPersonalTrainingResponses] = useState<PersonalTrainingInvitationDTO[]>();

  const [friendsNumber, setFriendsNumber] = useState<number>(0);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);


  const [isFriendsDataLoaded, setIsFriendsDataLoaded] = useState<boolean>(false);
  const [isCooperativeTrainingRequestsDataLoaded, setIsCooperativeTrainingRequestsDataLoaded] = useState<boolean>(false);
  const [isCooperativeTrainingResponsesDataLoaded, setIsCooperativeTrainingResponsesDataLoaded] = useState<boolean>(false);
  const [isPersonalTrainingResponsesDataLoaded, setIsPersonalTrainingResponsesDataLoaded] = useState<boolean>(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);

  useEffect(() => {
    // getCooperativeTrainingRequests();
    // getPersonalTrainingResponses();
    // getCooperativeTrainingResponses();
  }, []);

  useEffect(() => {
    if (authoriztionData.role) {
      //getFriendsData();
    }
  }, [authoriztionData]);

  const getFriendsData = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsFriendsDataLoaded(false);
      const response = await axiosInstance.
        get<FriendsListDTO>(`http://localhost:3042/api/userAccount/friends/${authoriztionData.userId}?friendsPerPage=${3}&pageNumber=${currentPageNumber}`);
      if (friends === undefined) {
        setFriends(response.data.friends);
      }
      else {
        setFriends([...friends, ...response.data.friends as (UserDTO | TrainerDTO)[]]);
      }
      console.log(response.data.friendsNumber);

      setFriendsNumber(response.data.friendsNumber as number);
      setCurrentPageNumber(currentPageNumber + 1);
      setIsFriendsDataLoaded(true);
    }
    catch (error) {
      setIsFriendsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  //Запросы на совместную тренировку к авторизованному пользователю
  const getCooperativeTrainingRequests = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsCooperativeTrainingRequestsDataLoaded(false);
      const response = await axiosInstance.
        post<PersonalTrainingInvitationDTO[]>(`http://localhost:3042/api/trainingRequest/getCooperativeTrainingsByResponserId`, {});
      setCooperativeTrainingRequests(response.data);
      setIsCooperativeTrainingRequestsDataLoaded(true);
    }
    catch (error) {
      setIsCooperativeTrainingRequestsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  //Ответы на запросы о совместной тренировке
  const getCooperativeTrainingResponses = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsCooperativeTrainingResponsesDataLoaded(false);
      const response = await axiosInstance.
        post<CooperativeTrainingInvitationDTO[]>(`http://localhost:3042/api/trainingRequest/getCooperativeTrainingsByRequesterId`, {});
      setСooperativeTrainingResponses(response.data);
      setIsCooperativeTrainingResponsesDataLoaded(true);
    }
    catch (error) {
      setIsCooperativeTrainingResponsesDataLoaded(true);
      setIsRequestError(true);
    }
  }

  //Ответы на запросы о персональной тренировке от тренеров
  const getPersonalTrainingResponses = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsPersonalTrainingResponsesDataLoaded(false);
      const response = await axiosInstance.
        post<PersonalTrainingInvitationDTO[]>(`http://localhost:3042/api/trainingRequest/getPersonalTrainingsByRequesterId`, {});
      setPersonalTrainingResponses(response.data);
      setIsPersonalTrainingResponsesDataLoaded(true);
    }
    catch (error) {
      setIsPersonalTrainingResponsesDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const acceptInvitation = async (id: UUID) => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsPersonalTrainingResponsesDataLoaded(false);
      const response = await axiosInstance.patch<PersonalTrainingInvitationDTO>(`http://localhost:3042/api/trainingRequest/cooperativeTraining`, {
        id: id,
        status: PersonalTrainingRequestStatusEnum.ACCEPTED
      });
      setIsPersonalTrainingResponsesDataLoaded(true);

      return response.data;
    }
    catch (error) {
      setIsPersonalTrainingResponsesDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const rejectInvitation = async (id: UUID) => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsPersonalTrainingResponsesDataLoaded(false);
      const response = await axiosInstance.patch<PersonalTrainingInvitationDTO>(`http://localhost:3042/api/trainingRequest/cooperativeTraining`, {
        id: id,
        status: PersonalTrainingRequestStatusEnum.REJECTED
      });
      setIsPersonalTrainingResponsesDataLoaded(true);

      return response.data;
    }
    catch (error) {
      setIsPersonalTrainingResponsesDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const createCooperativeTrainingRequest = async (id: UUID) => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsCooperativeTrainingRequestsDataLoaded(false);
      const response = await axiosInstance.post<PersonalTrainingInvitationDTO>(`http://localhost:3042/api/trainingRequest/cooperative`, {
        responserId: id
      });
      setCooperativeTrainingRequests([response.data]);
      setIsCooperativeTrainingRequestsDataLoaded(true);

      return response.data;
    }
    catch (error) {
      setIsCooperativeTrainingRequestsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const getLastPersonalTrainingResponse = (responserId: UUID, invitations: PersonalTrainingInvitationDTO[]) => {
    const responserInvitations = invitations?.filter((item) => item.responserId === responserId);
    const responserInvitationsSortedByDate = responserInvitations?.sort((item_1, item_2) => ((new Date(item_2.createdAt as string)).getTime() / 1000) - ((new Date(item_1.createdAt as string)).getTime() / 1000));

    if (responserInvitationsSortedByDate === undefined || responserInvitationsSortedByDate.length <= 0) {
      return undefined;
    }

    return responserInvitationsSortedByDate[0];
  }

  const getLastCooperativeTrainingRequest = (requesterId: UUID, invitations: CooperativeTrainingInvitationDTO[]) => {
    const requesterInvitations = invitations?.filter((item) => item.requesterId === requesterId);
    const requesterInvitationsSortedByDate = requesterInvitations?.sort((item_1, item_2) => ((new Date(item_2.createdAt as string)).getTime() / 1000) - ((new Date(item_1.createdAt as string)).getTime() / 1000));

    if (requesterInvitationsSortedByDate === undefined || requesterInvitationsSortedByDate.length <= 0) {
      return undefined;
    }

    return requesterInvitationsSortedByDate[0];
  }

  const getLastCooperativeTrainingResponses = (responserId: UUID, invitations: CooperativeTrainingInvitationDTO[]) => {
    const responserInvitations = invitations?.filter((item) => item.responserId === responserId);
    const responserInvitationsSortedByDate = responserInvitations?.sort((item_1, item_2) => ((new Date(item_2.createdAt as string)).getTime() / 1000) - ((new Date(item_1.createdAt as string)).getTime() / 1000));

    if (responserInvitationsSortedByDate === undefined || responserInvitationsSortedByDate.length <= 0) {
      return undefined;
    }

    return responserInvitationsSortedByDate[0];
  }

  const showMoreButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    getFriendsData();
  }

  if (isRequestError) {
    return <BadRequestPage />
  }

  return (
    <div className="wrapper">
      <LoaderComponent isHidden={!isAuthoriztionDataLoading} />
      <HeaderComponent />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <button className="btn-flat friends-list__back" type="button">
                <svg width="14" height="10" aria-hidden="true">
                  <use xlinkHref="#arrow-left"></use>
                </svg><span>Назад</span>
              </button>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
                {/* <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right" data-validate-type="checkbox">
                  <label>
                    <input type="checkbox" value="user-agreement-1" name="user-agreement"><span className="custom-toggle__icon">
                      <svg width="9" height="6" aria-hidden="true">
                        <use xlinkHref="#arrow-check"></use>
                      </svg></span><span className="custom-toggle__label">Только онлайн</span>
                  </label>
                </div> */}
              </div>
              <ul className="friends-list__list">

              </ul>
              <div className="show-more friends-list__show-more">
                <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в начало</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
