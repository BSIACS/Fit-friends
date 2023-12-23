import { useState } from 'react';
import { TrainingLevelEnum } from '../../types/training-level.enum';
import styles from './create-training.page.module.css'
import { getTrainingLevel, getTypeTraining } from '../../utils/view-transform';
import { TrainingDurationEnum } from '../../types/training-duration.enum';
import { TrainingTypeEnum } from '../../types/training-type.enum';
import { SexEnum } from '../../types/sex.enum';
import axios from 'axios';
import { requestWithAccessTokenInterceptor } from '../../services/interceptors';
import { TrainingDTO } from '../../dto/training.dto';
import { BadRequestPage } from '../bad-request/bad-request.page';
import { useAppSelector } from '../../hooks/useAppSelector';
import { LoaderComponent } from '../../components/loader/loader.component';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/app-routes.constants';

const DEFAULT_SEX = SexEnum.NOT_STATED;
const NAME_MIN_LENGTH = 1;
const NAME_MAX_LENGTH = 15;
const CALORIES_MIN_VALUE = 1000;
const CALORIES_MAX_VALUE = 5000;
const PRICE_MIN_VALUE = 0;
const PRICE_MAX_VALUE = 9999999;
const DESCRIPTION_MIN_LENGTH = 10;
const DESCRIPTION_MAX_LENGTH = 140;


export interface ValidationError {
  isError: boolean;
  message: string;
}

