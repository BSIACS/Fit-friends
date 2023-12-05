
type TrainingListItemComponentProps = {
  name: string;
  description: string;
  calories: string;
  rating: string;
  price: string;

}

export function TrainingListItemComponent({name, description, calories, rating, price}: TrainingListItemComponentProps): JSX.Element {

  return (
    <li className="training-catalog__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source type="image/webp"
                srcSet="assets/img/content/thumbnails/training-02.webp, assets/img/content/thumbnails/training-02@2x.webp 2x" />
              <img src="assets/img/content/thumbnails/training-02.jpg"
                srcSet="assets/img/content/thumbnails/training-02@2x.jpg 2x" width="330" height="190" alt="" />

            </picture>
          </div>
          <p className="thumbnail-training__price">{+price === 0 ? 'Бесплатно' : price}
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
            <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
            <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
          </div>
        </div>
      </div>
    </li>
  )
}
