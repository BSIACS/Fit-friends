import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/app-routes.constants';
import { LocationEnum } from '../../types/location.enum';
import { TrainingTypeEnum } from '../../types/training-type.enum';
import { UUID } from '../../types/uuid.type';
import { getLocationTag, getTypeTrainingTag } from '../../utils/view-transform';
import { UserRoleEnum } from '../../types/user-role.enum';

type UsersListItemComponentProps = {
  id: UUID;
  name: string;
  role: string;
  avatarFileName: string;
  location: string;
  trainingType: string[];
}

export function UsersListItemComponent({ id, name, role, avatarFileName, location, trainingType }: UsersListItemComponentProps): JSX.Element {

  return (
    <li className="users-catalog__item">
      <div className={`thumbnail-user thumbnail-user--role-${role === 'user' ? 'user' : 'coach'}`}>
        <div className="thumbnail-user__image">
          <picture>
            <img src={`http://localhost:3042/assets/users-data/${id}/${avatarFileName}`}
              srcSet={`http://localhost:3042/assets/users-data/${id}/${avatarFileName} 2x`}
              width="82" height="82" alt="" />
          </picture>
        </div>
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="#icon-location"></use>
            </svg>
            <address className="thumbnail-user__location-address">{getLocationTag(location as LocationEnum)}</address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {trainingType.map((item) =>
            <li className="thumbnail-user__hashtags-item">
            <div className="hashtag thumbnail-user__hashtag"><span>{getTypeTrainingTag(item as TrainingTypeEnum)}</span></div>
          </li>
          )}
        </ul>
        <Link className="btn btn--medium thumbnail-user__button" to={role === UserRoleEnum.USER ? `${AppRoutes.USER_CARD}/${id}` : `${AppRoutes.TRAINER_CARD}/${id}`}>Подробнее</Link>
      </div>
    </li>
  );
}
