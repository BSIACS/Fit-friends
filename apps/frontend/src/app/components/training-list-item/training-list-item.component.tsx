import { Link } from 'react-router-dom';
import { TrainingDTO } from '../../dto/training.dto'
import { AppRoutes } from '../../constants/app-routes.constants';
import { getTypeTrainingTag } from '../../utils/view-transform';
import { TrainingTypeEnum } from '../../types/training-type.enum';

type TrainingListItemComponentProps = {
  training: TrainingDTO

}

export function TrainingListItemComponent({ training }: TrainingListItemComponentProps): JSX.Element {
  const { id, name, description, calories, rating, price, backgroundImgFileName, trainingType } = training;

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
          <p className="thumbnail-training__price">{Number(price as string) === 0 ? 'Бесплатно' : `${price} ₽`}
          </p>
          <h3 className="thumbnail-training__title">{name}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>{getTypeTrainingTag(trainingType as TrainingTypeEnum)}</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{calories}ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.38211 1.15534L10.79 3.9943C10.9819 4.3895 11.4939 4.76856 11.9258 4.84115L14.4775 5.2686C16.1094 5.54282 16.4933 6.73647 15.3175 7.914L13.3337 9.91417C12.9977 10.2529 12.8137 10.9062 12.9177 11.374L13.4857 13.85C13.9336 15.8098 12.9017 16.568 11.1819 15.5437L8.79017 14.1162C8.35822 13.8581 7.6463 13.8581 7.20635 14.1162L4.81461 15.5437C3.1028 16.568 2.06292 15.8018 2.51087 13.85L3.07881 11.374C3.18279 10.9062 2.99881 10.2529 2.66285 9.91417L0.679071 7.914C-0.4888 6.73647 -0.112841 5.54282 1.51898 5.2686L4.0707 4.84115C4.49465 4.76856 5.00659 4.3895 5.19857 3.9943L6.60642 1.15534C7.37433 -0.385114 8.62219 -0.385114 9.38211 1.15534Z" fill="currentColor" /></svg>
              <span className="thumbnail-training__rate-value">{rating}</span>
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
