import { Link } from 'react-router-dom';
import { TrainingDTO } from '../../dto/training.dto'
import { AppRoutes } from '../../constants/app-routes.constants';

type TrainingListItemComponentProps = {
  training: TrainingDTO

}

export function TrainingListItemComponent({ training }: TrainingListItemComponentProps): JSX.Element {
  const { id, name, description, calories, rating, price, backgroundImgFileName } = training;

  return (
    <li className="training-catalog__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <img src={`http://localhost:3042/assets/training-data/${id}/${backgroundImgFileName}`}
                srcSet={`http://localhost:3042/assets/training-data/${id}/${backgroundImgFileName}`} width="330" height="190"
                alt="" />
            </picture>
          </div>
          <p className="thumbnail-training__price">{Number(price as string) === 0 ? 'Бесплатно' : price}
          </p>
          <h3 className="thumbnail-training__title">{name}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#кроссфит</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{calories}ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="#icon-star"></use>
              </svg><span className="thumbnail-training__rate-value">{rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{description}</p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link className="btn btn--small thumbnail-training__button-catalog" to={`${AppRoutes.TRAINING_CARD_USER}/${id}`}>Подробнее</Link>
            <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to={`${AppRoutes.TRAINING_CARD_USER}/${id}`}>Отзывы</Link>
          </div>
        </div>
      </div>
    </li>
  )
}
