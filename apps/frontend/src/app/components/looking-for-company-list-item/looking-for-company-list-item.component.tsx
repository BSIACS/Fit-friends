import { PersonDTO } from '../../dto/person.dto';
import { getLocationTag } from '../../utils/view-transform';
import { LocationEnum } from '../../types/location.enum';

type LookingForCompanyListItemComponentProps = {
  user: PersonDTO

}

export function LookingForCompanyListItemComponent({ user }: LookingForCompanyListItemComponentProps): JSX.Element {
  const { id, name, location, avatarFileName } = user;

  return (
    <li className="look-for-company__item">
      <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark" style={{width: '334px', margin: '0 21px 0 0'}}>
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
            <svg width="14" height="16" aria-hidden="true" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.00001 8.62182C8.19902 8.62182 9.17101 7.69035 9.17101 6.54132C9.17101 5.39229 8.19902 4.46083 7.00001 4.46083C5.801 4.46083 4.82901 5.39229 4.82901 6.54132C4.82901 7.69035 5.801 8.62182 7.00001 8.62182Z" stroke="currentColor" /><path d="M1.16892 5.3277C2.53971 -0.447009 11.4673 -0.440341 12.8311 5.33437C13.6313 8.72184 11.4325 12.256 9.50502 14.0298C8.10639 15.3234 5.89363 15.3234 4.48805 14.0298C2.56755 12.256 0.368708 8.71517 1.16892 5.3277Z" stroke="currentColor" /></svg>
            <address className="thumbnail-user__location-address">{getLocationTag(location as LocationEnum)}</address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          <li className="thumbnail-user__hashtags-item">
            <div className="hashtag thumbnail-user__hashtag"><span>#пилатес</span></div>
          </li>
        </ul>
        <a className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" href="#">Подробнее</a>
      </div>
    </li>
  )
}