export function CreateTrainingPage(): JSX.Element {
  const authoriztionData = useAppSelector(state => state.authorization.authoriztionData);
  const isAuthoriztionDataLoading = useAppSelector(state => state.authorization.isLoading);

  const [trainingName, setTrainingName] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [sex, setSex] = useState<SexEnum>(DEFAULT_SEX);
  const [description, setDescription] = useState<string>('');
  const [trainingVideoFile, setTrainingVideoFile] = useState<File>();

  const [trainingType, setTrainingType] = useState<TrainingTypeEnum>(TrainingTypeEnum.AEROBICS);
  const [isSelectTrainingTypeListVissible, setIsSelectTrainingTypeListVissible] = useState<boolean>(false);
  const [duration, setDuration] = useState<TrainingDurationEnum>(TrainingDurationEnum.TEN_THIRTY);
  const [isSelectDurationListVissible, setIsSelectDurationListVissible] = useState<boolean>(false);
  const [trainingLevel, setTrainingLevel] = useState<TrainingLevelEnum>(TrainingLevelEnum.AMATEUR);
  const [isSelectTrainingLevelListVissible, setIsSelectTrainingLevelListVissible] = useState<boolean>(false);
  const [isTrainingCreated, setIsTrainingCreated] = useState<boolean>(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);

  const [trainingNameValidationError, setTrainingNameValidationError] = useState<ValidationError>({ isError: false, message: 'Ограничение: длинна строки от 1 до 15 символов' });
  const [caloriesValidationError, setCaloriesValidationError] = useState<ValidationError>({ isError: false, message: 'Ограничение: минимальное значение 1000, максимальное значение 5000' });
  const [priceValidationError, setPriceValidationError] = useState<ValidationError>({ isError: false, message: 'Ограничение: только положительное целое число' });
  const [descriptionValidationError, setDescriptionValidationError] = useState<ValidationError>({ isError: false, message: 'Ограничение: длинна строки от 10 до 140 символов' });
  const [trainingVideoValidationError, setTrainingVideoValidationError] = useState<ValidationError>({ isError: false, message: 'Ограничение: файл обязателен для загрузки' });


  const createTraining = async (formData: FormData) => {
    setIsTrainingCreated(false);

    const axiosInstance = axios.create({
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
    });
    axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);

    try {
      await axiosInstance.post<TrainingDTO>(`http://localhost:3042/api/trainerAccount/createTraining`, formData);

      setIsTrainingCreated(true);
    }
    catch (error) {
      setIsTrainingCreated(true);
      setIsRequestError(true);
    }
  }

  const validate = () => {
    let isValid = true;
    if (trainingName.length < NAME_MIN_LENGTH || trainingName.length > NAME_MAX_LENGTH) {
      setTrainingNameValidationError({ ...trainingNameValidationError, isError: true });
      isValid = false;
    }
    if (Number(calories) < CALORIES_MIN_VALUE || Number(calories) > CALORIES_MAX_VALUE) {
      setCaloriesValidationError({ ...caloriesValidationError, isError: true });
      isValid = false;
    }
    if (Number(price) < PRICE_MIN_VALUE || Number(price) > PRICE_MAX_VALUE) {
      setPriceValidationError({ ...priceValidationError, isError: true });
      isValid = false;
    }
    if (Number(description.length) < DESCRIPTION_MIN_LENGTH || Number(description.length) > DESCRIPTION_MAX_LENGTH) {
      setDescriptionValidationError({ ...descriptionValidationError, isError: true });
      isValid = false;
    }
    if (!trainingVideoFile || trainingVideoFile.size <= 0) {
      setTrainingVideoValidationError({ ...trainingVideoValidationError, isError: true })
      isValid = false;
    }

    return isValid;
  }

  //#region HANDLERS

  const formSubmitHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const isValid = validate();

    if (isValid) {
      createTraining(formData);
    }
  }

  const trainingNameInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setTrainingName(evt.currentTarget.value);
    if (evt.currentTarget.value.length >= NAME_MIN_LENGTH && evt.currentTarget.value.length <= NAME_MAX_LENGTH) {
      setTrainingNameValidationError({ ...trainingNameValidationError, isError: false });
    }
  }

  const caloriesInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCalories(evt.currentTarget.value);
    if (Number(evt.currentTarget.value) >= CALORIES_MIN_VALUE && Number(evt.currentTarget.value) <= CALORIES_MAX_VALUE) {
      setCaloriesValidationError({ ...caloriesValidationError, isError: false });
    }
  }

  const priceInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(evt.currentTarget.value);
    if (Number(evt.currentTarget.value) >= PRICE_MIN_VALUE && Number(evt.currentTarget.value) <= PRICE_MAX_VALUE) {
      setPriceValidationError({ ...priceValidationError, isError: false });
    }
  }

  const descriptionInputChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(evt.currentTarget.value);
    if (Number(evt.currentTarget.value.length) >= DESCRIPTION_MIN_LENGTH && Number(evt.currentTarget.value.length) <= DESCRIPTION_MAX_LENGTH) {
      setDescriptionValidationError({ ...descriptionValidationError, isError: false });
    }
  }

  const trainingTypeListItemClickHandler = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setTrainingType(evt.currentTarget.dataset.value as TrainingTypeEnum);
    setIsSelectTrainingTypeListVissible(false);
  }

  const chooseTrainingTypeButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setIsSelectTrainingTypeListVissible(!isSelectTrainingTypeListVissible);
  }

  const durationListItemClickHandler = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setDuration(evt.currentTarget.dataset.value as TrainingDurationEnum);
    setIsSelectDurationListVissible(false);
  }

  const chooseDurationButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setIsSelectDurationListVissible(!isSelectDurationListVissible);
  }

  const trainingLevelListItemClickHandler = (evt: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setTrainingLevel(evt.currentTarget.dataset.value as TrainingLevelEnum);
    setIsSelectTrainingLevelListVissible(false);
  }

  const chooseTrainingLevelButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.preventDefault();
    setIsSelectTrainingLevelListVissible(!isSelectTrainingLevelListVissible);
  }

  const selectSexInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSex(evt.currentTarget.dataset.value as SexEnum);
  }

  const fileInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.currentTarget.files && evt.currentTarget.files?.length >= 1) {
      setTrainingVideoFile(evt.currentTarget.files[0]);
      setTrainingVideoValidationError({ ...trainingVideoValidationError, isError: false });
    }
  }

  const buttonBlurHandler = (evt: React.FocusEvent<HTMLButtonElement, Element>) => {
    setIsSelectTrainingTypeListVissible(false);
    setIsSelectDurationListVissible(false);
    setIsSelectTrainingLevelListVissible(false);
  }

  //#endregion

  if(isTrainingCreated){
    return <Navigate to={AppRoutes.TRAINER_ACCOUNT}/>
  }

  if (isRequestError) {
    return <BadRequestPage />;
  }

  return (
    <div className="wrapper">
      <LoaderComponent isHidden={!isAuthoriztionDataLoading}/>
      <main>
        <div className="popup-form popup-form--create-training">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__title-wrapper">
                <h1 className="popup-form__title">Создание тренировки</h1>
              </div>
              <div className="popup-form__form">
                <form onSubmit={formSubmitHandler}>
                  <div className="create-training">
                    <div className="create-training__wrapper">
                      <div className="create-training__block">
                        <input name='trainingCreatorId' value={authoriztionData.userId} hidden={true}/>
                        <h2 className="create-training__legend">Название тренировки</h2>
                        <div className="custom-input create-training__input">
                          <label>
                            <span className="custom-input__wrapper">
                              <input type="text" name="name" onChange={trainingNameInputChangeHandler} value={trainingName} />
                            </span>
                            <span className="custom-input__error" style={trainingNameValidationError.isError ? { opacity: '10', marginTop: '10px' } : { opacity: '0', marginTop: '10px' }}>
                              {trainingNameValidationError.message}&nbsp;
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Характеристики тренировки</h2>
                        <div className={`create-training__info ${styles.createTrainingInfoAdjustment}`}>
                          <div className="custom-select custom-select--not-selected"><span
                            className="custom-select__label">Выберите тип тренировки</span>
                            <input hidden={true} name='trainingType' value={trainingType}/>
                            <div className={`custom-select__placeholder ${styles.customSelectPlaceholderTrainingTypeAdjustment}`}>{getTypeTraining(trainingType)}</div>
                            <button className={`${isSelectTrainingTypeListVissible ? styles.appButtonNoBottomBorderRounds : ''} custom-select__button`} type="button" aria-label="Выберите одну из опций"
                              onClick={chooseTrainingTypeButtonClickHandler} onBlur={buttonBlurHandler}>
                              <span className="custom-select__text"></span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16 1L9.82576 6.5118C9.09659 7.16273 7.90341 7.16273 7.17424 6.5118L1 1" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              </span>
                            </button>
                            <ul className={`${isSelectTrainingTypeListVissible ? styles.appListVisible : styles.appListHidden}
                            custom-select__list ${styles.customSelectListTrainingTypeAdjustment}`} role="listbox">
                              <li className={`custom-select__item`} data-value={TrainingTypeEnum.AEROBICS} onClick={trainingTypeListItemClickHandler}>{getTypeTraining(TrainingTypeEnum.AEROBICS)}</li>
                              <li className={`custom-select__item`} data-value={TrainingTypeEnum.BOX} onClick={trainingTypeListItemClickHandler}>{getTypeTraining(TrainingTypeEnum.BOX)}</li>
                              <li className={`custom-select__item`} data-value={TrainingTypeEnum.CROSSFIT} onClick={trainingTypeListItemClickHandler}>{getTypeTraining(TrainingTypeEnum.CROSSFIT)}</li>
                              <li className={`custom-select__item`} data-value={TrainingTypeEnum.PILATES} onClick={trainingTypeListItemClickHandler}>{getTypeTraining(TrainingTypeEnum.PILATES)}</li>
                              <li className={`custom-select__item`} data-value={TrainingTypeEnum.RUNNING} onClick={trainingTypeListItemClickHandler}>{getTypeTraining(TrainingTypeEnum.RUNNING)}</li>
                              <li className={`custom-select__item`} data-value={TrainingTypeEnum.STRETCHING} onClick={trainingTypeListItemClickHandler}>{getTypeTraining(TrainingTypeEnum.STRETCHING)}</li>
                              <li className={`custom-select__item`} data-value={TrainingTypeEnum.YOGA} onClick={trainingTypeListItemClickHandler}>{getTypeTraining(TrainingTypeEnum.YOGA)}</li>
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label><span className="custom-input__label">Сколько калорий потратим</span><span
                              className="custom-input__wrapper">
                              <input type="number" name="calories" onChange={caloriesInputChangeHandler} value={calories} step="1" />
                              <span className="custom-input__text">ккал</span>
                            </span>
                              <span className="custom-input__error" style={caloriesValidationError.isError ? { opacity: '10', marginTop: '10px' } : { opacity: '0', marginTop: '10px' }}>
                                {caloriesValidationError.message}&nbsp;
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected"><span
                            className="custom-select__label">Сколько времени потратим</span>
                            <input hidden={true} name='trainingDuration' value={duration}/>
                            <div className={`custom-select__placeholder ${styles.customSelectPlaceholderTrainingDurationAdjustment}`}>{duration}</div>
                            <button className={`${isSelectDurationListVissible ? styles.appButtonNoBottomBorderRounds : ''} custom-select__button`} type="button" aria-label="Выберите одну из опций"
                              onClick={chooseDurationButtonClickHandler} onBlur={buttonBlurHandler}>
                              <span className="custom-select__text"></span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16 1L9.82576 6.5118C9.09659 7.16273 7.90341 7.16273 7.17424 6.5118L1 1" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              </span>
                            </button>
                            <ul className={`${isSelectDurationListVissible ? styles.appListVisible : styles.appListHidden} custom-select__list
                            ${styles.customSelectListTrainingTypeAdjustment}`} role="listbox">
                              <li className={`custom-select__item`} data-value={TrainingDurationEnum.TEN_THIRTY} onClick={durationListItemClickHandler}>10-30</li>
                              <li className={`custom-select__item`} data-value={TrainingDurationEnum.THIRTY_FIFTY} onClick={durationListItemClickHandler}>30-50</li>
                              <li className={`custom-select__item`} data-value={TrainingDurationEnum.FIFTY_EIGHTY} onClick={durationListItemClickHandler}>50-80</li>
                              <li className={`custom-select__item`} data-value={TrainingDurationEnum.EIGHTY_HUNDRED} onClick={durationListItemClickHandler}>80-100</li>
                            </ul>
                          </div>
                          <div className="custom-input custom-input--with-text-right">
                            <label>
                              <span className="custom-input__label">Стоимость тренировки</span>
                              <span className="custom-input__wrapper">
                                <input type="number" name="price" onChange={priceInputChangeHandler} value={price} step="1" />
                                <span className="custom-input__text">₽</span>
                              </span>
                              <span className="custom-input__error" style={priceValidationError.isError ? { opacity: '10', marginTop: '10px' } : { opacity: '0', marginTop: '10px' }}>
                                {priceValidationError.message}&nbsp;
                              </span>
                            </label>
                          </div>
                          <div className="custom-select custom-select--not-selected"><span
                            className="custom-select__label">Выберите уровень тренировки</span>
                            <input hidden={true} name='trainingLevel' value={trainingLevel}/>
                            <div className="custom-select__placeholder">{getTrainingLevel(trainingLevel)}</div>
                            <button className={`${isSelectTrainingLevelListVissible ? styles.appButtonNoBottomBorderRounds : ''} custom-select__button`} type="button" aria-label="Выберите одну из опций"
                              onClick={chooseTrainingLevelButtonClickHandler} onBlur={buttonBlurHandler}>
                              <span className="custom-select__text"></span>
                              <span className="custom-select__icon">
                                <svg width="15" height="6" aria-hidden="true" viewBox="0 0 17 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M16 1L9.82576 6.5118C9.09659 7.16273 7.90341 7.16273 7.17424 6.5118L1 1" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                              </span>
                            </button>
                            <ul className={`${isSelectTrainingLevelListVissible ? styles.appListVisible : styles.appListHidden}
                            custom-select__list ${styles.customSelectListTrainingLevelAdjustment}`} role="listbox">
                              <li className={`custom-select__item`} data-value={TrainingLevelEnum.BEGINNER} onClick={trainingLevelListItemClickHandler}>Новичок</li>
                              <li className={`custom-select__item`} data-value={TrainingLevelEnum.AMATEUR} onClick={trainingLevelListItemClickHandler}>Любитель</li>
                              <li className={`custom-select__item`} data-value={TrainingLevelEnum.PROFESSIONAL} onClick={trainingLevelListItemClickHandler}>Профессионал</li>
                            </ul>
                          </div>
                          <div className="create-training__radio-wrapper"><span className="create-training__label">Кому подойдет
                            тренировка</span>
                            <br />
                            <div className="custom-toggle-radio create-training__radio">
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="sex" value={SexEnum.MALE} onChange={selectSexInputChangeHandler} defaultChecked={DEFAULT_SEX as SexEnum === SexEnum.MALE} /><span className="custom-toggle-radio__icon"></span><span
                                    className="custom-toggle-radio__label">Мужчинам</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="sex" value={SexEnum.FEMALE} onChange={selectSexInputChangeHandler} defaultChecked={DEFAULT_SEX as SexEnum === SexEnum.FEMALE} /><span
                                    className="custom-toggle-radio__icon"></span><span
                                      className="custom-toggle-radio__label">Женщинам</span>
                                </label>
                              </div>
                              <div className="custom-toggle-radio__block">
                                <label>
                                  <input type="radio" name="sex" value={SexEnum.NOT_STATED} onChange={selectSexInputChangeHandler} defaultChecked={DEFAULT_SEX as SexEnum === SexEnum.NOT_STATED} /><span className="custom-toggle-radio__icon"></span><span
                                    className="custom-toggle-radio__label">Всем</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Описание тренировки</h2>
                        <div className={`custom-textarea create-training__textarea ${styles.createTrainingTextareaAdjustment}`}>
                          <label>
                            <textarea name="description" placeholder=" " onChange={descriptionInputChangeHandler} value={description}></textarea>
                          </label>
                        </div>
                        <span className="custom-input__error" style={descriptionValidationError.isError ? { opacity: '10', marginTop: '10px' } : { opacity: '0', marginTop: '10px' }}>
                          {descriptionValidationError.message}&nbsp;
                        </span>
                      </div>
                      <div className="create-training__block">
                        <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
                        <div className={`drag-and-drop create-training__drag-and-drop ${styles.createTrainingDragAndDropAdjustment}`}>
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата MOV, AVI или
                              MP4
                              <svg width="20" height="20" aria-hidden="true">
                                <use xlinkHref="#icon-import-video"></use>
                              </svg>
                            </span>
                            <input type="file" name="videoDemo" tabIndex={-1} onChange={fileInputChangeHandler} accept=".mov, .avi, .mp4" />
                          </label>
                        </div>
                        <span className="custom-input__error" style={trainingVideoValidationError.isError ? { opacity: '10', marginTop: '10px' } : { opacity: '0', marginTop: '10px' }}>
                          {trainingVideoValidationError.message}&nbsp;
                        </span>
                      </div>
                    </div>
                    <button className="btn create-training__button" type="submit">Опубликовать</button>
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
