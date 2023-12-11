import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateUserWithQuestionnaireDataThunk } from '../../store/slices/application.thunk';
import { useAppSelector } from '../../hooks/useAppSelector';
import { Navigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/app-routes.constants';


interface QuestionnaireUserPageState {
  trainingDuration: string;
  level: string;
  specialization: string[];
  calories: number;
  caloriesPerDay: number;
}

export function QuestionnaireUserPage(): JSX.Element {
  const [state, setState] = useState<QuestionnaireUserPageState>({ trainingDuration: '30-50', level: 'amature', specialization: [], calories: 1000, caloriesPerDay: 1000 });
  const authoriztionData = useAppSelector((state) => state.authorization.authoriztionData);
  const actualUserData = useAppSelector((state) => state.application.actualUserData);
  const dispatch = useAppDispatch();

  console.log(actualUserData);


  const timeRadioButtonClickHandler = (evt: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setState({ ...state, trainingDuration: evt.currentTarget.value });
  }

  const levelRadioButtonClickHandler = (evt: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setState({ ...state, level: evt.currentTarget.value });
  }

  const specializationRadioButtonClickHandler = (evt: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const value = evt.currentTarget.value;

    if (state.specialization.includes(value)) {
      const index = state.specialization.indexOf(value);
      state.specialization.splice(index, 1);
      setState({ ...state, specialization: [...state.specialization] });
    }
    else {
      setState({ ...state, specialization: [...state.specialization, value] });
    }
  }

  const caloriesFieldChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, calories: Number(evt.currentTarget.value) });
  }

  const caloriesPerDayFieldChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, caloriesPerDay: Number(evt.currentTarget.value) });
  }

  const resumeButtonClickHandler = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const questionnaireFormData = new FormData(evt.currentTarget);
    questionnaireFormData.set('id', authoriztionData.userId as string);
    dispatch(updateUserWithQuestionnaireDataThunk({formData: questionnaireFormData}));
  }

  if(actualUserData.trainingLevel){
    return <Navigate to={AppRoutes.INDEX}/>
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
        <div className="popup-form popup-form--questionnaire-user">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form method="get" onSubmit={ resumeButtonClickHandler }>
                  <div className="questionnaire-user">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-user__wrapper">
                    <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваша специализация
                        (тип) тренировок</span>
                        <div className="specialization-checkbox questionnaire-coach__specializations">
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="trainingType" value="yoga"
                                checked={state.specialization.includes('yoga')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Йога</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="trainingType" value="running"
                                checked={state.specialization.includes('running')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Бег</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="specialization" value="aerobics"
                                checked={state.specialization.includes('aerobics')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Аэробика</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="trainingType" value="crossfit"
                                checked={state.specialization.includes('crossfit')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Кроссфит</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="trainingType" value="boxing"
                                checked={state.specialization.includes('boxing')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Бокс</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="trainingType" value="pilates"
                                checked={state.specialization.includes('pilates')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Пилатес</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="trainingType" value="stretching"
                                checked={state.specialization.includes('stretching')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Стрейчинг</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-user__block">
                        <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          <div className="custom-toggle-radio__block" >
                            <label>
                              <input type="radio" name="trainingDuration" value={'10-30'} checked={state.trainingDuration === '10-30' ?? true} onClick={timeRadioButtonClickHandler} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">10-30 мин</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="trainingDuration" value={'30-50'} checked={state.trainingDuration === '30-50' ?? true} onClick={timeRadioButtonClickHandler} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">30-50 мин</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block" >
                            <label>
                              <input type="radio" name="trainingDuration" value={'50-80'} checked={state.trainingDuration === '50-80' ?? true} onClick={timeRadioButtonClickHandler} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">50-80 мин</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block" >
                            <label>
                              <input type="radio" name="trainingDuration" value={'80-100'} checked={state.trainingDuration === '80-100' ?? true} onClick={timeRadioButtonClickHandler} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">80-100 мин</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-user__block"><span className="questionnaire-user__legend">Ваш уровень</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-user__radio">
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="trainingLevel" value={'beginner'} checked={state.level === 'beginner' ?? true} onClick={levelRadioButtonClickHandler} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">Новичок</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="trainingLevel" value={'amature'} checked={state.level === 'amature' ?? true} onClick={levelRadioButtonClickHandler} /><span
                                className="custom-toggle-radio__icon"></span><span
                                  className="custom-toggle-radio__label">Любитель</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="trainingLevel" value={'professional'} checked={state.level === 'professional' ?? true} onClick={levelRadioButtonClickHandler} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">Профессионал</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-user__block">
                        <div className="questionnaire-user__calories-lose">
                          <span className="questionnaire-user__legend">Сколько
                            калорий хотите сбросить</span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label>
                              <span className="custom-input__wrapper">
                                <input type="number" name="calories" value={state.calories} onChange={caloriesFieldChangeHandler} />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="questionnaire-user__calories-waste"><span className="questionnaire-user__legend">Сколько
                          калорий тратить в день</span>
                          <div className="custom-input custom-input--with-text-right questionnaire-user__input">
                            <label>
                              <span className="custom-input__wrapper">
                                <input type="number" name="caloriesPerDay" value={state.caloriesPerDay} onChange={caloriesPerDayFieldChangeHandler} />
                                <span className="custom-input__text">ккал</span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn questionnaire-user__button" type="submit" onClick={(evt) => { console.log(); }}>Продолжить</button>
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
