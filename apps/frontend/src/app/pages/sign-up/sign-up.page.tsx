import styles from './sign-up.page.module.css';
import { useRef, useState } from 'react';
import { QuestionnaireCoachPage } from '../questionnaire-coach/questionnaire-coach.page';
import { QuestionnaireUserPage } from '../questionnaire-user/questionnaire-user.page';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { registerTrainerThunk, registerUserThunk } from '../../store/slices/authorization.thunk';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setIsRegistrationComplete } from '../../store/slices/authorization.slice';
import { Navigate } from 'react-router-dom';
import { getLocation } from '../../utils/view-transform';
import { LocationEnum } from '../../types/location.enum';
import { AppRoutes } from '../../constants/app-routes.constants';

interface SignUpPageState {
  name: string;
  email: string;
  birthDate: string;
  location: LocationEnum;
  password: string;
  sex: string;
  role: string;
  isAgree: boolean;
}

const signUpPageInitialState: SignUpPageState = {
  name: '',
  email: '',
  birthDate: '',
  location: LocationEnum.PETROGRADSKAYA,
  password: '',
  sex: 'not_stated',
  role: 'user',
  isAgree: false,
}

export function SignUpPage(): JSX.Element {
  const [state, setState] = useState<SignUpPageState>(signUpPageInitialState);
  const [isLocationListVissible, setIsLocationListVissible] = useState<boolean>(false);
  const [isAvataImageVissible, setIsAvataImageVissible] = useState<boolean>(false);
  const [nameError, setNameError] = useState({ isError: false, message: '' });
  const [emailError, setEmailError] = useState({ isError: false, message: '' });
  const [passwordError, setPasswordError] = useState({ isError: false, message: '' });
  const [birthDateError, setBirthDateError] = useState({ isError: false, message: '' });

  const dispatch = useAppDispatch();

  const isRegistrationComplete = useAppSelector((state) => state.authorization.isRegistrationComplete);
  const authoriztionData = useAppSelector((state) => state.authorization.authoriztionData);

  const avatarImgElement: React.MutableRefObject<any> = useRef(null);

  const loadAvatarInputChangeHandler = (evt: React.ChangeEvent<any>) => {
    if (evt.target.files[0]) {
      avatarImgElement.current.src = URL.createObjectURL(evt.target.files[0]);
      avatarImgElement.current.hidden = false;
      setIsAvataImageVissible(true);
    }
  }

  const formSubmitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    formData.set('location', state.location);

    !formData.get('name') ? setNameError({ isError: true, message: 'Поле обязательно для заполнения' }) : setNameError({ isError: false, message: '' });
    !formData.get('email') ? setEmailError({ isError: true, message: 'Поле обязательно для заполнения' }) : setEmailError({ isError: false, message: '' });
    !formData.get('password') ? setPasswordError({ isError: true, message: 'Поле обязательно для заполнения' }) : setPasswordError({ isError: false, message: '' });
    !formData.get('birthDate') ? setBirthDateError({ isError: true, message: 'Поле обязательно для заполнения' }) : setBirthDateError({ isError: false, message: '' });

    if (!formData.get('name') || !formData.get('email') || !formData.get('password') || !formData.get('birthDate')) {
      console.log('return');

      return;
    }

    if(formData.get('role') === 'user'){
      dispatch(registerUserThunk({ formData: formData }));
    }
    else{
      dispatch(registerTrainerThunk({ formData: formData }));
    }
  }

  const nameFieldChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, name: evt.currentTarget.value });
  }

  const emailFieldChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, email: evt.currentTarget.value });
  }

  const birthDateFieldChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, birthDate: evt.currentTarget.value });
  }

  const passwordFieldChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: evt.currentTarget.value });
  }

  const sexRadioButtonClickHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, sex: evt.currentTarget.value });
  }

  const roleRadioButtonClickHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, role: evt.currentTarget.value });
  }

  const agreementCheckBoxChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, isAgree: !state.isAgree });
  }

  const locationListItemClickHandler = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setState({ ...state, location: evt.currentTarget.dataset.value as LocationEnum });
    setIsLocationListVissible(false);
  }

  const selectLocationButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.stopPropagation();
    evt.preventDefault();
    setIsLocationListVissible(!isLocationListVissible);
  }

  const selectLocationBlurHandler = (evt: React.FocusEvent<HTMLButtonElement, Element>) => {
    setIsLocationListVissible(!isLocationListVissible);
  }

  if (isRegistrationComplete && authoriztionData.role === 'trainer') {
    return <Navigate to={AppRoutes.QUESTIONNAIRE_COACH} />;
  }

  if (isRegistrationComplete && authoriztionData.role === 'user') {
    return <Navigate to={AppRoutes.QUESTIONNAIRE_USER} />;
  }

  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg className="background-logo__logo" aria-hidden="true" width="750" height="284" viewBox="0 0 750 284" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 282.191H36.0512V229H80.5314V205.752H36.0512V175.99H87.1323V150.481H0V282.191Z" fill="#181818" /><path d="M100.204 282.191H136.255V235.151H160.019C173.424 235.151 184.493 231.111 193.227 223.03C201.96 214.949 206.327 204.576 206.327 191.911C206.327 179.549 202.197 169.568 193.937 161.969C185.745 154.31 174.575 150.481 160.425 150.481H100.204V282.191ZM136.255 214.346V173.186H151.793C158.495 173.246 163.167 175.206 165.807 179.066C168.515 182.865 169.869 187.78 169.869 193.811C169.869 199.842 168.515 204.787 165.807 208.647C163.167 212.446 158.495 214.346 151.793 214.346H136.255ZM173.119 282.191H212.319L177.994 216.607L146.411 225.02L173.119 282.191Z" fill="#181818" /><path d="M223.258 282.191H259.817V150.481H223.258V282.191Z" fill="#181818" /><path d="M280.911 282.191H377.488V257.495H315.439V226.648H367.028V204.214H315.439V175.99H375.965V150.481H280.911V282.191Z" fill="#181818" /><path d="M390.052 282.191H420.62V209.642C420.62 207.531 420.62 205.541 420.62 203.671C420.62 201.741 420.518 199.751 420.315 197.701H420.924C421.466 199.631 422.143 201.651 422.955 203.762C423.768 205.872 424.614 207.832 425.494 209.642L463.678 282.191H498.714V150.481H468.146V221.944C468.146 223.995 468.112 226.136 468.045 228.367C468.045 230.598 468.112 232.739 468.248 234.79H467.74C467.198 232.86 466.488 230.749 465.607 228.457C464.795 226.166 463.949 224.055 463.069 222.125L426.205 150.481H390.052V282.191Z" fill="#181818" /><path d="M519.097 282.191H571.092C590.117 282.191 604.808 276.643 615.166 265.546C625.525 254.45 630.704 239.132 630.704 219.592V212.536C630.704 192.937 625.491 177.709 615.065 166.854C604.706 155.938 590.049 150.481 571.092 150.481H519.097V282.191ZM554.133 259.938V173.548H567.335C575.798 173.608 582.399 176.443 587.138 182.051C591.945 187.66 594.348 196.495 594.348 208.556V224.296C594.348 236.177 592.012 245.102 587.341 251.072C582.737 256.983 576.068 259.938 567.335 259.938H554.133Z" fill="#181818" /><path d="M643.877 247.183C643.877 259.304 648.921 268.471 659.009 274.683C669.096 280.894 681.96 284 697.599 284C713.238 284 725.864 280.502 735.478 273.507C745.159 266.451 750 256.771 750 244.469C750 233.433 746.717 224.537 740.149 217.783C733.582 210.968 722.987 205.541 708.363 201.5C697.26 198.364 689.61 195.56 685.412 193.087C681.283 190.615 679.218 187.539 679.218 183.86C679.218 179.941 680.572 176.744 683.28 174.272C686.056 171.799 690.558 170.563 696.786 170.563C702.541 170.563 706.942 171.98 709.988 174.814C713.103 177.589 714.66 181.509 714.66 186.574V190.012H746.852V184.041C746.852 172.704 742.147 163.989 732.736 157.898C723.393 151.807 711.173 148.762 696.075 148.762C680.775 148.762 668.555 152.139 659.415 158.893C650.275 165.648 645.705 174.875 645.705 186.574C645.705 196.887 649.124 205.39 655.962 212.084C662.8 218.778 673.869 224.387 689.17 228.91C699.664 232.046 706.84 234.94 710.699 237.594C714.558 240.247 716.488 243.534 716.488 247.454C716.488 252.218 714.795 255.987 711.41 258.762C708.092 261.475 703.32 262.832 697.091 262.832C690.592 262.832 685.514 261.325 681.858 258.309C678.27 255.294 676.51 250.65 676.577 244.378V239.584H643.877V247.183Z" fill="#181818" /><path d="M0 135.238H35.972L46.5103 80.6227H90.8926L95.4525 56.7517H51.0701L56.9472 26.1931H107.916L112.982 0H26.0417L0 135.238Z" fill="#181818" /><path d="M100.693 135.238H137.172L163.214 0H126.735L100.693 135.238Z" fill="#181818" /><path d="M171.393 26.1931H209.999L189.024 135.238H225.503L246.478 26.1931H284.882L289.948 0H176.459L171.393 26.1931Z" fill="#181818" /></svg>
          <svg className="background-logo__icon" aria-hidden="true" width="343" height="343" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 30C16.5667 30 30 43.4333 30 60V30H60C43.4333 30 30 16.5667 30 0C30 16.5667 16.5667 30 0 30Z" fill="#181818" /><path d="M30 60C30 43.4333 16.5667 30 0 30V60H30Z" fill="#C5EC2A" /><path d="M30 60C46.5667 60 60 46.5667 60 30H30V60Z" fill="#C5EC2A" /><path d="M30 0C30 16.5667 16.5667 30 0 30V0H30Z" fill="#C5EC2A" /><path d="M60 30C43.4333 30 30 16.5667 30 0H60V30Z" fill="#C5EC2A" /></svg>
        </div>
        <div className="popup-form popup-form--sign-up">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Регистрация</h1>
              </div>
              <div className="popup-form__form">
                <form method="get" onSubmit={formSubmitHandler}>
                  <div className="sign-up">
                    <div className="sign-up__load-photo">
                      <div className="input-load-avatar">
                        <label>
                          <input className="visually-hidden" type="file" name='userAvatar' accept="image/png, image/jpeg"
                            onChange={loadAvatarInputChangeHandler} />
                          <span className="input-load-avatar__btn">
                            <img ref={avatarImgElement} hidden={true} width={98} height={98} alt='avatar' />
                            {!isAvataImageVissible && <svg width="20" height="20" aria-hidden="true" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21H14C19 21 21 19 21 14V9M17 1V7M17 7L19 5M17 7L15 5M1.67 17.95L6.6 14.64C7.39 14.11 8.53 14.17 9.24 14.78L9.57 15.07C10.35 15.74 11.61 15.74 12.39 15.07L16.55 11.5C17.33 10.83 18.59 10.83 19.37 11.5L21 12.9M10 7C10 8.10457 9.10457 9 8 9C6.89543 9 6 8.10457 6 7C6 5.89543 6.89543 5 8 5C9.10457 5 10 5.89543 10 7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </span>
                        </label>
                      </div>
                      <div className="sign-up__description">
                        <h2 className="sign-up__legend">Загрузите фото профиля</h2><span className="sign-up__text">JPG, PNG,
                          оптимальный размер 100&times;100&nbsp;px</span>
                      </div>
                    </div>
                    <div className="sign-up__data" style={{rowGap: '8px'}}>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Имя</span>
                          <span className="custom-input__wrapper">
                            <input type="text" name="name" onChange={nameFieldChangeHandler} value={state.name} />
                          </span>
                          <span className="custom-input__error" style={nameError.isError ? { opacity: '10' } : { opacity: '0' }}>{nameError.message}&nbsp;</span>
                        </label>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">E-mail</span>
                          <span className="custom-input__wrapper">
                            <input type="email" name="email" onChange={emailFieldChangeHandler} value={state.email} />
                          </span>
                          <span className="custom-input__error" style={emailError.isError ? { opacity: '10' } : { opacity: '0' }}>{emailError.message}&nbsp;</span>
                        </label>
                      </div>
                      <div className="custom-input">
                        <label><span className="custom-input__label">Дата рождения</span>
                        <span className="custom-input__wrapper">
                          <input type="date" name="birthDate" max="2099-12-31" onChange={birthDateFieldChangeHandler} value={state.birthDate} />
                        </span>
                          <span className="custom-input__error" style={birthDateError.isError ? { opacity: '10' } : { opacity: '0' }}>{birthDateError.message}&nbsp;</span>
                        </label>
                      </div>
                      <div className="custom-select custom-select--not-selected">
                        <span className="custom-select__label">Ваша локация</span>
                        <div className="custom-select__placeholder" style={{bottom: '42px'}}>{getLocation(state.location)}</div>
                        <button className={`${isLocationListVissible ? styles.appButtonNoBottomBorderRounds : ''} custom-select__button`} type="button"
                          aria-label="Выберите одну из опций" onBlur={selectLocationBlurHandler} onClick={selectLocationButtonClick}>
                          <span className="custom-select__text"></span>
                          <span className="custom-select__icon">
                            <svg width="15" height="6" aria-hidden="true" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L9.82576 6.5118C9.09659 7.16273 7.90341 7.16273 7.17424 6.5118L1 1" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </span>
                        </button>
                        <ul className={`${isLocationListVissible ? styles.appListVisible : styles.appListHidden} custom-select__list`} role="listbox"  style={{bottom: '24px'}}>
                          <li className={`custom-select__item`} data-value={LocationEnum.PETROGRADSKAYA} onClick={locationListItemClickHandler}>ст. м. Петроградская</li>
                          <li className={`custom-select__item`} data-value={LocationEnum.PIONERSKAYA} onClick={locationListItemClickHandler}>ст. м. Пионерская</li>
                          <li className={`custom-select__item`} data-value={LocationEnum.SPORTIVNAYA} onClick={locationListItemClickHandler}>ст. м. Спортивная</li>
                          <li className={`custom-select__item`} data-value={LocationEnum.UDELNAYA} onClick={locationListItemClickHandler}>ст. м. Удельная</li>
                          <li className={`custom-select__item`} data-value={LocationEnum.ZVYOZDNAYA} onClick={locationListItemClickHandler}>ст. м. Звездная</li>
                        </ul>
                      </div>
                      <div className="custom-input">
                        <label>
                          <span className="custom-input__label">Пароль</span>
                          <span className="custom-input__wrapper">
                            <input type="password" name="password" autoComplete="off" onChange={passwordFieldChangeHandler} />
                          </span>
                          <span className="custom-input__error" style={passwordError.isError ? { opacity: '10' } : { opacity: '0' }}>{passwordError.message}&nbsp;</span>
                        </label>
                      </div>
                      <div className="sign-up__radio"><span className="sign-up__label">Пол</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="sex" value='male' checked={state.sex === 'male' ?? true} onChange={sexRadioButtonClickHandler} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">Мужской</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="sex" value='female' checked={state.sex === 'female' ?? true} onChange={sexRadioButtonClickHandler} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">Женский</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="sex" value='not_stated' checked={state.sex === 'not_stated' ?? true} onChange={sexRadioButtonClickHandler} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">Неважно</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__role">
                      <h2 className="sign-up__legend">Выберите роль</h2>
                      <div className="role-selector sign-up__role-selector">
                        <div className="role-btn">
                          <label>
                            <input className="visually-hidden" type="radio" name="role" value="trainer" checked={state.role === 'trainer' ?? true} onChange={roleRadioButtonClickHandler} />
                            <span className="role-btn__icon">
                              <svg width="12" height="13" aria-hidden="true" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.53704 10.5625H4.14815C3.46914 10.5625 2.91358 11.1475 2.91358 11.8625V12.025H2.2963C2.04321 12.025 1.83333 12.246 1.83333 12.5125C1.83333 12.779 2.04321 13 2.2963 13H9.7037C9.95679 13 10.1667 12.779 10.1667 12.5125C10.1667 12.246 9.95679 12.025 9.7037 12.025H9.08642V11.8625C9.08642 11.1475 8.53086 10.5625 7.85185 10.5625H6.46296V9.074C6.30864 9.0935 6.15432 9.1 6 9.1C5.84568 9.1 5.69136 9.0935 5.53704 9.074V10.5625Z" fill="currentColor" /><path d="M10 6.266C10.4074 6.1035 10.7654 5.837 11.0494 5.538C11.6235 4.8685 12 4.069 12 3.133C12 2.197 11.3025 1.4625 10.4136 1.4625H10.0679C9.66667 0.598 8.82716 0 7.85185 0H4.14815C3.17284 0 2.33333 0.598 1.9321 1.4625H1.58642C0.697531 1.4625 0 2.197 0 3.133C0 4.069 0.376543 4.8685 0.950617 5.538C1.23457 5.837 1.59259 6.1035 2 6.266C2.64198 7.93 4.18519 9.1 6 9.1C7.81482 9.1 9.35802 7.93 10 6.266ZM7.75309 4.1925L7.37037 4.6865C7.30864 4.758 7.26543 4.901 7.27161 4.9985L7.30864 5.6355C7.33333 6.0255 7.0679 6.227 6.72222 6.084L6.16049 5.85C6.07407 5.8175 5.92593 5.8175 5.83951 5.85L5.27778 6.084C4.9321 6.227 4.66667 6.0255 4.69136 5.6355L4.7284 4.9985C4.73457 4.901 4.69136 4.758 4.62963 4.6865L4.24691 4.1925C4.00617 3.8935 4.11111 3.562 4.46914 3.4645L5.05556 3.3085C5.14815 3.2825 5.25926 3.1915 5.30864 3.107L5.6358 2.574C5.83951 2.2425 6.16049 2.2425 6.3642 2.574L6.69136 3.107C6.74074 3.1915 6.85185 3.2825 6.94445 3.3085L7.53086 3.4645C7.88889 3.562 7.99383 3.8935 7.75309 4.1925Z" fill="currentColor" /></svg>
                            </span>
                            <span className="role-btn__btn">Я хочу тренировать</span>
                          </label>
                        </div>
                        <div className="role-btn">
                          <label>
                            <input className="visually-hidden" type="radio" name="role" value="user" checked={state.role === 'user' ?? true} onChange={roleRadioButtonClickHandler} />
                            <span className="role-btn__icon">
                              <svg width="14" height="8" aria-hidden="true" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.2231 0C9.15911 0 7.88978 0.385185 7.88978 2.22222V5.77778C7.88978 7.61482 9.15911 8 10.2231 8C11.2871 8 12.5564 7.61482 12.5564 5.77778V2.22222C12.5564 0.385185 11.2871 0 10.2231 0Z" fill="currentColor" /><path d="M3.77689 0C2.71289 0 1.44356 0.385185 1.44356 2.22222V5.77778C1.44356 7.61482 2.71289 8 3.77689 8C4.84089 8 6.11022 7.61482 6.11022 5.77778V2.22222C6.11022 0.385185 4.84089 0 3.77689 0Z" fill="currentColor" /><path d="M7.88978 3.55556H6.11022V4.44444H7.88978V3.55556Z" fill="currentColor" /><path d="M13.5333 5.92593C13.2782 5.92593 13.0667 5.72444 13.0667 5.48148V2.51852C13.0667 2.27556 13.2782 2.07407 13.5333 2.07407C13.7884 2.07407 14 2.27556 14 2.51852V5.48148C14 5.72444 13.7884 5.92593 13.5333 5.92593Z" fill="currentColor" /><path d="M0.466667 5.92593C0.211556 5.92593 0 5.72444 0 5.48148V2.51852C0 2.27556 0.211556 2.07407 0.466667 2.07407C0.721778 2.07407 0.933333 2.27556 0.933333 2.51852V5.48148C0.933333 5.72444 0.721778 5.92593 0.466667 5.92593Z" fill="currentColor" /></svg>
                            </span>
                            <span className="role-btn__btn">Я хочу тренироваться</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="sign-up__checkbox">
                      <label>
                        <input type="checkbox" value="user-agreement" name="user-agreement" checked={state.isAgree} onChange={agreementCheckBoxChangeHandler} />
                        <span className="sign-up__checkbox-icon">
                          <svg width="9" height="6" aria-hidden="true" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.99647 7L10 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        <span className="sign-up__checkbox-label">Я соглашаюсь с <span>политикой
                          конфиденциальности</span> компании</span>
                      </label>
                    </div>
                    <button className="btn sign-up__button" type="submit" disabled={!state.isAgree}>Продолжить</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
