import { HeaderComponent } from '../../components/header/header.component'
import { LoaderComponent } from '../../components/loader/loader.component'


export function MyTrainingsPage(): JSX.Element {

  return (
    <div className="wrapper">
      <HeaderComponent />
      <LoaderComponent isHidden={true} />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <div className="my-training-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="my-training-form__wrapper">
                  <button className="btn-flat btn-flat--underlined my-training-form__btnback" type="button">
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="my-training-form__title">фильтры</h3>
                  <form className="my-training-form__form">
                    <div className="my-training-form__block my-training-form__block--price">
                      <h4 className="my-training-form__block-title">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input type="number" id="text-min" name="text-min" value="0" />
                          <label htmlFor="text-min">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input type="number" id="text-max" name="text-max" value="3200" />
                          <label htmlFor="text-max">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <div className="filter-range__scale">
                          <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
                        </div>
                        <div className="filter-range__control">
                          <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное
                            значение</span></button>
                          <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное
                            значение</span></button>
                        </div>
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--calories">
                      <h4 className="my-training-form__block-title">Калории</h4>
                      <div className="filter-calories">
                        <div className="filter-calories__input-text filter-calories__input-text--min">
                          <input type="number" id="text-min-cal" name="text-min-cal" />
                          <label htmlFor="text-min-cal">от</label>
                        </div>
                        <div className="filter-calories__input-text filter-calories__input-text--max">
                          <input type="number" id="text-max-cal" name="text-max-cal" />
                          <label htmlFor="text-max-cal">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <div className="filter-range__scale">
                          <div className="filter-range__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
                        </div>
                        <div className="filter-range__control">
                          <button className="filter-range__min-toggle"><span className="visually-hidden">Минимальное
                            значение</span></button>
                          <button className="filter-range__max-toggle"><span className="visually-hidden">Максимальное
                            значение</span></button>
                        </div>
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--raiting">
                      <h4 className="my-training-form__block-title">Рейтинг</h4>
                      <div className="filter-raiting">
                        <div className="filter-raiting__scale">
                          <div className="filter-raiting__bar"><span className="visually-hidden">Полоса прокрутки</span></div>
                        </div>
                        <div className="filter-raiting__control">
                          <button className="filter-raiting__min-toggle"><span className="visually-hidden">Минимальное
                            значение</span></button><span>0</span>
                          <button className="filter-raiting__max-toggle"><span className="visually-hidden">Максимальное
                            значение</span></button><span>5</span>
                        </div>
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--duration">
                      <h4 className="my-training-form__block-title">Длительность</h4>
                      <ul className="my-training-form__check-list">
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="duration-1" name="duration" /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">10 мин - 30 мин</span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="duration-1" name="duration" checked /><span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">30 мин - 50 мин</span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="duration-1" name="duration" /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span><span className="custom-toggle__label">50 мин - 80 мин</span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="duration-1" name="duration" />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">80 мин - 100 мин</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list">
                    <li className="my-trainings__item">
                      <div className="thumbnail-training">
                        <div className="thumbnail-training__inner">
                          <div className="thumbnail-training__image">
                            <picture>
                              <source type="image/webp"
                                srcSet="img/content/thumbnails/training-02.webp, img/content/thumbnails/training-02@2x.webp 2x" />
                              <img src="img/content/thumbnails/training-02.jpg"
                                srcSet="img/content/thumbnails/training-02@2x.jpg 2x" width="330" height="190" alt="" />
                            </picture>
                          </div>
                          <p className="thumbnail-training__price">Бесплатно
                          </p>
                          <h3 className="thumbnail-training__title">crossfit</h3>
                          <div className="thumbnail-training__info">
                            <ul className="thumbnail-training__hashtags-list">
                              <li className="thumbnail-training__hashtags-item">
                                <div className="hashtag thumbnail-training__hashtag"><span>#кроссфит</span></div>
                              </li>
                              <li className="thumbnail-training__hashtags-item">
                                <div className="hashtag thumbnail-training__hashtag"><span>#1200ккал</span></div>
                              </li>
                            </ul>
                            <div className="thumbnail-training__rate">
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-star"></use>
                              </svg><span className="thumbnail-training__rate-value">5</span>
                            </div>
                          </div>
                          <div className="thumbnail-training__text-wrapper">
                            <p className="thumbnail-training__text">Сложный комплекс упражнений для профессиональных атлетов
                              на&nbsp;отработку показателей в&nbsp;классическом стиле.</p>
                          </div>
                          <div className="thumbnail-training__button-wrapper">
                            <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                            <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="my-trainings__item">
                      <div className="thumbnail-training">
                        <div className="thumbnail-training__inner">
                          <div className="thumbnail-training__image">
                            <picture>
                              <source type="image/webp"
                                srcSet="img/content/thumbnails/training-01.webp, img/content/thumbnails/training-01@2x.webp 2x" />
                              <img src="img/content/thumbnails/training-01.jpg"
                                srcSet="img/content/thumbnails/training-01@2x.jpg 2x" width="330" height="190" alt="" />
                            </picture>
                          </div>
                          <p className="thumbnail-training__price"><span
                            className="thumbnail-training__price-value">800</span><span>₽</span>
                          </p>
                          <h3 className="thumbnail-training__title">energy</h3>
                          <div className="thumbnail-training__info">
                            <ul className="thumbnail-training__hashtags-list">
                              <li className="thumbnail-training__hashtags-item">
                                <div className="hashtag thumbnail-training__hashtag"><span>#пилатес</span></div>
                              </li>
                              <li className="thumbnail-training__hashtags-item">
                                <div className="hashtag thumbnail-training__hashtag"><span>#320ккал</span></div>
                              </li>
                            </ul>
                            <div className="thumbnail-training__rate">
                              <svg width="16" height="16" aria-hidden="true">
                                <use xlinkHref="#icon-star"></use>
                              </svg><span className="thumbnail-training__rate-value">4</span>
                            </div>
                          </div>
                          <div className="thumbnail-training__text-wrapper">
                            <p className="thumbnail-training__text">Упражнения укрепляют мышечный корсет, делают суставы более
                              гибкими, улучшают осанку и&nbsp;координацию.</p>
                          </div>
                          <div className="thumbnail-training__button-wrapper">
                            <a className="btn btn--small thumbnail-training__button-catalog" href="#">Подробнее</a>
                            <a className="btn btn--small btn--outlined thumbnail-training__button-catalog" href="#">Отзывы</a>
                          </div>
                        </div>
                      </div>
                    </li>

                  </ul>
                  <div className="show-more my-trainings__show-more">
                    <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                    <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в
                      начало</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
