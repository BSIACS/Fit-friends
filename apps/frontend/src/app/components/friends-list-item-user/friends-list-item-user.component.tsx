
import { useState } from 'react';
import { PersonalTrainingInvitationDTO } from '../../dto/personal-training-suggestion.dto';
import { UserDTO } from '../../dto/user.dto';
import { PersonalTrainingRequestStatusEnum } from '../../types/personal-training-request-status.enum';
import { TrainingTypeEnum } from '../../types/training-type.enum';
import { UUID } from '../../types/uuid.type';
import { getLocationTag, getTypeTrainingTag } from '../../utils/view-transform';
import { LocationEnum } from '../../types/location.enum';

type FriendsListItemUserProps = {
  user: UserDTO,
  actualRequest: PersonalTrainingInvitationDTO | undefined,
  actualResponse: PersonalTrainingInvitationDTO | undefined,
  handleRejectButtonClick: ((id: UUID) => Promise<PersonalTrainingInvitationDTO | undefined>) | undefined,
  handleAcceptButtonClick: ((id: UUID) => Promise<PersonalTrainingInvitationDTO | undefined>) | undefined,
  handleCreateButtonClick: ((id: UUID) => Promise<PersonalTrainingInvitationDTO | undefined>) | undefined,
}

export function FriendsListItemUserComponent({ user, actualRequest, actualResponse, handleRejectButtonClick, handleAcceptButtonClick, handleCreateButtonClick }: FriendsListItemUserProps): JSX.Element {
  const [trainingRequest, setTrainingRequest] = useState(actualRequest)
  const [trainingResponse, setTrainingResponse] = useState(actualResponse)

  const inviteButtonClickHandler = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (handleCreateButtonClick === undefined) {
      return;
    }

    const updatedInvitation = await handleCreateButtonClick(user?.id as UUID);
    if (updatedInvitation !== undefined) {
      setTrainingResponse(updatedInvitation);
    }
  }

  const acceptButtonClickHandler = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (handleAcceptButtonClick === undefined) {
      return;
    }

    const updatedInvitation = await handleAcceptButtonClick(actualRequest?.id as UUID);
    if (updatedInvitation !== undefined) {
      setTrainingRequest(updatedInvitation);
    }
  }

  const rejectButtonClickHandler = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (handleRejectButtonClick === undefined) {
      return;
    }

    const updatedInvitation = await handleRejectButtonClick(actualRequest?.id as UUID);
    if (updatedInvitation !== undefined) {
      setTrainingRequest(updatedInvitation);
    }
  }

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-light">
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <img src={`http://localhost:3042/assets/users-data/${user.id}/${user.avatarFileName}`}
                  srcSet={`http://localhost:3042/assets/users-data/${user.id}/${user.avatarFileName} 2x`}
                  width="82" height="82" alt="" />
              </picture>
              <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{user.name}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00001 8.62182C8.19902 8.62182 9.17101 7.69035 9.17101 6.54132C9.17101 5.39229 8.19902 4.46083 7.00001 4.46083C5.801 4.46083 4.82901 5.39229 4.82901 6.54132C4.82901 7.69035 5.801 8.62182 7.00001 8.62182Z" stroke="currentColor" /><path d="M1.16892 5.3277C2.53971 -0.447009 11.4673 -0.440341 12.8311 5.33437C13.6313 8.72184 11.4325 12.256 9.50502 14.0298C8.10639 15.3234 5.89363 15.3234 4.48805 14.0298C2.56755 12.256 0.368708 8.71517 1.16892 5.3277Z" stroke="currentColor" /></svg>
              <address className="thumbnail-friend__location-address">{getLocationTag(user.location as LocationEnum)}</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {
              user.trainingType?.map((item) =>
                <li key={item}>
                  <div className="hashtag thumbnail-friend__hashtag"><span>{getTypeTrainingTag(item as TrainingTypeEnum)}</span></div>
                </li>
              )
            }
          </ul>
          <div className="thumbnail-friend__activity-bar">
            {
              user.isReadyForTraining &&
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов
                к&nbsp;тренировке</span>
              </div>
            }
            {
              !user.isReadyForTraining &&
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                <span>Не&nbsp;готов к&nbsp;тренировке</span>
              </div>
            }
            {handleCreateButtonClick &&
              <button disabled={
                !user.isReadyForTraining ||
                trainingRequest?.status === PersonalTrainingRequestStatusEnum.UNDER_CONSIDERATION ||
                trainingResponse?.status === PersonalTrainingRequestStatusEnum.UNDER_CONSIDERATION}
                className="thumbnail-friend__invite-button" data-user-id={user.id} type="button" onClick={inviteButtonClickHandler}>
                <svg width="43" height="46" aria-hidden="true" focusable="false" viewBox="0 0 43 46" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="21" cy="25" r="20.5" stroke="currentColor" /><path d="M25.144 20C23.776 20 22.144 20.4815 22.144 22.7778V27.2222C22.144 29.5185 23.776 30 25.144 30C26.512 30 28.144 29.5185 28.144 27.2222V22.7778C28.144 20.4815 26.512 20 25.144 20Z" fill="currentColor" /><path d="M16.856 20C15.488 20 13.856 20.4815 13.856 22.7778V27.2222C13.856 29.5185 15.488 30 16.856 30C18.224 30 19.856 29.5185 19.856 27.2222V22.7778C19.856 20.4815 18.224 20 16.856 20Z" fill="currentColor" /><path d="M22.144 24.4444H19.856V25.5556H22.144V24.4444Z" fill="currentColor" /><path d="M29.4 27.4074C29.072 27.4074 28.8 27.1556 28.8 26.8519V23.1481C28.8 22.8444 29.072 22.5926 29.4 22.5926C29.728 22.5926 30 22.8444 30 23.1481V26.8519C30 27.1556 29.728 27.4074 29.4 27.4074Z" fill="currentColor" /><path d="M12.6 27.4074C12.272 27.4074 12 27.1556 12 26.8519V23.1481C12 22.8444 12.272 22.5926 12.6 22.5926C12.928 22.5926 13.2 22.8444 13.2 23.1481V26.8519C13.2 27.1556 12.928 27.4074 12.6 27.4074Z" fill="currentColor" /><path d="M42 9C42 13.4183 38.4183 17 34 17C29.5817 17 26 13.4183 26 9C26 4.58172 29.5817 1 34 1C37.4117 1 40.3245 3.13558 41.4747 6.14286C41.8141 7.03017 42 7.99337 42 9Z" fill="white" /><path d="M41.4747 6.14286L41.0077 6.32147V6.32147L41.4747 6.14286ZM34.5001 6.00001C34.5001 5.72387 34.2762 5.50001 34.0001 5.5C33.7239 5.49999 33.5001 5.72385 33.5001 5.99999L34.5001 6.00001ZM33.5001 12C33.5001 12.2762 33.7239 12.5 34.0001 12.5C34.2762 12.5 34.5001 12.2761 34.5001 12L33.5001 12ZM37 9.5C37.2761 9.5 37.5 9.27614 37.5 9C37.5 8.72386 37.2761 8.5 37 8.5V9.5ZM31 8.5C30.7239 8.5 30.5 8.72386 30.5 9C30.5 9.27614 30.7239 9.5 31 9.5V8.5ZM41.5 9C41.5 13.1421 38.1421 16.5 34 16.5V17.5C38.6944 17.5 42.5 13.6944 42.5 9H41.5ZM34 16.5C29.8579 16.5 26.5 13.1421 26.5 9H25.5C25.5 13.6944 29.3056 17.5 34 17.5V16.5ZM26.5 9C26.5 4.85786 29.8579 1.5 34 1.5V0.5C29.3056 0.5 25.5 4.30558 25.5 9H26.5ZM34 1.5C37.1976 1.5 39.9291 3.50133 41.0077 6.32147L41.9417 5.96424C40.7199 2.76983 37.6257 0.5 34 0.5V1.5ZM41.0077 6.32147C41.3256 7.15266 41.5 8.05538 41.5 9H42.5C42.5 7.93137 42.3026 6.90769 41.9417 5.96424L41.0077 6.32147ZM33.5001 5.99999L33.5 8.99999L34.5 9.00001L34.5001 6.00001L33.5001 5.99999ZM33.5 9.00001L33.5001 12L34.5001 12L34.5 8.99999L33.5 9.00001ZM34 9.5H37V8.5H34V9.5ZM34 8.5H31V9.5H34V8.5Z" fill="currentColor" /></svg>
                <span className="visually-hidden">Пригласить друга на совместную тренировку</span>
              </button>
            }
          </div>
        </div>
        {
          trainingRequest?.status === PersonalTrainingRequestStatusEnum.UNDER_CONSIDERATION &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку</p>
            <div className="thumbnail-friend__button-wrapper">
              <button className="btn btn--medium btn--dark-bg thumbnail-friend__button"
                type="button" onClick={acceptButtonClickHandler}>Принять</button>
              <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button"
                type="button" onClick={rejectButtonClickHandler}>Отклонить</button>
            </div>
          </div>
        }
        {
          trainingResponse &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;совместную тренировку {trainingResponse.status}</p>
          </div>
        }
      </div>
    </li >
  );
}
