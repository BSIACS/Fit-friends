import { useEffect } from 'react';
import { HeaderComponent } from '../../components/header/header.component';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getTrainingsDataThunk } from '../../store/slices/application.thunk';
import { useSearchParams } from 'react-router-dom';
import { TrainingListItemComponent } from '../../components/training-list-item/training-list-item.component';
import ReactSlider from "react-slider";
import { TrainingTypeEnum } from '../../types/training-type.enum';
import { SortEnum } from '../../types/sort.enum';
import { LoaderComponent } from '../../components/loader/loader.component';


const queryParamsInitialValue = {
  priceRange: [100, 5000],
  rating: [0, 5],
  price: [0, 10000],
  calories: [0, 5000],
  trainingTypes: [              ///Переделать инициализацию
    TrainingTypeEnum.AEROBICS,
    TrainingTypeEnum.BOX,
    TrainingTypeEnum.CROSSFIT,
    TrainingTypeEnum.PILATES,
    TrainingTypeEnum.RUNNING,
    TrainingTypeEnum.STRETCHING,
    TrainingTypeEnum.YOGA,
  ].join(','),
  sortDirection: SortEnum.ASC,
}

export function TrainingCatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isTrainingDataLoading = useAppSelector(state => state.application.isTrainingDataLoading);
  const trainings: any[] = useAppSelector(state => state.application.actualTrainingsData);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getTrainingsDataThunk(`?${searchParams.toString()}`));
  }, [searchParams]);

  const priceRangeChangedHandler = (price: number[]) => {
    searchParams.set('minPrice', price[0].toString());
    searchParams.set('maxPrice', price[1].toString());
    setSearchParams([...searchParams]);
  }

  const minPriceInputChangeHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    searchParams.set('minPrice', evt.currentTarget.value);
    setSearchParams([...searchParams]);
  }

  const maxPriceInputChangeHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    searchParams.set('maxPrice', evt.currentTarget.value);
    setSearchParams([...searchParams]);
  }

  const rateRangeChangedHandler = (rating: number[]) => {
    searchParams.set('minRate', rating[0].toString());
    searchParams.set('maxRate', rating[1].toString());
    setSearchParams([...searchParams]);
  }

  const caloriesRangeChangedHandler = (calories: number[]) => {
    searchParams.set('minCalories', calories[0].toString());
    searchParams.set('maxCalories', calories[1].toString());
    setSearchParams([...searchParams]);
  }

  const minCaloriesInputChangeHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    searchParams.set('minCalories', evt.currentTarget.value);
    setSearchParams([...searchParams]);
  }

  const maxCaloriesInputChangeHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    searchParams.set('maxCalories', evt.currentTarget.value);
    setSearchParams([...searchParams]);
  }

  const trainingTypesInputClickHandler = (evt: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const value = evt.currentTarget.value as TrainingTypeEnum;

    if (searchParams.get('trainingType') === null) {
      searchParams.set('trainingType', queryParamsInitialValue.trainingTypes);
    }

    const trainingTypes = (searchParams.get('trainingType') as string).split(',');

    if (trainingTypes.includes(value)) {
      const index = trainingTypes.indexOf(value);
      trainingTypes.splice(index, 1);
      searchParams.set('trainingType', trainingTypes.join(','));
      setSearchParams([...searchParams]);
    }
    else {
      trainingTypes.push(value);
      searchParams.set('trainingType', trainingTypes.join(','));
      setSearchParams([...searchParams]);
    }
  }

  const sortByPriceClickHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    const sortDirection = evt.currentTarget.value as SortEnum;
    searchParams.set('sortDirection', sortDirection);
    setSearchParams([...searchParams]);
  }


  return (
    <div className="wrapper">
      <HeaderComponent />
      <LoaderComponent isHidden={!isTrainingDataLoading}/>
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог тренировок</h1>
              <div className="gym-catalog-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="gym-catalog-form__wrapper">
                  <button className="btn-flat btn-flat--underlined gym-catalog-form__btnback" type="button">
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="gym-catalog-form__title">Фильтры</h3>
                  <form className="gym-catalog-form__form" >
                    <div className="gym-catalog-form__block gym-catalog-form__block--price" style={{ marginBottom: '22px' }}>
                      <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
                      <div className="filter-price" style={{ marginBottom: '1px' }}>
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input type="number" id="text-min" name="text-min"
                            onChange={minPriceInputChangeHandler}
                            value={searchParams.get('minPrice') != null ? Number(searchParams.get('minPrice')) : queryParamsInitialValue.price[0]} />
                          <label htmlFor="text-min">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input type="number" id="text-max" name="text-max"
                            onChange={maxPriceInputChangeHandler}
                            value={searchParams.get('maxPrice') != null ? Number(searchParams.get('maxPrice')) : queryParamsInitialValue.price[1]} />
                          <label htmlFor="text-max">до</label>
                        </div>
                      </div>
                      <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        defaultValue={[
                          searchParams.get('minPrice') != null ? Number(searchParams.get('minPrice')) : queryParamsInitialValue.price[0],
                          searchParams.get('maxPrice') != null ? Number(searchParams.get('maxPrice')) : queryParamsInitialValue.price[1]
                        ]}
                        min={0} max={5000}
                        trackClassName="example-track"
                        pearling
                        onAfterChange={priceRangeChangedHandler}
                      />
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--calories">
                      <h4 className="gym-catalog-form__block-title">Калории</h4>
                      <div className="filter-calories">
                        <div className="filter-calories__input-text filter-calories__input-text--min">
                          <input type="number" id="text-min-cal" name="text-min-cal"
                            value={searchParams.get('minCalories') != null ? Number(searchParams.get('minCalories')) : queryParamsInitialValue.calories[0]}
                            onChange={minCaloriesInputChangeHandler}
                          />
                          <label htmlFor="text-min-cal">от</label>
                        </div>
                        <div className="filter-calories__input-text filter-calories__input-text--max">
                          <input type="number" id="text-max-cal" name="text-max-cal"
                            value={searchParams.get('maxCalories') != null ? Number(searchParams.get('maxCalories')) : queryParamsInitialValue.calories[1]}
                            onChange={maxCaloriesInputChangeHandler}
                          />
                          <label htmlFor="text-max-cal">до</label>
                        </div>
                      </div>
                      <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        defaultValue={[
                          searchParams.get('minCalories') != null ? Number(searchParams.get('minCalories')) : queryParamsInitialValue.calories[0],
                          searchParams.get('maxCalories') != null ? Number(searchParams.get('maxCalories')) : queryParamsInitialValue.calories[1]
                        ]}
                        min={0} max={5000}
                        trackClassName="example-track"
                        pearling
                        onAfterChange={caloriesRangeChangedHandler}
                      />
                    </div>

                    <div className="gym-catalog-form__block gym-catalog-form__block--rating">
                      <h4 className="gym-catalog-form__block-title" style={{ marginBottom: '1px' }}>Рейтинг</h4>
                      <div className="filter-raiting">
                        <ReactSlider
                          className="horizontal-slider"
                          thumbClassName="example-thumb"
                          defaultValue={[
                            searchParams.get('minRate') != null ? Number(searchParams.get('minRate')) : queryParamsInitialValue.rating[0],
                            searchParams.get('maxRate') != null ? Number(searchParams.get('maxRate')) : queryParamsInitialValue.rating[1]
                          ]}
                          min={0} max={5}
                          trackClassName="example-track"
                          pearling
                          onAfterChange={rateRangeChangedHandler}
                        />
                        <span style={{ float: 'left' }}>{searchParams.get('minRate') ? searchParams.get('minRate') : queryParamsInitialValue.rating[0]}</span>
                        <span style={{ float: 'right' }}>{searchParams.get('maxRate') ? searchParams.get('maxRate') : queryParamsInitialValue.rating[1]}</span>
                      </div>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--type">
                      <h4 className="gym-catalog-form__block-title">Тип</h4>
                      <ul className="gym-catalog-form__check-list">
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.YOGA} name="type"
                                onClick={trainingTypesInputClickHandler}
                                checked={searchParams.get('trainingType') === null ? true : (searchParams.get('trainingType') as string).includes(TrainingTypeEnum.YOGA)} />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">йога</span>
                            </label>
                          </div>
                        </li>
                        {/* <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="type-1" name="type" checked={queryParams.trainingTypes.includes(TrainingTypeEnum.YOGA)}/><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">силовые</span>
                            </label>
                          </div>
                        </li> */}
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.CROSSFIT} name="type"
                                checked={searchParams.get('trainingType') === null ? true : (searchParams.get('trainingType') as string).includes(TrainingTypeEnum.CROSSFIT)}
                                onClick={trainingTypesInputClickHandler} />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">кроссфит</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.BOX} name="type"
                                checked={searchParams.get('trainingType') === null ? true : (searchParams.get('trainingType') as string).includes(TrainingTypeEnum.BOX)}
                                onClick={trainingTypesInputClickHandler} />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">бокс</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.RUNNING} name="type"
                                checked={searchParams.get('trainingType') === null ? true : (searchParams.get('trainingType') as string).includes(TrainingTypeEnum.RUNNING)}
                                onClick={trainingTypesInputClickHandler} />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">бег</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.AEROBICS} name="type"
                                checked={searchParams.get('trainingType') === null ? true : (searchParams.get('trainingType') as string).includes(TrainingTypeEnum.AEROBICS)}
                                onClick={trainingTypesInputClickHandler} />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">аэробика</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.PILATES} name="type"
                                checked={searchParams.get('trainingType') === null ? true : (searchParams.get('trainingType') as string).includes(TrainingTypeEnum.PILATES)}
                                onClick={trainingTypesInputClickHandler} /><span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">пилатес</span>
                            </label>
                          </div>
                        </li>
                        <li className="gym-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.STRETCHING} name="type"
                                checked={searchParams.get('trainingType') === null ? true : (searchParams.get('trainingType') as string).includes(TrainingTypeEnum.STRETCHING)}
                                onClick={trainingTypesInputClickHandler} />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">стрейчинг</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
                      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
                      <div className="btn-radio-sort gym-catalog-form__radio">
                        <label style={{ width: '50%' }}>
                          <input type="radio" name="sort" value={SortEnum.ASC} checked={searchParams.get('sortDirection') ? searchParams.get('sortDirection') === SortEnum.ASC : true} onChange={sortByPriceClickHandler} />
                          <span className="btn-radio-sort__label">Дешевле</span>
                        </label>
                        <label style={{ width: '50%' }}>
                          <input type="radio" name="sort" value={SortEnum.DESC} checked={searchParams.get('sortDirection') ? searchParams.get('sortDirection') === SortEnum.DESC : false} onChange={sortByPriceClickHandler} />
                          <span className="btn-radio-sort__label" >Дороже</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {trainings.map(training => <TrainingListItemComponent training={training} />)}
                </ul>
                {/* <div className="show-more training-catalog__show-more">
                  <button className="btn show-more__button show-more__button--more" type="button">Показать еще</button>
                  <button className="btn show-more__button show-more__button--to-top" type="button">Вернуться в
                    начало
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
