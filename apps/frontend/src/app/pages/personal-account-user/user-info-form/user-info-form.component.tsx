import { useRef, useState } from 'react';
import { UserData } from '../../../types/user-data'
import { getLocation, getSex, getTrainingLevel } from '../../../utils/view-transform';
import { TrainingLevelEnum } from '../../../types/training-level.enum';
import styles from './user-info-form.component.module.css'
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { changeEditUserFormData } from '../../../store/slices/application.slice';
import { SexEnum } from '../../../types/sex.enum';
import { LocationEnum } from '../../../types/location.enum';
import { updateUserDataThunk } from '../../../store/slices/application.thunk';

type UserFormInfoComponentProps = {
  user: UserData
}

export function UserFormInfoComponent({ user }: UserFormInfoComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const avatarImgElement: React.MutableRefObject<any> = useRef(null);
  const avatarInputElement: React.MutableRefObject<any> = useRef(null);

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isSelectLocationListVissible, setIsSelectLocationListVissible] = useState<boolean>(false);
  const [isSelectSexListVissible, setIsSelectSexListVissible] = useState<boolean>(false);
  const [isSelectTrainingLevelListVissible, setIsSelectTrainingLevelListVissible] = useState<boolean>(false);

  const [nameError, setNameError] = useState({ isError: false, message: 'Минимальная длина: 1 символов\nМаксимальная длина: 15 символов' });
  const [descriptionError, setDescriptionError] = useState({ isError: false, message: 'Минимальная длина: 10 символов\nМаксимальная длина: 140 символов' });


  const editButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setIsEditable(true);
  }

  const userInfoEditSubmitHandler = (evt: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    evt.preventDefault();
    if(nameError.isError || descriptionError.isError){
      console.log('!!!!!');

      return;
    }

    const formData = new FormData(evt.currentTarget);
    formData.set('id', user.id as string);
    formData.set('isReadyForTraining', (user.isReadyForTraining as boolean) ? 'true' : 'false');
    formData.set('trainingLevel', user.trainingLevel as string);
    formData.set('location', user.location as string);
    formData.set('sex', user.sex as string);
    if (avatarInputElement.current.files[0]) {
      formData.set('userAvatar', avatarInputElement.current.files[0]);
    }

    dispatch(updateUserDataThunk({ formData: formData }));
    setIsEditable(false);
  }

  const loadAvatarInputChangeHandler = (evt: React.ChangeEvent<any>) => {
    if (evt.target.files[0]) {
      avatarImgElement.current.src = URL.createObjectURL(evt.target.files[0]);
    }
  }

  const descriptionInputChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (evt.currentTarget.value.length < 10 || evt.currentTarget.value.length > 140) {
      setDescriptionError({ ...descriptionError, isError: true });
    }
    else {
      setDescriptionError({ ...descriptionError, isError: false });
    }
    dispatch(changeEditUserFormData({ ...user, description: evt.currentTarget.value }));
  }

  const nameInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.currentTarget.value.length);
    if (evt.currentTarget.value.length < 1 || evt.currentTarget.value.length > 15) {
      setNameError({ ...nameError, isError: true });
    }
    else {
      setNameError({ ...nameError, isError: false });
    }

    dispatch(changeEditUserFormData({ ...user, name: evt.currentTarget.value }));
  }

  const trainingTypeInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    const trainingType = [...user.trainingType as string[]];

    dispatch(changeEditUserFormData({ ...user, trainingType: [] }));

    if (trainingType.includes(value)) {
      const index = trainingType.indexOf(value);
      trainingType.splice(index, 1);
      dispatch(changeEditUserFormData({ ...user, trainingType: trainingType }));
    }
    else {
      dispatch(changeEditUserFormData({ ...user, trainingType: [...trainingType, value] }));
    }
  }

  const isReadyForTrainingChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeEditUserFormData({ ...user, isReadyForTraining: !user.isReadyForTraining }));
  }

  const selectLocationButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setIsSelectLocationListVissible(!isSelectLocationListVissible);
  }

  const chooseTrainingLevelButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setIsSelectTrainingLevelListVissible(!isSelectTrainingLevelListVissible);
  }

  const chooseSexButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setIsSelectSexListVissible(!isSelectSexListVissible);
  }

  const locationListItemClickHandler = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    dispatch(changeEditUserFormData({ ...user, location: evt.currentTarget.dataset.value }));
    setIsSelectLocationListVissible(false);
  }

  const sexListItemClickHandler = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    dispatch(changeEditUserFormData({ ...user, sex: evt.currentTarget.dataset.value }));
    setIsSelectSexListVissible(false);
  }

  const trainingLevelListItemClickHandler = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    dispatch(changeEditUserFormData({ ...user, trainingLevel: evt.currentTarget.dataset.value }));
    setIsSelectTrainingLevelListVissible(false);
  }

  const buttonBlurHandler = (evt: React.FocusEvent<HTMLButtonElement, Element>) => {
    setIsSelectLocationListVissible(false);
    setIsSelectTrainingLevelListVissible(false);
    setIsSelectSexListVissible(false);
  }

  return (
    <section className="user-info">
      <div className="user-info-edit__header">
        <div className="input-load-avatar">
          <label>
            <input ref={avatarInputElement} onChange={loadAvatarInputChangeHandler} className="visually-hidden" type="file" name="user-photo-1" disabled={!isEditable} accept="image/png, image/jpeg" />
            <span className="input-load-avatar__avatar">
              <img ref={avatarImgElement}
                src={`http://localhost:3042/assets/users-data/${user.id}/${user.avatarFileName}`}
                width="98" height="98" alt="user" />
            </span>
          </label>
        </div>
      </div>
      <form className="user-info__form" action="#" method="post" onSubmit={userInfoEditSubmitHandler}>
        <button className="btn-flat btn-flat--underlined user-info-edit__save-button" style={{ visibility: isEditable ? 'hidden' : 'visible' }}
          aria-label="Редактировать" onClick={editButtonClickHandler}>
          <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span>Редактировать</span>
        </button>
        <button className="btn-flat btn-flat--underlined user-info-edit__save-button" type="submit" style={{ visibility: !isEditable ? 'hidden' : 'visible' }}
          aria-label="Сохранить">
          <svg width="12" height="12" aria-hidden="true" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.92156 3.08853C7.24415 5.08374 8.92461 6.60906 11.0102 6.81147M7.94934 2.04032L1.79017 8.32234C1.5576 8.5609 1.33254 9.03079 1.28753 9.35609L1.00995 11.6983C0.912428 12.5441 1.5426 13.1224 2.41284 12.9778L4.82849 12.5802C5.16609 12.5224 5.63871 12.2838 5.87128 12.0381L12.0305 5.75604C13.0957 4.67168 13.5759 3.43552 11.9179 1.92465C10.2675 0.428245 9.01463 0.955964 7.94934 2.04032Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
          <span>Сохранить</span>
        </button>
        <div className="user-info__section" style={{ marginBottom: 0 }}>
          <h2 className="user-info__title">Обо мне</h2>
          <div className={isEditable ? "custom-input user-info-edit__input" : 'custom-input custom-input--readonly user-info__input'}>
            <label>
              <span className="custom-input__label">Имя</span>
              <span className="custom-input__wrapper">
                <input type="text" name="name" value={user.name} onChange={nameInputChangeHandler} disabled={!isEditable} />
              </span>
            </label>
          </div>
          <div>
            <span className="custom-input__error" style={nameError.isError ? { opacity: '10' } : { opacity: '0', fontSize: '3px' }}>
              {nameError.message}&nbsp;
            </span>
          </div>
          <div className="custom-textarea custom-textarea--readonly user-info__textarea">
            <label>
              <span className="custom-textarea__label">Описание</span>
              <textarea name="description" value={user.description} onChange={descriptionInputChangeHandler} disabled={!isEditable} />
              {/* {user.description}
              </textarea> */}
            </label>
          </div>
        </div>
        <div>
          <span className="custom-input__error" style={descriptionError.isError ? { opacity: '10' } : { opacity: '0', fontSize: '3px' }}>
            {descriptionError.message}&nbsp;
          </span>
        </div>
        <div className="user-info-edit__section user-info-edit__section--status" style={{ marginTop: '20px' }}>
          <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
          <div className="custom-toggle custom-toggle--switch user-info-edit__toggle">
            <label>
              <input type="checkbox" name="isReadyForTraining" checked={user.isReadyForTraining} onChange={isReadyForTrainingChangeHandler}
                disabled={!isEditable} />
              <span className="custom-toggle__icon">
              </span>
              <span className="custom-toggle__label">Готов к тренировке</span>
            </label>
          </div>
        </div>
        {
          user.trainingType &&
          <div className="user-info-edit__section">
            <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
            <div className="specialization-checkbox user-info-edit__specialization">
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="trainingType" value="yoga" disabled={!isEditable} onChange={trainingTypeInputChangeHandler} checked={(user.trainingType as string[]).includes('yoga')} />
                  <span className="btn-checkbox__btn">Йога</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="trainingType" value="aerobics" disabled={!isEditable} onChange={trainingTypeInputChangeHandler} checked={(user.trainingType as string[]).includes('aerobics')} />
                  <span className="btn-checkbox__btn">Аэробика</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="trainingType" value="running" disabled={!isEditable} onChange={trainingTypeInputChangeHandler} checked={(user.trainingType as string[]).includes('running')} /><span
                    className="btn-checkbox__btn">Бег</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="trainingType" value="box" disabled={!isEditable} onChange={trainingTypeInputChangeHandler} checked={(user.trainingType as string[]).includes('box')} /><span
                    className="btn-checkbox__btn">Бокс</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="trainingType" value="pilates" disabled={!isEditable} onChange={trainingTypeInputChangeHandler} checked={(user.trainingType as string[]).includes('pilates')}
                  /><span className="btn-checkbox__btn">Пилатес</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="trainingType" value="stretching" disabled={!isEditable} onChange={trainingTypeInputChangeHandler} checked={(user.trainingType as string[]).includes('stretching')} />
                  <span className="btn-checkbox__btn">Стрейчинг</span>
                </label>
              </div>
              <div className="btn-checkbox">
                <label>
                  <input className="visually-hidden" type="checkbox" name="trainingType" value="crossfit" disabled={!isEditable} onChange={trainingTypeInputChangeHandler} checked={(user.trainingType as string[]).includes('crossfit')} /><span
                    className="btn-checkbox__btn">Кроссфит</span>
                </label>
              </div>
            </div>
          </div>
        }
        <div className={`custom-select ${!isEditable ? 'custom-select--readonly' : ''} user-info-edit__select`}><span className="custom-select__label">Локация</span>
          <div className="custom-select__placeholder">{getLocation(user.location as LocationEnum)}</div>
          <button className={`${isSelectLocationListVissible ? styles.appButtonNoBottomBorderRounds : ''} custom-select__button`} type="button"
            aria-label="Выберите одну из опций" onBlur={buttonBlurHandler} onClick={selectLocationButtonClick} disabled={!isEditable}>
            <span className="custom-select__text"></span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L9.82576 6.5118C9.09659 7.16273 7.90341 7.16273 7.17424 6.5118L1 1" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
          </button>
          <ul className={`${isSelectLocationListVissible ? styles.appListVisible : styles.appListHidden} custom-select__list`} role="listbox">
            <li className={`custom-select__item`} data-value={'Petrogradskaya'} onClick={locationListItemClickHandler}>ст. м. Петроградская</li>
            <li className={`custom-select__item`} data-value={'Pionerskaya'} onClick={locationListItemClickHandler}>ст. м. Пионерская</li>
            <li className={`custom-select__item`} data-value={'Sportivnaya'} onClick={locationListItemClickHandler}>ст. м. Спортивная</li>
            <li className={`custom-select__item`} data-value={'Udelnaya'} onClick={locationListItemClickHandler}>ст. м. Удельная</li>
            <li className={`custom-select__item`} data-value={'Zvyozdnaya'} onClick={locationListItemClickHandler}>ст. м. Звездная</li>
          </ul>
        </div>
        <div className={`custom-select ${!isEditable ? 'custom-select--readonly' : ''} user-info-edit__select`}>
          <span className="custom-select__label">Пол</span>
          <div className="custom-select__placeholder">{getSex(user.sex as SexEnum)}</div>
          <button className={`${isSelectSexListVissible ? styles.appButtonNoBottomBorderRounds : ''} custom-select__button`} type="button"
            aria-label="Выберите одну из опций" onClick={chooseSexButtonClickHandler} onBlur={buttonBlurHandler} disabled={!isEditable}>
            <span className="custom-select__text"></span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1L9.82576 6.5118C9.09659 7.16273 7.90341 7.16273 7.17424 6.5118L1 1" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
          </button>
          <ul className={`${isSelectSexListVissible ? styles.appListVisible : styles.appListHidden} custom-select__list`} role="listbox">
            <li className={`custom-select__item`} data-value={SexEnum.MALE} onClick={sexListItemClickHandler}>Мужской</li>
            <li className={`custom-select__item`} data-value={SexEnum.FEMALE} onClick={sexListItemClickHandler}>Женский</li>
            <li className={`custom-select__item`} data-value={SexEnum.NOT_STATED} onClick={sexListItemClickHandler}>Не указано</li>
          </ul>
        </div>
        <div className={`custom-select ${!isEditable ? 'custom-select--readonly' : ''} user-info-edit__select`}>
          <span className="custom-select__label">Уровень</span>
          <div className="custom-select__placeholder">{getTrainingLevel(user.trainingLevel as TrainingLevelEnum)}</div>
          <button className={`${isSelectTrainingLevelListVissible ? styles.appButtonNoBottomBorderRounds : ''} custom-select__button`} type="button" aria-label="Выберите одну из опций"
            onClick={chooseTrainingLevelButtonClickHandler} onBlur={buttonBlurHandler} disabled={!isEditable}>
            <span className="custom-select__text"></span>
            <span className="custom-select__icon">
              <svg width="15" height="6" aria-hidden="true" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 1L9.82576 6.5118C9.09659 7.16273 7.90341 7.16273 7.17424 6.5118L1 1" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </span>
          </button>
          <ul className={`${isSelectTrainingLevelListVissible ? styles.appListVisible : styles.appListHidden} custom-select__list`} role="listbox">
            <li className={`custom-select__item`} data-value={TrainingLevelEnum.BEGINNER} onClick={trainingLevelListItemClickHandler}>Новичок</li>
            <li className={`custom-select__item`} data-value={TrainingLevelEnum.AMATEUR} onClick={trainingLevelListItemClickHandler}>Любитель</li>
            <li className={`custom-select__item`} data-value={TrainingLevelEnum.PROFESSIONAL} onClick={trainingLevelListItemClickHandler}>Профессионал</li>
          </ul>
        </div>
      </form>
    </section>
  );
}
