import { UUID } from '../../types/uuid.type';

type ReviewSideBarItemComponentProps = {
  userId: UUID;
  name: string;
  text: string;
  rating: number;
  avatarFileName: string;

}

export function ReviewSideBarItemComponent({ userId, name, text, rating, avatarFileName }: ReviewSideBarItemComponentProps): JSX.Element {

  return (
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <div className="review__user-photo">
            <picture>
              {/* <source type="image/webp"
              srcSet="assets/img/content/avatars/users/photo-1.webp, assets/img/content/avatars/users/photo-1@2x.webp 2x" /> */}
              <img src={`http://localhost:3042/assets/users-data/${userId}/${avatarFileName}`}
                srcSet="assets/img/content/avatars/users/photo-1@2x.png 2x" width="64" height="64"
                alt="Изображение пользователя" />
            </picture>
          </div><span className="review__user-name">{name}</span>
          <div className="review__rating">
            <svg width="16" height="16" aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.38211 1.15534L10.79 3.9943C10.9819 4.3895 11.4939 4.76856 11.9258 4.84115L14.4775 5.2686C16.1094 5.54282 16.4933 6.73647 15.3175 7.914L13.3337 9.91417C12.9977 10.2529 12.8137 10.9062 12.9177 11.374L13.4857 13.85C13.9336 15.8098 12.9017 16.568 11.1819 15.5437L8.79017 14.1162C8.35822 13.8581 7.6463 13.8581 7.20635 14.1162L4.81461 15.5437C3.1028 16.568 2.06292 15.8018 2.51087 13.85L3.07881 11.374C3.18279 10.9062 2.99881 10.2529 2.66285 9.91417L0.679071 7.914C-0.4888 6.73647 -0.112841 5.54282 1.51898 5.2686L4.0707 4.84115C4.49465 4.76856 5.00659 4.3895 5.19857 3.9943L6.60642 1.15534C7.37433 -0.385114 8.62219 -0.385114 9.38211 1.15534Z" fill="currentColor" /></svg>

            {/* <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg> */}
            <span>{rating}</span>
          </div>
        </div>
        <p className="review__comment">{text}</p>
      </div>
    </li>
  )
}