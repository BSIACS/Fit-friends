import { useEffect, useState } from 'react';
import styles from './popup-feedback.module.css';


type PopupFeedbackComponentProps = {
  isActive: boolean;
  setIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddReviewButtonClick: (rating: number, text: string) => Promise<void>;
}

export function PopupFeedbackComponent({ isActive, setIsPopupActive, handleAddReviewButtonClick }: PopupFeedbackComponentProps): JSX.Element {
  const [rateValue, setRateValue] = useState<number | undefined>();
  const [reviewText, setReviewText] = useState<string>('');
  const [rateValueError, setRateValueError] = useState({isError: false, message: 'Выберите значение'});
  const [reviewTextError, setReviewTextError] = useState({isError: false, message: 'Отзыв должен содержать минимум 140 символов'});


  const closeButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsPopupActive(false);
  }

  const sendReviewClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(!rateValue){
      return;
    }

    handleAddReviewButtonClick(rateValue, reviewText);
    setRateValue(undefined);
    setReviewText('');
  }

  const ratingInputChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.currentTarget.checked = true;
    setRateValue(Number(evt.currentTarget.value))
  }

  const reviewTextChanged = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(evt.currentTarget.value)
  }

  return (
    <section className={`${styles.popupFixed} ${isActive ? styles.visible : styles.invisible} popup`}>
      <div className="popup__wrapper">
        <div className="popup-head">
          <h2 className="popup-head__header">Оставить отзыв</h2>
          <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={closeButtonClickHandler}>
            <svg width="20" height="20" aria-hidden="true" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L21 21M1 21L21 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <div className="popup__content popup__content--feedback">
          <h3 className="popup__feedback-title">Оцените тренировку</h3>
          <ul className="popup__rate-list">
            <li className="popup__rate-item">
              <div className="popup__rate-item-wrap">
                <label>
                  <input type="radio" name="оценка тренировки" aria-label="оценка 1." value={1} onChange={ratingInputChanged}/><span
                    className="popup__rate-number">1</span>
                </label>
              </div>
            </li>
            <li className="popup__rate-item">
              <div className="popup__rate-item-wrap">
                <label>
                  <input type="radio" name="оценка тренировки" aria-label="оценка 2." value={2} onChange={ratingInputChanged}/><span
                    className="popup__rate-number">2</span>
                </label>
              </div>
            </li>
            <li className="popup__rate-item">
              <div className="popup__rate-item-wrap">
                <label>
                  <input type="radio" name="оценка тренировки" aria-label="оценка 3." value={3} onChange={ratingInputChanged}/><span
                    className="popup__rate-number">3</span>
                </label>
              </div>
            </li>
            <li className="popup__rate-item">
              <div className="popup__rate-item-wrap">
                <label>
                  <input type="radio" name="оценка тренировки" aria-label="оценка 4." value={4} onChange={ratingInputChanged}/><span
                    className="popup__rate-number">4</span>
                </label>
              </div>
            </li>
            <li className="popup__rate-item">
              <div className="popup__rate-item-wrap">
                <label>
                  <input type="radio" name="оценка тренировки" aria-label="оценка 5." value={5} onChange={ratingInputChanged}/><span
                    className="popup__rate-number">5</span>
                </label>
              </div>
            </li>
          </ul>
          <div className="popup__feedback">
            <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о
              тренировке</h3>
            <div className="popup__feedback-textarea">
              <div className="custom-textarea">
                <label>
                  <textarea name="description" value={reviewText} onChange={reviewTextChanged}></textarea>
                </label>
              </div>
            </div>
          </div>
          <div className="popup__button">
            <button className="btn" type="button" onClick={sendReviewClickHandler}>Продолжить</button>
          </div>
        </div>
      </div>
    </section>
  )
}
