import { useEffect, useState } from 'react';
import { HeaderComponent } from '../../components/header/header.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { PersonDTO } from '../../dto/person.dto';
import { UsersListItemComponent } from '../../components/users-list-item/users-list-item.component';
import { Link, useSearchParams } from 'react-router-dom';
import { TrainingTypeEnum } from '../../types/training-type.enum';
import { UUID } from '../../types/uuid.type';
import { TrainingLevelEnum } from '../../types/training-level.enum';
import { UserRoleEnum } from '../../types/user-role.enum';
import { AppRoutes } from '../../constants/app-routes.constants';
import { UserDTO } from '../../dto/user.dto';
import { AuthorizationHeader, AxiosFactory } from '../../services/axios';

const DEFAULT_TRAINING_LEVEL = TrainingLevelEnum.AMATEUR;
const DEFAULT_SORT_BY_ROLE_VALUE = UserRoleEnum.TRAINER;

export function UsersCatalogPage(): JSX.Element {
  const [users, setUsers] = useState<PersonDTO[]>([]);
  const [isUsersDataLoaded, setIsUsersDataLoaded] = useState<boolean>(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [trainingTypes, setTrainingTypes] = useState<string[]>([]);
  const [trainingLevel, setTrainingLevel] = useState<string>(DEFAULT_TRAINING_LEVEL);
  const [sortPriority, setSortPriority] = useState<string>(DEFAULT_SORT_BY_ROLE_VALUE);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [actualQueryString, setActualQueryString] = useState<string>(`trainingLevel=${DEFAULT_TRAINING_LEVEL}&sortPriority=${DEFAULT_SORT_BY_ROLE_VALUE}`);
  const [usersCount, setUsersCount] = useState<number | undefined>(undefined);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  useEffect(() => {
    getUsersData(actualQueryString, 1);
  }, []);

  useEffect(() => {
    updateSearchParams();
  }, [trainingLevel, sortPriority]);

  useEffect(() => {
    setCurrentPageNumber(1);
    getUsersData(actualQueryString, 1);
  }, [actualQueryString]);

  const getUsersData = async (queryString: string, pageNumber: number) => {
    try {
      setIsUsersDataLoaded(false);

      const response = await AxiosFactory.createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS })
        .get(`/users/usersList?usersPerPage=${3}&pageNumber=${pageNumber}&${queryString}`);

      setUsers(response.data.users);
      setUsersCount(response.data.count);

      setIsUsersDataLoaded(true);
    }
    catch (error) {
      setIsUsersDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const locationInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    const newActualLocations = locations;
    if (newActualLocations.includes(value)) {
      const index = newActualLocations.indexOf(value);
      newActualLocations.splice(index, 1);
    }
    else {
      newActualLocations.push(value);
    }
    setLocations([...newActualLocations]);
    updateSearchParams();
  }

  const trainingTypeInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    const newActualTrainingTypes = trainingTypes;
    if (newActualTrainingTypes.includes(value)) {
      const index = newActualTrainingTypes.indexOf(value);
      newActualTrainingTypes.splice(index, 1);
    }
    else {
      newActualTrainingTypes.push(value);
    }
    setTrainingTypes([...newActualTrainingTypes]);
    updateSearchParams();
  }

  const trainingLevelInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setTrainingLevel(value);
  }

  const sortByRoleInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    console.log(value);
    setSortPriority(value);
  }

  const updateSearchParams = () => {
    clearSearchParams();

    locations.forEach((item, index) => {
      searchParams.set(`locations[${index}]`, item);
    })
    trainingTypes.forEach((item, index) => {
      searchParams.set(`trainingType[${index}]`, item);
    })
    searchParams.set('trainingLevel', trainingLevel);
    searchParams.set('sortPriority', sortPriority);

    setSearchParams(searchParams);
    let queryString = searchParams.toString().replace(new RegExp('%5B', 'g'), '[');
    queryString = queryString.replace(new RegExp('%5D', 'g'), ']');
    setActualQueryString(queryString);
  }

  const clearSearchParams = () => {
    const trainingTypeArray = Object.values(TrainingTypeEnum);
    trainingTypeArray.forEach((item, index) => {
      searchParams.delete(`trainingType[${index}]`);
    });

    const locationsArray = Object.values(TrainingTypeEnum);
    locationsArray.forEach((item, index) => {
      searchParams.delete(`locations[${index}]`);
    })
  }

  const showMoreButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCurrentPageNumber(currentPageNumber + 1)
    getUsersData(actualQueryString, currentPageNumber + 1);
  }

  return (
    <div className="wrapper">
      <LoaderComponent isHidden={isUsersDataLoaded} />
      <HeaderComponent />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <div className="user-catalog-form">
                <h2 className="visually-hidden">Каталог пользователя</h2>
                <div className="user-catalog-form__wrapper">
                  <Link className="btn-flat btn-flat--underlined user-catalog-form__btnback" to={AppRoutes.INDEX}>
                    <svg width="14" height="10" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>Назад</span>
                  </Link>
                  <h3 className="user-catalog-form__title">Фильтры</h3>
                  <form className="user-catalog-form__form">
                    <div className="user-catalog-form__block user-catalog-form__block--location">
                      <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
                      <ul className="user-catalog-form__check-list">
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="Petrogradskaya" name="location" onChange={locationInputChangeHandler} />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.99647 7L10 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              </span>
                              <span className="custom-toggle__label">Петроградская</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="Pionerskaya" name="user-agreement" onChange={locationInputChangeHandler} />
                              <span className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.99647 7L10 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              </span>
                              <span className="custom-toggle__label">Пионерская</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="Udelnaya" name="user-agreement" onChange={locationInputChangeHandler} /><span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.99647 7L10 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              </span>
                              <span className="custom-toggle__label">Удельная</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="Zvyozdnaya" name="user-agreement" onChange={locationInputChangeHandler} /><span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.99647 7L10 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              </span>
                              <span className="custom-toggle__label">Звёздная</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value="Sportivnaya" name="user-agreement" onChange={locationInputChangeHandler} /><span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.99647 7L10 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              </span>
                              <span className="custom-toggle__label">Спортивная</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--spezialization">
                      <h4 className="user-catalog-form__block-title">Специализация</h4>
                      <ul className="user-catalog-form__check-list">
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.AEROBICS} name="trainingType" onChange={trainingTypeInputChangeHandler} /><span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">Аэробика</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.RUNNING} name="trainingType" onChange={trainingTypeInputChangeHandler} /><span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">Бег</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.BOX} name="trainingType" onChange={trainingTypeInputChangeHandler} /><span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg></span><span className="custom-toggle__label">Бокс</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.YOGA} name="trainingType" onChange={trainingTypeInputChangeHandler} /><span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Йога</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.CROSSFIT} name="trainingType" onChange={trainingTypeInputChangeHandler} /><span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Кроссфит</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.STRETCHING} name="trainingType" onChange={trainingTypeInputChangeHandler} /><span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Стрэтчинг</span>
                            </label>
                          </div>
                        </li>
                        <li className="user-catalog-form__check-list-item">
                          <div className="custom-toggle custom-toggle--checkbox">
                            <label>
                              <input type="checkbox" value={TrainingTypeEnum.PILATES} name="trainingType" onChange={trainingTypeInputChangeHandler} /><span
                                className="custom-toggle__icon">
                                <svg width="9" height="6" aria-hidden="true">
                                  <use xlinkHref="#arrow-check"></use>
                                </svg>
                              </span>
                              <span className="custom-toggle__label">Пилатес</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--level">
                      <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
                      <div className="custom-toggle-radio">
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="user-agreement" value={TrainingLevelEnum.BEGINNER}
                              onChange={trainingLevelInputChangeHandler} defaultChecked={DEFAULT_TRAINING_LEVEL as string === TrainingLevelEnum.BEGINNER} />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">Новичок</span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="user-agreement" value={TrainingLevelEnum.AMATEUR}
                              onChange={trainingLevelInputChangeHandler} defaultChecked={DEFAULT_TRAINING_LEVEL as string === TrainingLevelEnum.AMATEUR} />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">Любитель</span>
                          </label>
                        </div>
                        <div className="custom-toggle-radio__block">
                          <label>
                            <input type="radio" name="user-agreement" value={TrainingLevelEnum.PROFESSIONAL}
                              onChange={trainingLevelInputChangeHandler} defaultChecked={DEFAULT_TRAINING_LEVEL as string === TrainingLevelEnum.PROFESSIONAL} />
                            <span className="custom-toggle-radio__icon"></span>
                            <span className="custom-toggle-radio__label">Профессионал</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="user-catalog-form__block">
                      <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
                      <div className="btn-radio-sort">
                        <label>
                          <input type="radio" name="sort" value={UserRoleEnum.TRAINER} onChange={sortByRoleInputChangeHandler}
                            defaultChecked={DEFAULT_SORT_BY_ROLE_VALUE as string === UserRoleEnum.TRAINER} />
                          <span className="btn-radio-sort__label">Тренеры</span>
                        </label>
                        <label>
                          <input type="radio" name="sort" value={UserRoleEnum.USER} onChange={sortByRoleInputChangeHandler}
                            defaultChecked={DEFAULT_SORT_BY_ROLE_VALUE as string === UserRoleEnum.USER} />
                          <span className="btn-radio-sort__label">Пользователи</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="users-catalog">
                  <ul className="users-catalog__list">
                    {users.map((user) => <UsersListItemComponent id={user.id as UUID} name={user.name as string}
                      role={user.role as string} avatarFileName={user.avatarFileName as string} trainingType={user.trainingType as string[]} location={user.location as string} />)}
                  </ul>
                  <div className="show-more users-catalog__show-more">
                    {
                      users && usersCount && ((users as UserDTO[]).length < usersCount) &&
                      <button className="btn show-more__button show-more__button--more"
                        onClick={showMoreButtonClick} type="button">Показать еще</button>
                    }
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
