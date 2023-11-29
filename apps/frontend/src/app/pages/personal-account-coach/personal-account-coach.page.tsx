import { useEffect, useState } from 'react';
import { HeaderComponent } from '../../components/header/header.component'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getTrainerDetailThunk, updateTrainerDataThunk } from '../../store/slices/application.thunk';
import { changeEditTrainerFormData, setIsBadRequest, setIsLoading } from '../../store/slices/application.slice';
import { Navigate } from 'react-router-dom';
import { BadRequestPage } from '../bad-request/bad-request.page';


export function PersonalAccountCoachPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const trainer = useAppSelector(state => state.application.editTrainerFormData);
  const isBadRequest = useAppSelector(state => state.application.isBadRequest);
  const isPersonalAccountCoachPageDataLoading = useAppSelector(state => state.application.isPersonalAccountCoachPageDataLoading);
  const [isUserInfoEditable, setIsUserInfoEditable] = useState<boolean>(false);


  console.log(trainer);


  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(getTrainerDetailThunk());
  }, []);


  const userInfoEditSubmitHandler = (evt: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    formData.set('id', trainer.id as string);
    formData.set('isReadyForTraining', (trainer.isReadyForTraining as boolean) ? 'true' : 'false');
    console.log(formData.getAll('trainingType'));

    dispatch(updateTrainerDataThunk({ formData: formData }));
    setIsUserInfoEditable(false);
  }

  const nameInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeEditTrainerFormData({ ...trainer, name: evt.currentTarget.value }));
  }

  const descriptionInputChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(changeEditTrainerFormData({ ...trainer, description: evt.currentTarget.value }));
  }

  const editButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setIsUserInfoEditable(true);
  }

  const isReadyForTrainingChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.currentTarget.checked);
    dispatch(changeEditTrainerFormData({ ...trainer, isReadyForTraining: !trainer.isReadyForTraining }));
  }

  const trainingTypeInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    const trainingType = [...trainer.trainingType as string[]];

    dispatch(changeEditTrainerFormData({...trainer, trainingType: []}));

    if (trainingType.includes(value)) {
      const index = trainingType.indexOf(value);
      trainingType.splice(index, 1);
      dispatch(changeEditTrainerFormData({...trainer, trainingType: trainingType}));
    }
    else {
      dispatch(changeEditTrainerFormData({...trainer, trainingType: [...trainingType, value]}));
    }
  }

  if(isBadRequest){
    return <Navigate to={'/badRequest'}/>;
  }

  if(isPersonalAccountCoachPageDataLoading){
    return <h1>Loading...</h1>;
  }

  return (
    <div className="wrapper">
      <HeaderComponent />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              <section className="user-info-edit">
                <div className="user-info-edit__header">
                  <div className="input-load-avatar">
                    <label>
                      <input className="visually-hidden" type="file" name="user-photo-1" accept="image/png, image/jpeg" />
                      <span className="input-load-avatar__avatar">
                        <img src="assets/img/content/user-photo-1.png" srcSet="assets/img/content/user-photo-1@2x.png 2x" width="98" height="98" alt="user photo" />
                      </span>
                    </label>
                  </div>
                  <div className="user-info-edit__controls">
                    <button className="user-info-edit__control-btn" aria-label="обновить">
                      <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
                    </button>
                    <button className="user-info-edit__control-btn" aria-label="удалить">
                      <svg width="14" height="16" aria-hidden="true" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.184C12.41 3.92 9.80444 3.784 7.20667 3.784C5.66667 3.784 4.12667 3.864 2.58667 4.024L1 4.184M5.27778 3.376L5.44889 2.328C5.57333 1.568 5.66667 1 6.98111 1H9.01889C10.3333 1 10.4344 1.6 10.5511 2.336L10.7222 3.376M13.3278 6.712L12.8222 14.768C12.7367 16.024 12.6667 17 10.4967 17H5.50333C3.33333 17 3.26333 16.024 3.17778 14.768L2.67222 6.712M6.70111 12.6H9.29111M6.05556 9.4H9.94444" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    </button>
                  </div>
                </div>
                <form className="user-info-edit__form" action="#" method="post" onSubmit={userInfoEditSubmitHandler}>

                  <button className="btn-flat btn-flat--underlined user-info-edit__save-button" style={{ visibility: isUserInfoEditable ? 'hidden' : 'visible' }}
                    aria-label="Редактировать" onClick={editButtonClickHandler}>
                    <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>Редактировать</span>
                  </button>

                  <button className="btn-flat btn-flat--underlined user-info-edit__save-button" type="submit" style={{ visibility: !isUserInfoEditable ? 'hidden' : 'visible' }}
                    aria-label="Сохранить">
                    <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>Сохранить</span>
                  </button>

                  <div className="user-info-edit__section">
                    <h2 className="user-info-edit__title">Обо мне</h2>
                    <div className={isUserInfoEditable ? "custom-input user-info-edit__input" : 'custom-input custom-input--readonly user-info__input'}>
                      <label>
                        <span className="custom-input__label">Имя</span>
                        <span className="custom-input__wrapper">
                          <input type="text" name="name" value={trainer.name} onChange={nameInputChangeHandler} disabled={!isUserInfoEditable} />
                        </span>
                      </label>
                    </div>
                    <div className={isUserInfoEditable ? 'custom-textarea user-info-edit__textarea' : 'custom-textarea custom-textarea--readonly user-info__textarea'}>
                      <label>
                        <span className="custom-textarea__label">Описание</span>
                        <textarea name="description"
                          placeholder="" value={trainer.description} onChange={descriptionInputChangeHandler} disabled={!isUserInfoEditable}></textarea>
                      </label>
                    </div>
                  </div>
                  <div className="user-info-edit__section user-info-edit__section--status">
                    <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
                    <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
                      <label>
                        <input type="checkbox" name="isReadyForTraining" checked={trainer.isReadyForTraining} onChange={isReadyForTrainingChangeHandler} disabled={!isUserInfoEditable}/>
                        <span className="custom-toggle__icon">
                        </span>
                        <span className="custom-toggle__label">Готов тренировать</span>
                      </label>
                    </div>
                  </div>
                  <div className="user-info-edit__section">
                    <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
                    <div className="specialization-checkbox user-info-edit__specialization">
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="trainingType" value="yoga" disabled={!isUserInfoEditable} onChange={trainingTypeInputChangeHandler} checked={(trainer.trainingType as string[]).includes('yoga')} />
                          <span className="btn-checkbox__btn">Йога</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="trainingType" value="running" disabled={!isUserInfoEditable} onChange={trainingTypeInputChangeHandler} checked={(trainer.trainingType as string[]).includes('running')}/><span
                            className="btn-checkbox__btn">Бег</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="trainingType" value="box" disabled={!isUserInfoEditable} onChange={trainingTypeInputChangeHandler} checked={(trainer.trainingType as string[]).includes('boxing')}/><span
                            className="btn-checkbox__btn">Бокс</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="trainingType" value="pilates" disabled={!isUserInfoEditable} onChange={trainingTypeInputChangeHandler} checked={(trainer.trainingType as string[]).includes('pilates')}
                            /><span className="btn-checkbox__btn">Пилатес</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="trainingType" value="stretching" disabled={!isUserInfoEditable} onChange={trainingTypeInputChangeHandler} checked={(trainer.trainingType as string[]).includes('stretching')} />
                          <span className="btn-checkbox__btn">Стрейчинг</span>
                        </label>
                      </div>
                      <div className="btn-checkbox">
                        <label>
                          <input className="visually-hidden" type="checkbox" name="trainingType" value="crossfit" disabled={!isUserInfoEditable} onChange={trainingTypeInputChangeHandler} checked={(trainer.trainingType as string[]).includes('crossfit')}/><span
                            className="btn-checkbox__btn">Кроссфит</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="custom-select user-info-edit__select"><span className="custom-select__label">Локация</span>
                    <div className="custom-select__placeholder">ст. м. Адмиралтейская</div>
                    <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L9.82576 6.5118C9.09659 7.16273 7.90341 7.16273 7.17424 6.5118L1 1" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                    </ul>
                  </div>
                  <div className="custom-select user-info-edit__select"><span className="custom-select__label">Пол</span>
                    <div className="custom-select__placeholder">Женский</div>
                    <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L9.82576 6.5118C9.09659 7.16273 7.90341 7.16273 7.17424 6.5118L1 1" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                    </ul>
                  </div>
                  <div className="custom-select user-info-edit__select"><span className="custom-select__label">Уровень</span>
                    <div className="custom-select__placeholder">Профессионал</div>
                    <button className="custom-select__button" type="button" aria-label="Выберите одну из опций">
                      <span className="custom-select__text"></span>
                      <span className="custom-select__icon">
                        <svg width="15" height="6" aria-hidden="true" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L9.82576 6.5118C9.09659 7.16273 7.90341 7.16273 7.17424 6.5118L1 1" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                      </span>
                    </button>
                    <ul className="custom-select__list" role="listbox">
                    </ul>
                  </div>
                </form>
              </section>
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.1227 12.6442H13.8758V2.20507C13.8758 -0.230712 12.6251 -0.72367 11.0995 1.10317L10 2.42256L0.695297 13.5866C-0.582897 15.1089 -0.0468803 16.3558 1.87728 16.3558H6.12419V26.7949C6.12419 29.2307 7.37489 29.7237 8.90048 27.8968L10 26.5774L19.3047 15.4134C20.5829 13.8911 20.0469 12.6442 18.1227 12.6442Z" fill="#333333" /></svg>
                      </div>
                      <span className="thumbnail-link__text">Мои тренировки</span>
                    </a>
                    <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.2956 0H8.71935C3.25662 0 0 3.255 0 8.715V21.27C0 26.745 3.25662 30 8.71935 30H21.2806C26.7433 30 29.9999 26.745 29.9999 21.285V8.715C30.015 3.255 26.7583 0 21.2956 0ZM21.0105 16.125H16.133V21C16.133 21.615 15.6228 22.125 15.0075 22.125C14.3922 22.125 13.8819 21.615 13.8819 21V16.125H9.00449C8.38918 16.125 7.87893 15.615 7.87893 15C7.87893 14.385 8.38918 13.875 9.00449 13.875H13.8819V9C13.8819 8.385 14.3922 7.875 15.0075 7.875C15.6228 7.875 16.133 8.385 16.133 9V13.875H21.0105C21.6258 13.875 22.136 14.385 22.136 15C22.136 15.615 21.6258 16.125 21.0105 16.125Z" fill="currentColor" /></svg>
                      </div>
                      <span className="thumbnail-link__text">Создать тренировку</span>
                    </a>
                    <a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 10.2951C24.7784 10.2951 26.6254 8.46058 26.6254 6.19756C26.6254 3.93454 24.7784 2.1 22.5 2.1C20.2216 2.1 18.3746 3.93454 18.3746 6.19756C18.3746 8.46058 20.2216 10.2951 22.5 10.2951Z" fill="currentColor" /><path d="M9.64286 10.2439C12.5722 10.2439 14.947 7.95073 14.947 5.12195C14.947 2.29318 12.5722 0 9.64286 0C6.71348 0 4.33876 2.29318 4.33876 5.12195C4.33876 7.95073 6.71348 10.2439 9.64286 10.2439Z" fill="currentColor" /><path d="M9.64286 12.8049C9.52291 12.8049 9.40347 12.8066 9.28457 12.8101C4.13499 12.9606 0 16.3425 0 20.4878C0 20.7746 0.23338 21 0.53041 21H18.7553C19.0523 21 19.2857 20.7746 19.2857 20.4878C19.2857 20.307 19.2778 20.1277 19.2624 19.95C19.2313 19.5927 19.1694 19.2422 19.0789 18.9C18.6759 17.3762 17.7048 16.0183 16.3515 14.973C14.6142 13.6312 12.247 12.8049 9.64286 12.8049Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M17.4923 13.9177C18.8214 12.9394 20.5777 12.3439 22.5 12.3439C26.6337 12.3439 30 15.0975 30 18.4902C30 18.7197 29.8185 18.9 29.5875 18.9H21.394C21.1529 16.8579 19.6704 15.0676 17.4923 13.9177ZM19.2624 19.95C19.2313 19.5927 19.1694 19.2422 19.0789 18.9C18.6759 17.3762 17.7048 16.0183 16.3515 14.973C14.6142 13.6312 12.247 12.8049 9.64286 12.8049C9.52291 12.8049 9.40347 12.8066 9.28457 12.8101C5.17731 13.6013 2.14286 16.2931 2.14286 19.489C2.14286 19.7472 2.37624 19.95 2.67327 19.95H19.2624Z" fill="currentColor" /></svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </a><a className="thumbnail-link thumbnail-link--theme-light" href="#">
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.7034 10.4423C23.7185 9.33242 22.2336 8.6875 20.1754 8.46252V7.32266C20.1754 5.2679 19.3227 3.28813 17.8232 1.90829C16.309 0.498454 14.339 -0.161468 12.2955 0.0335087C8.78186 0.378468 5.82688 3.84306 5.82688 7.59262V8.46252C3.76869 8.6875 2.28385 9.33242 1.29886 10.4423C-0.127173 12.0621 -0.0830689 14.2218 0.0786462 15.7217L1.10774 24.0757C1.41647 27.0004 2.57788 30 8.89947 30H17.1028C23.4244 30 24.5858 27.0004 24.8946 24.0907L25.9237 15.7067C26.0854 14.2218 26.1148 12.0621 24.7034 10.4423ZM12.5013 2.11826C13.9714 1.98328 15.3681 2.44823 16.456 3.45311C17.5292 4.44299 18.1319 5.85283 18.1319 7.32266V8.37253H7.87037V7.59262C7.87037 4.92294 10.0315 2.35824 12.5013 2.11826ZM7.73806 16.7266H7.72336C6.91478 16.7266 6.25322 16.0516 6.25322 15.2267C6.25322 14.4018 6.91478 13.7269 7.72336 13.7269C8.54664 13.7269 9.2082 14.4018 9.2082 15.2267C9.2082 16.0516 8.54664 16.7266 7.73806 16.7266ZM18.029 16.7266H18.0143C17.2057 16.7266 16.5442 16.0516 16.5442 15.2267C16.5442 14.4018 17.2057 13.7269 18.0143 13.7269C18.8376 13.7269 19.4992 14.4018 19.4992 15.2267C19.4992 16.0516 18.8376 16.7266 18.029 16.7266Z" fill="currentColor" /></svg>
                      </div>
                      <span className="thumbnail-link__text">Мои заказы</span>
                    </a>
                    <div className="personal-account-coach__calendar">
                      <div className="thumbnail-spec-gym">
                        <div className="thumbnail-spec-gym__image">
                          <picture>
                            <source type="image/webp" srcSet="assets/img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                            <img src="assets/img/content/thumbnails/nearest-gym-01.jpg" srcSet="assets/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-spec-gym__type">Ближайший зал</p>
                        <div className="thumbnail-spec-gym__header" style={{ alignItems: 'center' }}>
                          <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="personal-account-coach__additional-info">
                    <div className="personal-account-coach__label-wrapper">
                      <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
                      <button className="btn-flat btn-flat--underlined personal-account-coach__button" type="button">
                        <svg width="14" height="14" aria-hidden="true" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21H14C19 21 21 19 21 14V9M17 1V7M17 7L19 5M17 7L15 5M1.67 17.95L6.6 14.64C7.39 14.11 8.53 14.17 9.24 14.78L9.57 15.07C10.35 15.74 11.61 15.74 12.39 15.07L16.55 11.5C17.33 10.83 18.59 10.83 19.37 11.5L21 12.9M10 7C10 8.10457 9.10457 9 8 9C6.89543 9 6 8.10457 6 7C6 5.89543 6.89543 5 8 5C9.10457 5 10 5.89543 10 7Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                        <span>Загрузить</span>
                      </button>
                      <div className="personal-account-coach__controls">
                        <button className="btn-icon personal-account-coach__control" type="button" aria-label="previous">
                          <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                        </button>
                        <button className="btn-icon personal-account-coach__control" type="button" aria-label="next">
                          <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0012 1L15 6L10.0012 11M1 6H14.86" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                        </button>
                      </div>
                    </div>
                    <ul className="personal-account-coach__list">
                      <li className="personal-account-coach__item">
                        <div className="certificate-card certificate-card--edit">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp"
                                srcSet="assets/img/content/certificates-and-diplomas/certificate-1.webp, img/content/certificates-and-diplomas/certificate-1@2x.webp 2x" />
                              <img src="assets/img/content/certificates-and-diplomas/certificate-1.jpg"
                                srcSet="assets/img/content/certificates-and-diplomas/certificate-1@2x.jpg 2x" width="294"
                                height="360" alt="Сертификат - Биомеханика ударов в боксе" />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              <span>Изменить!</span>
                            </button>
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save" type="button">
                              <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              <span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 4.184C12.41 3.92 9.80444 3.784 7.20667 3.784C5.66667 3.784 4.12667 3.864 2.58667 4.024L1 4.184M5.27778 3.376L5.44889 2.328C5.57333 1.568 5.66667 1 6.98111 1H9.01889C10.3333 1 10.4344 1.6 10.5511 2.336L10.7222 3.376M13.3278 6.712L12.8222 14.768C12.7367 16.024 12.6667 17 10.4967 17H5.50333C3.33333 17 3.26333 16.024 3.17778 14.768L2.67222 6.712M6.70111 12.6H9.29111M6.05556 9.4H9.94444" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp"
                                srcSet="assets/img/content/certificates-and-diplomas/certificate-2.webp, img/content/certificates-and-diplomas/certificate-2@2x.webp 2x" />
                              <img src="assets/img/content/certificates-and-diplomas/certificate-2.jpg"
                                srcSet="assets/img/content/certificates-and-diplomas/certificate-2@2x.jpg 2x" width="294"
                                height="360"
                                alt="Сертификат - Организационно-методическая подготовка и проведение групповых и индивидуальных физкультурно-оздоровительных занятий" />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                              type="button">
                              <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              <span>Изменить</span>
                            </button>
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                              type="button">
                              <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              <span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp" srcSet="assets/img/content/certificates-and-diplomas/certificate-3.webp, img/content/certificates-and-diplomas/certificate-3@2x.webp 2x" />
                              <img src="assets/img/content/certificates-and-diplomas/certificate-3.jpg"
                                srcSet="assets/img/content/certificates-and-diplomas/certificate-3@2x.jpg 2x" width="294"
                                height="360" alt="Сертифиционный курс по кроссфиту 2-го уровня" />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                              type="button">
                              <svg width="14" height="14" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              <span>Изменить</span>
                            </button>
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                              type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp"
                                srcSet="assets/img/content/certificates-and-diplomas/certificate-4.webp, img/content/certificates-and-diplomas/certificate-4@2x.webp 2x" />
                              <img src="assets/img/content/certificates-and-diplomas/certificate-4.jpg"
                                srcSet="assets/img/content/certificates-and-diplomas/certificate-4@2x.jpg 2x" width="294"
                                height="360" alt="Сертификат инструкторов йоги" />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit" type="button">
                              <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              <span>Изменить</span>
                            </button>
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                              type="button">
                              <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              <span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp"
                                srcSet="assets/img/content/certificates-and-diplomas/certificate-5.webp, img/content/certificates-and-diplomas/certificate-5@2x.webp 2x" />
                              <img src="assets/img/content/certificates-and-diplomas/certificate-5.jpg"
                                srcSet="assets/img/content/certificates-and-diplomas/certificate-5@2x.jpg 2x" width="294"
                                height="360" alt="Сертификат фитне аэробики" />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                              type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                              type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>
                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="personal-account-coach__item">
                        <div className="certificate-card">
                          <div className="certificate-card__image">
                            <picture>
                              <source type="image/webp"
                                srcSet="assets/img/content/certificates-and-diplomas/certificate-6.webp, img/content/certificates-and-diplomas/certificate-6@2x.webp 2x" />
                              <img src="assets/img/content/certificates-and-diplomas/certificate-6.jpg"
                                srcSet="assets/img/content/certificates-and-diplomas/certificate-6@2x.jpg 2x" width="294"
                                height="360" alt="Сертификат фитне аэробики" />
                            </picture>
                          </div>
                          <div className="certificate-card__buttons">
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--edit"
                              type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Изменить</span>
                            </button>
                            <button
                              className="btn-flat btn-flat--underlined certificate-card__button certificate-card__button--save"
                              type="button">
                              <svg width="12" height="12" aria-hidden="true">
                                <use xlinkHref="#icon-edit"></use>
                              </svg><span>Сохранить</span>
                            </button>
                            <div className="certificate-card__controls">
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="16" height="16" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 9C17 13.416 13.416 17 9 17C4.584 17 1.888 12.552 1.888 12.552M1.888 12.552H5.504M1.888 12.552V16.552M1 9C1 4.584 4.552 1 9 1C14.336 1 17 5.448 17 5.448M17 5.448V1.448M17 5.448H13.448" stroke="currentColor" /></svg>

                              </button>
                              <button className="btn-icon certificate-card__control" type="button" aria-label="next">
                                <svg width="14" height="16" aria-hidden="true">
                                  <use xlinkHref="#icon-trash"></use>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div >
  );
}
