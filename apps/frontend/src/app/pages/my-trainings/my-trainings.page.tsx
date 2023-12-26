import { useEffect, useRef, useState } from 'react';
import { HeaderComponent } from '../../components/header/header.component';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getTrainingsByTrainerIdDataThunk, getTrainingsDataThunk } from '../../store/slices/application.thunk';
import { useSearchParams } from 'react-router-dom';
import { TrainingListItemComponent } from '../../components/training-list-item/training-list-item.component';
import ReactSlider from "react-slider";
import { TrainingTypeEnum } from '../../types/training-type.enum';
import { LoaderComponent } from '../../components/loader/loader.component';
import { TrainingDurationEnum } from '../../types/training-duration.enum';
import { TrainingDTO } from '../../dto/training.dto';

const TRAININGS_PER_PAGE = '6';

const queryParamsInitialValue = {
  priceRange: [100, 5000],
  rating: [0, 5],
  price: [0, 10000],
  calories: [0, 5000],
  trainingDuration: [
    TrainingDurationEnum.TEN_THIRTY,
    TrainingDurationEnum.THIRTY_FIFTY,
    TrainingDurationEnum.FIFTY_EIGHTY,
    TrainingDurationEnum.EIGHTY_HUNDRED,
  ].join(','),
  trainingsPerPage: TRAININGS_PER_PAGE,
}

export function MyTrainingsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const isTrainingDataLoading = useAppSelector(state => state.application.isTrainingDataLoading);
  const trainings: any[] = useAppSelector(state => state.application.actualTrainingsData);
  const trainingsCount: number = useAppSelector(state => state.application.actualTrainingsDataCount);
  const [searchParams, setSearchParams] = useSearchParams();
  const priceSliderRef = useRef<any>();
  const caloriesSliderRef = useRef<any>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);


  useEffect(() => {
    searchParams.set('trainingDuration', queryParamsInitialValue.trainingDuration);
  }, []);

  useEffect(() => {
    dispatch(getTrainingsByTrainerIdDataThunk(`?trainingsPerPage=${TRAININGS_PER_PAGE}&pageNumber=${currentPageNumber}&${searchParams.toString()}`));
  }, [searchParams]);

  const priceRangeChangedHandler = (price: number[]) => {
    searchParams.set('minPrice', price[0].toString());
    searchParams.set('maxPrice', price[1].toString());
    setSearchParams([...searchParams]);
  }

  const minPriceInputChangeHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    priceSliderRef.current.state.value[0] = Number(evt.currentTarget.value);
    searchParams.set('minPrice', evt.currentTarget.value);
    setSearchParams([...searchParams]);
  }

  const maxPriceInputChangeHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    priceSliderRef.current.state.value[1] = Number(evt.currentTarget.value);
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
    caloriesSliderRef.current.state.value[0] = Number(evt.currentTarget.value);
    searchParams.set('minCalories', evt.currentTarget.value);
    setSearchParams([...searchParams]);
  }

  const maxCaloriesInputChangeHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    caloriesSliderRef.current.state.value[1] = Number(evt.currentTarget.value);
    searchParams.set('maxCalories', evt.currentTarget.value);
    setSearchParams([...searchParams]);
  }

  const trainingDurationChangeClickHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value as TrainingTypeEnum;

    const trainingDuration = (searchParams.get('trainingDuration') as string).split(',');

    if (trainingDuration.includes(value)) {
      const index = trainingDuration.indexOf(value);
      trainingDuration.splice(index, 1);
      searchParams.set('trainingDuration', trainingDuration.join(','));
      setSearchParams([...searchParams]);
    }
    else {
      trainingDuration.push(value);
      searchParams.set('trainingDuration', trainingDuration.join(','));
      setSearchParams([...searchParams]);
    }
  }

  const showMoreButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(getTrainingsByTrainerIdDataThunk(`?trainingsPerPage=${TRAININGS_PER_PAGE}&pageNumber=${currentPageNumber + 1}&${searchParams.toString()}`));
    setCurrentPageNumber(currentPageNumber + 1);
  }


  return (
    <div className="wrapper">
      <HeaderComponent />
      <LoaderComponent isHidden={!isTrainingDataLoading} />
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
                    </svg>
                    <span>Назад</span>
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
                        ref={priceSliderRef}
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
                        ref={caloriesSliderRef}
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
                    <div className="my-training-form__block my-training-form__block--duration">
                      <h4 className="my-training-form__block-title">Длительность</h4>
                      <ul className="my-training-form__check-list">
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingDurationEnum.TEN_THIRTY} name="duration" defaultChecked={true}
                                onChange={trainingDurationChangeClickHandler} />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">10 мин - 30 мин</span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingDurationEnum.THIRTY_FIFTY} name="duration" defaultChecked={true}
                                onChange={trainingDurationChangeClickHandler} />
                              <span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">30 мин - 50 мин</span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingDurationEnum.FIFTY_EIGHTY} name="duration" defaultChecked={true}
                                onChange={trainingDurationChangeClickHandler} />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">50 мин - 80 мин</span>
                            </label>
                          </div>
                        </li>
                        <li className="my-training-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingDurationEnum.EIGHTY_HUNDRED} name="duration" defaultChecked={true}
                                onChange={trainingDurationChangeClickHandler} />
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
              <div className="training-catalog">
                <ul className="training-catalog__list">
                  {trainings.map(training => <TrainingListItemComponent key={training.id} training={training} />)}
                </ul>
                <div className="show-more training-catalog__show-more">
                {
                  trainings && ((trainings as TrainingDTO[]).length < trainingsCount) &&
                  <button className="btn show-more__button show-more__button--more"
                    onClick={showMoreButtonClick} type="button">Показать еще</button>
                }
              </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
