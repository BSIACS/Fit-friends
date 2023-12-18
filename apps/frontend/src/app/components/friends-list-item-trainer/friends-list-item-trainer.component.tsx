
import { PersonalTrainingInvitationDTO } from '../../dto/personal-training-suggestion.dto';
import { TrainerDTO } from '../../dto/trainer.dto';

type FriendsListItemTrainerProps = {
  trainer: TrainerDTO;
  actualResponse: PersonalTrainingInvitationDTO | undefined;
}

export function FriendsListItemTrainerComponent({ trainer, actualResponse }: FriendsListItemTrainerProps): JSX.Element {

  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div className="thumbnail-friend__info thumbnail-friend__info--theme-dark">
          <div className="thumbnail-friend__image-status">
            <div className="thumbnail-friend__image">
              <picture>
                <img src={`http://localhost:3042/assets/users-data/${trainer.id}/${trainer.avatarFileName}`}
                  srcSet={`http://localhost:3042/assets/users-data/${trainer.id}/${trainer.avatarFileName} 2x`}
                  width="82" height="82" alt="" />
              </picture>
              <div className="thumbnail-friend__online-status thumbnail-friend__online-status--is-online"></div>
            </div>
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">{trainer.name}</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="#icon-location"></use>
              </svg>
              <address className="thumbnail-friend__location-address">Спортивная</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            <li>
              <div className="hashtag thumbnail-friend__hashtag"><span>#йога</span></div>
            </li>
          </ul>
          <div className="thumbnail-friend__activity-bar">
            {trainer.isReadyForTraining &&
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready"><span>Готов
                к&nbsp;тренировке</span>
              </div>
            }
            {!trainer.isReadyForTraining &&
              <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-not-ready">
                <span>Не&nbsp;готов к&nbsp;тренировке</span>
              </div>
            }
          </div>
        </div>
        {
          actualResponse &&
          <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-coach">
            <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку {actualResponse.status as string}</p>
          </div>
        }
      </div>
    </li>
  );
}
