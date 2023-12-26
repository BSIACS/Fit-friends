import { Link } from 'react-router-dom';
import { HeaderComponent } from '../../components/header/header.component'
import { SpecialForYouComponent } from './components/special-for-you/special-for-you.component';
import { AppRoutes } from '../../constants/app-routes.constants';
import { useEffect, useRef, useState } from 'react';
import { PersonDTO } from '../../dto/person.dto';
import { requestWithAccessTokenInterceptor } from '../../services/interceptors';
import axios from 'axios';
import { BadRequestPage } from '../bad-request/bad-request.page';
import { useAppSelector } from '../../hooks/useAppSelector';
import { UserRoleEnum } from '../../types/user-role.enum';
import { LookingForCompanyListItemComponent } from '../../components/looking-for-company-list-item/looking-for-company-list-item.component';
import Slider, { Settings } from "react-slick";
import { TrainingDTO } from '../../dto/training.dto';
import { LoaderComponent } from '../../components/loader/loader.component';
import { UserCardTrainingListItemComponent } from '../../components/user-card-training-list-item/user-card-training-list-item.component';


export function IndexPage(): JSX.Element {
  const authoriztionData = useAppSelector(state => state.authorization.authoriztionData);
  const isAuthoriztionDataLoading = useAppSelector(state => state.authorization.isLoading);
  const [users, setUsers] = useState<PersonDTO[]>([]);
  const [trainings, setTrainings] = useState<TrainingDTO[]>();

  const [isTrainingsDataLoaded, setIsTrainingsDataLoaded] = useState<boolean>(false);
  const [isUsersDataLoaded, setIsUsersDataLoaded] = useState<boolean>(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);

  const specialOffersSliderRef = useRef<any>();
  const popularTrainingsSliderRef = useRef<any>();
  const lokkingForCompanySliderRef = useRef<any>();


  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    arrows: false,
    draggable: false,
  };

  const singleSliderSettings: Settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnFocus: true,
    autoplay: true,
    draggable: false,
    autoplaySpeed: 5000,
  };

  useEffect(() => {
    if (authoriztionData) {
      getUsersData('isReadyForTraining=true&limit=8');
      getTrainingData();
    }
  }, [authoriztionData]);

  const getUsersData = async (queryString: string) => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      setIsUsersDataLoaded(false);
      const response = await axiosInstance.get<PersonDTO[]>(`http://localhost:3042/api/users/usersList?${queryString}`);

      setUsers(response.data.filter((user) => user.role === UserRoleEnum.USER && user.isReadyForTraining === true));
      setIsUsersDataLoaded(true);
    }
    catch (error) {
      setIsUsersDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const getTrainingData = async () => {
    const axiosInstance = axios.create();
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
    try {
      const response = await axiosInstance.get<{ count: number, trainings: TrainingDTO[] }>(`http://localhost:3042/api/trainings/catalogue?trainingsPerPage=${50}&pageNumber=${1}`);
      console.log(response.data);

      const sortedTrainings = response.data.trainings.sort((item_1, item_2) => Number(item_2.rating) - Number(item_1.rating));
      setTrainings(sortedTrainings);
      setIsTrainingsDataLoaded(true);
    }
    catch (error) {
      setIsTrainingsDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const popularTrainingsLeftArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    popularTrainingsSliderRef.current.slickPrev();
  }

  const popularTrainingsRightArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    popularTrainingsSliderRef.current.slickNext();
  }

  const lookingForCompanyLeftArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    lokkingForCompanySliderRef.current.slickPrev();
  }

  const lookingForCompanyRightArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    lokkingForCompanySliderRef.current.slickNext();
  }

  const singleSliderButton_1_ClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    specialOffersSliderRef.current.slickGoTo(0);
    console.log(popularTrainingsSliderRef.current);

  }

  const singleSliderButton_2_ClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    specialOffersSliderRef.current.slickGoTo(1);
  }

  const singleSliderButton_3_ClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    specialOffersSliderRef.current.slickGoTo(2);
  }

  if (isRequestError) {
    return <BadRequestPage />;
  }

  return (
    <div className="wrapper">
      <HeaderComponent />
      <LoaderComponent isHidden={!isAuthoriztionDataLoading && isUsersDataLoaded && isTrainingsDataLoaded} />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <SpecialForYouComponent />
        <section className="special-offers">
          <div className="container">
            <div className="special-offers__wrapper">
              <h2 className="visually-hidden">Специальные предложения</h2>
              <ul className="special-offers__list">
                {
                  <Slider ref={specialOffersSliderRef} {...singleSliderSettings}>

                    <li id='1' className="special-offers__item is-active">
                      <aside className="promo-slider">
                        <div className="promo-slider__overlay"></div>
                        <div className="promo-slider__image">
                          <img src="assets/img/content/promo-1.png" srcSet="assets/img/content/promo-1@2x.png 2x" width="1040" height="469" alt="promo-photo" />
                        </div>
                        <div className="promo-slider__header">
                          <h3 className="promo-slider__title">Fitball</h3>
                          <div className="promo-slider__logo">
                            <svg width="74" height="74" aria-hidden="true">
                              <use xlinkHref="#logotype"></use>
                            </svg>
                          </div>
                        </div><span className="promo-slider__text">Горячие предложения на тренировки на фитболе</span>
                        <div className="promo-slider__bottom-container">
                          <div className="promo-slider__slider-dots">
                            <button className="promo-slider__slider-dot--active promo-slider__slider-dot"
                              aria-label="первый слайд"
                              onClick={singleSliderButton_1_ClickHandler}></button>
                            <button className="promo-slider__slider-dot" aria-label="второй слайд"
                              onClick={singleSliderButton_2_ClickHandler}
                            ></button>
                            <button className="promo-slider__slider-dot" aria-label="третий слайд"
                              onClick={singleSliderButton_3_ClickHandler}></button>
                          </div>
                          <div className="promo-slider__price-container">
                            <p className="promo-slider__price">1600 ₽</p>
                            <p className="promo-slider__sup">за занятие</p>
                            <p className="promo-slider__old-price">2000 ₽</p>
                          </div>
                        </div>
                      </aside>
                    </li>
                    <li id='2' className="special-offers__item">
                      <aside className="promo-slider">
                        <div className="promo-slider__overlay"></div>
                        <div className="promo-slider__image">
                          <img src="assets/img/content/promo-2.png" srcSet="assets/img/content/promo-2@2x.png 2x" width="1040" height="469" alt="promo-photo" />
                        </div>
                        <div className="promo-slider__header">
                          <h3 className="promo-slider__title">Fleksbend</h3>
                          <div className="promo-slider__logo">
                            <svg width="74" height="74" aria-hidden="true">
                              <use xlinkHref="#logotype"></use>
                            </svg>
                          </div>
                        </div><span className="promo-slider__text">Горячие предложения на&nbsp;Тренировки с&nbsp;резинкой для
                          фитнеса</span>
                        <div className="promo-slider__bottom-container">
                          <div className="promo-slider__slider-dots">
                            <button className="promo-slider__slider-dot" aria-label="первый слайд"
                              onClick={singleSliderButton_1_ClickHandler}></button>
                            <button className="promo-slider__slider-dot--active promo-slider__slider-dot" aria-label="второй слайд"
                              onClick={singleSliderButton_2_ClickHandler}></button>
                            <button className="promo-slider__slider-dot" aria-label="третий слайд"
                              onClick={singleSliderButton_3_ClickHandler}></button>
                          </div>
                          <div className="promo-slider__price-container">
                            <p className="promo-slider__price">2400 ₽</p>
                            <p className="promo-slider__sup">за занятие</p>
                            <p className="promo-slider__old-price">2800 ₽</p>
                          </div>
                        </div>
                      </aside>
                    </li>
                    <li id='3' className="special-offers__item">
                      <aside className="promo-slider">
                        <div className="promo-slider__overlay"></div>
                        <div className="promo-slider__image">
                          <img src="assets/img/content/promo-3.png" srcSet="assets/img/content/promo-3@2x.png 2x" width="1040" height="469" alt="promo-photo" />
                        </div>
                        <div className="promo-slider__header">
                          <h3 className="promo-slider__title">Full Body Stretch</h3>
                          <div className="promo-slider__logo">
                            <svg width="74" height="74" aria-hidden="true">
                              <use xlinkHref="#logotype"></use>
                            </svg>
                          </div>
                        </div><span className="promo-slider__text">Горячие предложения на&nbsp;Комплекс упражнений
                          на&nbsp;растяжку всего тела для новичков</span>
                        <div className="promo-slider__bottom-container">
                          <div className="promo-slider__slider-dots">
                            <button className="promo-slider__slider-dot" aria-label="первый слайд"
                              onClick={singleSliderButton_1_ClickHandler}></button>
                            <button className="promo-slider__slider-dot" aria-label="второй слайд"
                              onClick={singleSliderButton_2_ClickHandler}></button>
                            <button className="promo-slider__slider-dot--active promo-slider__slider-dot" aria-label="третий слайд"
                              onClick={singleSliderButton_3_ClickHandler}></button>
                          </div>
                          <div className="promo-slider__price-container">
                            <p className="promo-slider__price">1800 ₽</p>
                            <p className="promo-slider__sup">за занятие</p>
                            <p className="promo-slider__old-price">2200 ₽</p>
                          </div>
                        </div>
                      </aside>
                    </li>

                  </Slider>
                }
              </ul>
              <div className="thumbnail-spec-gym">
                <div className="thumbnail-spec-gym__image">
                  <picture>
                    <source type="image/webp" srcSet="assets/img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                    <img src="assets/img/content/thumbnails/nearest-gym-01.jpg" srcSet="assets/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                  </picture>
                </div>
                <p className="thumbnail-spec-gym__type">Ближайший зал</p>
                <div className="thumbnail-spec-gym__header" style={{ alignItems: 'center' }}>
                  <h3 className="thumbnail-spec-gym__title">Скоро здесь появится что - то полезное</h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="popular-trainings">
          <div className="container">
            <div className="popular-trainings__wrapper">
              <div className="popular-trainings__title-wrapper">
                <h2 className="popular-trainings__title">Популярные тренировки</h2>
                <Link to={AppRoutes.TRAINING_CATALOG} className="btn-flat popular-trainings__button" type="button"><span>Смотреть все</span>
                  <svg width="14" height="10" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0012 1L15 6L10.0012 11M1 6H14.86" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
                <div className="popular-trainings__controls">
                  <button className="btn-icon popular-trainings__control" type="button" aria-label="previous"
                    onClick={popularTrainingsLeftArrowButtonClickHandler}>
                    <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button className="btn-icon popular-trainings__control" type="button" aria-label="next"
                    onClick={popularTrainingsRightArrowButtonClickHandler}>
                    <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0012 1L15 6L10.0012 11M1 6H14.86" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
              <ul className="popular-trainings__list">
                {
                  trainings &&
                  <Slider ref={popularTrainingsSliderRef} {...settings}>
                    {
                      trainings.map((item) =>
                        <UserCardTrainingListItemComponent key={item.id} training={item} />)
                    }
                  </Slider>}
              </ul>
            </div>
          </div>
        </section>
        <section className="look-for-company">
          <div className="container">
            <div className="look-for-company__wrapper">
              <div className="look-for-company__title-wrapper">
                <h2 className="look-for-company__title">Ищут компанию для тренировки</h2>
                <Link to={AppRoutes.USERS_CATALOG} className="btn-flat btn-flat--light look-for-company__button" type="button"><span>Смотреть все</span>
                  <svg width="14" height="10" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0012 1L15 6L10.0012 11M1 6H14.86" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
                <div className="look-for-company__controls">
                  <button className="btn-icon btn-icon--outlined look-for-company__control" type="button"
                    aria-label="previous" onClick={lookingForCompanyLeftArrowButtonClickHandler}>
                    <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button className="btn-icon btn-icon--outlined look-for-company__control" type="button"
                    aria-label="next" onClick={lookingForCompanyRightArrowButtonClickHandler}>
                    <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0012 1L15 6L10.0012 11M1 6H14.86" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
              <ul className="look-for-company__list">
                {
                  <Slider ref={lokkingForCompanySliderRef} {...settings}>
                    {
                      users.map((user) =>
                        <LookingForCompanyListItemComponent key={user.id} user={user} />
                      )
                    }
                  </Slider>
                }
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
