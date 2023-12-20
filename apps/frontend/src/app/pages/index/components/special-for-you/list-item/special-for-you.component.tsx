
import { UUID } from '../../../../../types/uuid.type';
import { AppRoutes } from '../../../../../constants/app-routes.constants';
import { Link } from 'react-router-dom';

type SpecialForYouListItemComponentProps = {
  id: UUID,
  name: string,
  src: string,
  srcSet: string
}

export function SpecialForYouListItemComponent({id, name, src, srcSet}: SpecialForYouListItemComponentProps): JSX.Element {

  return (
    <li className="special-for-you__item" style={{ paddingRight: '22px', paddingBottom: '40px'}}>
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <img src={src} srcSet={srcSet} width="452" height="191" alt="" />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">{name}</h3>
          <div className="thumbnail-preview__button-wrapper">
            <Link to={`${AppRoutes.TRAINING_CARD_USER}/${id}`} className="btn btn--small thumbnail-preview__button" >Подробнее</Link>
          </div>
        </div>
      </div>
    </li>
  )
}
