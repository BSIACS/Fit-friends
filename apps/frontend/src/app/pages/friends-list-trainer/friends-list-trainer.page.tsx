import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { HeaderComponent } from '../../components/header/header.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { UserDTO } from '../../dto/user.dto';
import { FriendsListItemUserComponent } from '../../components/friends-list-item-user/friends-list-item-user.component';
import { TrainerDTO } from '../../dto/trainer.dto';
import { PersonalTrainingInvitationDTO } from '../../dto/personal-training-suggestion.dto';
import { UUID } from '../../types/uuid.type';
import { PersonalTrainingRequestStatusEnum } from '../../types/personal-training-request-status.enum';
import { BadRequestPage } from '../bad-request/bad-request.page';
import { FriendsListDTO } from '../../dto/friends-list.dto';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/app-routes.constants';
import { AuthorizationHeader, AxiosFactory } from '../../services/axios';


export function FriendsListTrainerPage(): JSX.Element {
  const authoriztionData = useAppSelector(state => state.authorization.authoriztionData);
  const isAuthoriztionDataLoading = useAppSelector(state => state.authorization.isLoading);
  //Список друзей авторизованного пользователя
  const [friends, setFriends] = useState<(UserDTO | TrainerDTO)[]>();
  //Запросы тренеру на персональную тренировку
  const [personalTrainingRequests, setPersonalTrainingRequests] = useState<PersonalTrainingInvitationDTO[]>();

  const [friendsNumber, setFriendsNumber] = useState<number>(0);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  const [isFriendsDataLoaded, setIsFriendsDataLoaded] = useState<boolean>(false);
  const [isPersonalTrainingRequestsDataLoaded, setIsPersonalTrainingRequestsDataLoaded] = useState<boolean>(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);

  useEffect(() => {
    getPersonalTrainingRequests();
  }, []);

  useEffect(() => {
    if (authoriztionData?.role) {
      getFriendsData();
    }
  }, [authoriztionData]);

  const getFriendsData = async () => {
    try {
      setIsFriendsDataLoaded(false);

      const response = await AxiosFactory
        .createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS })
        .get<FriendsListDTO>(`/trainerAccount/friends/${authoriztionData?.userId}?friendsPerPage=${3}&pageNumber=${currentPageNumber}`);

      if (friends === undefined) {
        setFriends(response.data.friends);
      }
      else {
        setFriends([...friends, ...response.data.friends as (UserDTO | TrainerDTO)[]]);
      }

      setFriendsNumber(response.data.friendsNumber as number);
      setCurrentPageNumber(currentPageNumber + 1);
      setIsFriendsDataLoaded(true);
    }
    catch (error) {
      setIsFriendsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  //Запросы на персональную тренировку от пользователей
  const getPersonalTrainingRequests = async () => {
    try {
      setIsPersonalTrainingRequestsDataLoaded(false);

      const response = await AxiosFactory
        .createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS })
        .post<PersonalTrainingInvitationDTO[]>(`/trainingRequest/getPersonalTrainingsByResponserId`, {});

      setPersonalTrainingRequests(response.data);
      setIsPersonalTrainingRequestsDataLoaded(true);
    }
    catch (error) {
      setIsPersonalTrainingRequestsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const acceptPersonalTrainingRequest = async (id: UUID) => {
    try {
      setIsPersonalTrainingRequestsDataLoaded(false);

      const response = await AxiosFactory
        .createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS })
        .patch<PersonalTrainingInvitationDTO>(`/trainingRequest/personalTraining`, {
          id: id,
          status: PersonalTrainingRequestStatusEnum.ACCEPTED
        });

      setIsPersonalTrainingRequestsDataLoaded(true);

      return response.data;
    }
    catch (error) {
      setIsPersonalTrainingRequestsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const rejectPersonalTrainingRequest = async (id: UUID) => {
    try {
      setIsPersonalTrainingRequestsDataLoaded(false);

      const response = await AxiosFactory
        .createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS })
        .patch<PersonalTrainingInvitationDTO>(`/trainingRequest/personalTraining`, {
          id: id,
          status: PersonalTrainingRequestStatusEnum.REJECTED
        });

      setIsPersonalTrainingRequestsDataLoaded(true);

      return response.data;
    }
    catch (error) {
      setIsPersonalTrainingRequestsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const getLastPersonalTrainingRequests = (requesterId: UUID, invitations: PersonalTrainingInvitationDTO[]) => {
    const requesterInvitations = invitations?.filter((item) => item.requestorId === requesterId);
    const requesterInvitationsSortedByDate = requesterInvitations?.sort((item_1, item_2) => ((new Date(item_2.createdAt as string)).getTime() / 1000) - ((new Date(item_1.createdAt as string)).getTime() / 1000));

    if (requesterInvitationsSortedByDate === undefined || requesterInvitationsSortedByDate.length <= 0) {
      return undefined;
    }

    return requesterInvitationsSortedByDate[0];
  }

  const showMoreButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    getFriendsData();
  }

  if (isRequestError) {
    return <BadRequestPage />
  }

  return (
    <div className="wrapper">
      <LoaderComponent isHidden={!isAuthoriztionDataLoading && isPersonalTrainingRequestsDataLoaded && isFriendsDataLoaded} />
      <HeaderComponent />
      <main>
        <section className="friends-list">
          <div className="container">
            <div className="friends-list__wrapper">
              <Link className="btn-flat friends-list__back" to={AppRoutes.TRAINER_ACCOUNT}>
                <svg width="14" height="10" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>Назад</span>
              </Link>
              <div className="friends-list__title-wrapper">
                <h1 className="friends-list__title">Мои друзья</h1>
              </div>
              <ul className="friends-list__list">
                {
                  friends?.map((friend) =>
                    <FriendsListItemUserComponent
                      key={friend.id}
                      user={friend}
                      actualRequest={getLastPersonalTrainingRequests(friend.id as UUID, personalTrainingRequests as PersonalTrainingInvitationDTO[])}
                      actualResponse={undefined}
                      handleAcceptButtonClick={acceptPersonalTrainingRequest}
                      handleCreateButtonClick={undefined}
                      handleRejectButtonClick={rejectPersonalTrainingRequest} />
                  )
                }
              </ul>
              <div className="show-more friends-list__show-more">
                {
                  friends && !((friends as (UserDTO | TrainerDTO)[]).length >= friendsNumber) &&
                  <button className="btn show-more__button show-more__button--more"
                    onClick={showMoreButtonClick} type="button">Показать еще</button>
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
