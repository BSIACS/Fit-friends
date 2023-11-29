import { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setIsRegistrationComplete } from '../../store/slices/authorization.slice';

type QuestionnaireCoachPageProps = {
  formData: FormData
}

interface QuestionnaireCoachPageState {
  specialization: string[];
  level: string;
  certificate: File | undefined;
  merits: string;
  isIndividualTrainingAvailable: boolean;
}

const questionnaireCoachPageInitialState = {
  specialization: [],
  level: 'amature',
  certificate: undefined,
  merits: '',
  isIndividualTrainingAvailable: false,
}

export function QuestionnaireCoachPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<QuestionnaireCoachPageState>(questionnaireCoachPageInitialState);

  console.log('***666***');

  dispatch(setIsRegistrationComplete(false));

  console.log('***777***');



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

  const levelRadioButtonClickHandler = (evt: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setState({ ...state, level: evt.currentTarget.value });
  }

  const descriptionFieldChangeHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState({ ...state, merits: evt.currentTarget.value });
  }

  return (
    <div className="wrapper">
      <main>
        <div className="background-logo">
          <svg className="background-logo__logo" aria-hidden="true" width="750" height="284" viewBox="0 0 750 284" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 282.191H36.0512V229H80.5314V205.752H36.0512V175.99H87.1323V150.481H0V282.191Z" fill="#181818" /><path d="M100.204 282.191H136.255V235.151H160.019C173.424 235.151 184.493 231.111 193.227 223.03C201.96 214.949 206.327 204.576 206.327 191.911C206.327 179.549 202.197 169.568 193.937 161.969C185.745 154.31 174.575 150.481 160.425 150.481H100.204V282.191ZM136.255 214.346V173.186H151.793C158.495 173.246 163.167 175.206 165.807 179.066C168.515 182.865 169.869 187.78 169.869 193.811C169.869 199.842 168.515 204.787 165.807 208.647C163.167 212.446 158.495 214.346 151.793 214.346H136.255ZM173.119 282.191H212.319L177.994 216.607L146.411 225.02L173.119 282.191Z" fill="#181818" /><path d="M223.258 282.191H259.817V150.481H223.258V282.191Z" fill="#181818" /><path d="M280.911 282.191H377.488V257.495H315.439V226.648H367.028V204.214H315.439V175.99H375.965V150.481H280.911V282.191Z" fill="#181818" /><path d="M390.052 282.191H420.62V209.642C420.62 207.531 420.62 205.541 420.62 203.671C420.62 201.741 420.518 199.751 420.315 197.701H420.924C421.466 199.631 422.143 201.651 422.955 203.762C423.768 205.872 424.614 207.832 425.494 209.642L463.678 282.191H498.714V150.481H468.146V221.944C468.146 223.995 468.112 226.136 468.045 228.367C468.045 230.598 468.112 232.739 468.248 234.79H467.74C467.198 232.86 466.488 230.749 465.607 228.457C464.795 226.166 463.949 224.055 463.069 222.125L426.205 150.481H390.052V282.191Z" fill="#181818" /><path d="M519.097 282.191H571.092C590.117 282.191 604.808 276.643 615.166 265.546C625.525 254.45 630.704 239.132 630.704 219.592V212.536C630.704 192.937 625.491 177.709 615.065 166.854C604.706 155.938 590.049 150.481 571.092 150.481H519.097V282.191ZM554.133 259.938V173.548H567.335C575.798 173.608 582.399 176.443 587.138 182.051C591.945 187.66 594.348 196.495 594.348 208.556V224.296C594.348 236.177 592.012 245.102 587.341 251.072C582.737 256.983 576.068 259.938 567.335 259.938H554.133Z" fill="#181818" /><path d="M643.877 247.183C643.877 259.304 648.921 268.471 659.009 274.683C669.096 280.894 681.96 284 697.599 284C713.238 284 725.864 280.502 735.478 273.507C745.159 266.451 750 256.771 750 244.469C750 233.433 746.717 224.537 740.149 217.783C733.582 210.968 722.987 205.541 708.363 201.5C697.26 198.364 689.61 195.56 685.412 193.087C681.283 190.615 679.218 187.539 679.218 183.86C679.218 179.941 680.572 176.744 683.28 174.272C686.056 171.799 690.558 170.563 696.786 170.563C702.541 170.563 706.942 171.98 709.988 174.814C713.103 177.589 714.66 181.509 714.66 186.574V190.012H746.852V184.041C746.852 172.704 742.147 163.989 732.736 157.898C723.393 151.807 711.173 148.762 696.075 148.762C680.775 148.762 668.555 152.139 659.415 158.893C650.275 165.648 645.705 174.875 645.705 186.574C645.705 196.887 649.124 205.39 655.962 212.084C662.8 218.778 673.869 224.387 689.17 228.91C699.664 232.046 706.84 234.94 710.699 237.594C714.558 240.247 716.488 243.534 716.488 247.454C716.488 252.218 714.795 255.987 711.41 258.762C708.092 261.475 703.32 262.832 697.091 262.832C690.592 262.832 685.514 261.325 681.858 258.309C678.27 255.294 676.51 250.65 676.577 244.378V239.584H643.877V247.183Z" fill="#181818" /><path d="M0 135.238H35.972L46.5103 80.6227H90.8926L95.4525 56.7517H51.0701L56.9472 26.1931H107.916L112.982 0H26.0417L0 135.238Z" fill="#181818" /><path d="M100.693 135.238H137.172L163.214 0H126.735L100.693 135.238Z" fill="#181818" /><path d="M171.393 26.1931H209.999L189.024 135.238H225.503L246.478 26.1931H284.882L289.948 0H176.459L171.393 26.1931Z" fill="#181818" /></svg>
          <svg className="background-logo__icon" aria-hidden="true" width="343" height="343" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 30C16.5667 30 30 43.4333 30 60V30H60C43.4333 30 30 16.5667 30 0C30 16.5667 16.5667 30 0 30Z" fill="#181818" /><path d="M30 60C30 43.4333 16.5667 30 0 30V60H30Z" fill="#C5EC2A" /><path d="M30 60C46.5667 60 60 46.5667 60 30H30V60Z" fill="#C5EC2A" /><path d="M30 0C30 16.5667 16.5667 30 0 30V0H30Z" fill="#C5EC2A" /><path d="M60 30C43.4333 30 30 16.5667 30 0H60V30Z" fill="#C5EC2A" /></svg>
        </div>
        <div className="popup-form popup-form--questionnaire-coach">
          <div className="popup-form__wrapper">
            <div className="popup-form__content">
              <div className="popup-form__form">
                <form method="get">
                  <div className="questionnaire-coach">
                    <h1 className="visually-hidden">Опросник</h1>
                    <div className="questionnaire-coach__wrapper">
                      <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваша специализация
                        (тип) тренировок</span>
                        <div className="specialization-checkbox questionnaire-coach__specializations">
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="specialization" value="yoga"
                                checked={state.specialization.includes('yoga')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Йога</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="specialization" value="running"
                                checked={state.specialization.includes('running')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Бег</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="specialization" value="power"
                                checked={state.specialization.includes('power')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Силовые</span>
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
                              <input className="visually-hidden" type="checkbox" name="specialization" value="crossfit"
                                checked={state.specialization.includes('crossfit')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Кроссфит</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="specialization" value="boxing"
                                checked={state.specialization.includes('boxing')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Бокс</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="specialization" value="pilates"
                                checked={state.specialization.includes('pilates')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Пилатес</span>
                            </label>
                          </div>
                          <div className="btn-checkbox">
                            <label>
                              <input className="visually-hidden" type="checkbox" name="specialization" value="stretching"
                                checked={state.specialization.includes('stretching')} onClick={specializationRadioButtonClickHandler} />
                              <span className="btn-checkbox__btn">Стрейчинг</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваш уровень</span>
                        <div className="custom-toggle-radio custom-toggle-radio--big questionnaire-coach__radio">
                        <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="level" value={'beginner'} checked={state.level === 'beginner' ?? true} onClick={levelRadioButtonClickHandler} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">Новичок</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="level" value={'amature'} checked={state.level === 'amature' ?? true} onClick={levelRadioButtonClickHandler} /><span
                                className="custom-toggle-radio__icon"></span><span
                                  className="custom-toggle-radio__label">Любитель</span>
                            </label>
                          </div>
                          <div className="custom-toggle-radio__block">
                            <label>
                              <input type="radio" name="level" value={'professional'} checked={state.level === 'professional' ?? true} onClick={levelRadioButtonClickHandler} />
                              <span className="custom-toggle-radio__icon"></span>
                              <span className="custom-toggle-radio__label">Профессионал</span>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="questionnaire-coach__block"><span className="questionnaire-coach__legend">Ваши дипломы и
                        сертификаты</span>
                        <div className="drag-and-drop questionnaire-coach__drag-and-drop">
                          <label>
                            <span className="drag-and-drop__label" tabIndex={0}>Загрузите сюда файлы формата PDF, JPG или
                              PNG
                              <svg width="20" height="20" aria-hidden="true" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21H14C19 21 21 19 21 14V9M17 1V7M17 7L19 5M17 7L15 5M1.67 17.95L6.6 14.64C7.39 14.11 8.53 14.17 9.24 14.78L9.57 15.07C10.35 15.74 11.61 15.74 12.39 15.07L16.55 11.5C17.33 10.83 18.59 10.83 19.37 11.5L21 12.9M10 7C10 8.10457 9.10457 9 8 9C6.89543 9 6 8.10457 6 7C6 5.89543 6.89543 5 8 5C9.10457 5 10 5.89543 10 7Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </span>
                            <input type="file" name="import" tabIndex={-1} accept=".pdf, .jpg, .png" />
                          </label>
                        </div>
                      </div>
                      <div className="questionnaire-coach__block" /><span className="questionnaire-coach__legend">Расскажите о своём
                        опыте, который мы сможем проверить</span>
                      <div className="custom-textarea questionnaire-coach__textarea">
                        <label>
                          <textarea name="description" placeholder=" " value={state.merits} onChange={descriptionFieldChangeHandler}></textarea>
                        </label>
                      </div>
                      <div className="questionnaire-coach__checkbox">
                        <label>
                          <input type="checkbox" value="individual-training" name="individual-training" />
                          <span className="questionnaire-coach__checkbox-icon">
                            <svg aria-hidden="true" width="9" height="6" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.99647 7L10 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </span>
                          <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <button className="btn questionnaire-coach__button" type="submit">Продолжить</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
