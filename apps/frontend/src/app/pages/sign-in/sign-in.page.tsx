import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { signInThunk } from '../../store/slices/authorization.thunk';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AuthorizationStatusEnum } from '../../types/authorization-status.enum';
import { Navigate } from 'react-router-dom';


export function SignInPage(): JSX.Element {
  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');
  const dispatch = useAppDispatch();

  const authoriztionStatus = useAppSelector((state) => state.authorization.authoriztionStatus);
  const userData = useAppSelector((state) => state.authorization.authoriztionData);

  const onEmailFieldChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmailField(evt.currentTarget.value);
  }

  const onPasswordFieldChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordField(evt.currentTarget.value);
  }

  const signInButtonClickHandler = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    dispatch(signInThunk({ email: emailField, password: passwordField }));
  }

  if(authoriztionStatus === AuthorizationStatusEnum.AUTHORIZED){
    return userData.role === 'user' ? <Navigate to={'/index'}/> : <Navigate to={'/coachAccount'}/>
  }

  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg className="background-logo__logo" width="750" height="284" aria-hidden="true">
            <use xlinkHref="#logo-big"></use>
          </svg>
          <svg className="background-logo__icon" width="343" height="343" aria-hidden="true">
            <use xlinkHref="#icon-logotype"></use>
          </svg>
        </div>
        <div className="popup-form popup-form--sign-in">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Вход</h1>
              </div>
              <div className="popup-form__form">
                <form method="get">
                  <div className="sign-in">
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">E-mail</span>
                        <span className="custom-input__wrapper">
                          <input type="email" name="email" content={emailField} onChange={onEmailFieldChangeHandler} />
                        </span>
                      </label>
                    </div>
                    <div className="custom-input sign-in__input">
                      <label>
                        <span className="custom-input__label">Пароль</span>
                        <span className="custom-input__wrapper">
                          <input type="password" name="password" content={passwordField} onChange={onPasswordFieldChangeHandler} />
                        </span>
                      </label>
                    </div>
                    <div className="btn sign-in__button" onClick={signInButtonClickHandler}>Продолжить</div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
