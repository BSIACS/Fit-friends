import { useState } from 'react';
import { PaymentMethodEnum } from '../../types/payment-method.enum';
import styles from './popup-buy.module.css';
import { UUID } from '../../types/uuid.type';

type PopupFeedbackComponentProps = {
  trainingId: UUID;
  name: string;
  price: string;
  imageName: string;
  isActive: boolean;
  setIsPopupActive: React.Dispatch<React.SetStateAction<boolean>>;
  handleBuyButtonClick: (paymentMethod: string, quantity: number) => Promise<void>;
}

export function PopupBuyComponent({ trainingId, name, price, imageName, isActive, setIsPopupActive, handleBuyButtonClick }: PopupFeedbackComponentProps): JSX.Element {
  const [paymentMethod, setPaymentMethod] = useState(PaymentMethodEnum.VISA);
  const [purchaseNumber, setPurchaseNumber] = useState<number>(1);

  const closeButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsPopupActive(false);
  }

  const incrementCountButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setPurchaseNumber(purchaseNumber + 1);
  }

  const decrementCountButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(purchaseNumber <= 1){
      return;
    }
    setPurchaseNumber(purchaseNumber - 1);
  }

  const paymentMethodInputChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.currentTarget.checked = true;
    setPaymentMethod(evt.currentTarget.value as PaymentMethodEnum);
  }

  const buyButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleBuyButtonClick(paymentMethod, purchaseNumber);
  }

  return (
    <div className={`popup-form popup-form--buy ${styles.popupFixed} ${isActive ? styles.visible : styles.invisible}`}>
      <section className="popup">
        <div className="popup__wrapper">
          <div className="popup-head">
            <h2 className="popup-head__header">Купить тренировку</h2>
            <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={closeButtonClickHandler}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L21 21M1 21L21 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
          <div className="popup__content popup__content--purchases">
            <div className="popup__product">
              <div className="popup__product-image">
                <picture>
                  <source type="image/webp"
                    srcSet={`http://localhost:3042/assets/training-data/${trainingId}/${imageName}`} />
                  <img src={`http://localhost:3042/assets/training-data/${trainingId}/${imageName}`} srcSet={`http://localhost:3042/assets/training-data/${trainingId}/${imageName}`}
                    width="98" height="80" alt="" />
                </picture>
              </div>
              <div className="popup__product-info">
                <h3 className="popup__product-title">{name}</h3>
                <p className="popup__product-price">{price} ₽</p>
              </div>
              <div className="popup__product-quantity">
                <p className="popup__quantity">Количество</p>
                <div className="input-quantity">
                  <button className="btn-icon btn-icon--quantity" onClick={decrementCountButtonClickHandler} type="button" aria-label="minus">
                    <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1H13" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <div className="input-quantity__input">
                    <label>
                      <input type="text" value={purchaseNumber} size={2} readOnly={true} />
                    </label>
                  </div>
                  <button className="btn-icon btn-icon--quantity" onClick={incrementCountButtonClickHandler} type="button" aria-label="plus">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7H13M7 13V1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
              </div>
            </div>
            <section className="payment-method">
              <h4 className="payment-method__title">Выберите способ оплаты</h4>
              <ul className="payment-method__list">
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input type="radio" name="payment-purchases" aria-label="Visa." value={PaymentMethodEnum.VISA} onChange={paymentMethodInputChanged} />
                      <span className="btn-radio-image__image" hidden={paymentMethod !== PaymentMethodEnum.VISA}>
                        {paymentMethod === PaymentMethodEnum.VISA && <svg width="58" height="20" viewBox="0 0 58 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.5006 19.8442H9.48107L5.71703 4.32879C5.53838 3.61508 5.15904 2.98412 4.60104 2.68674C3.20849 1.93942 1.67399 1.34466 0 1.0447V0.447351H8.08608C9.20207 0.447351 10.0391 1.34466 10.1786 2.38678L12.1316 13.5786L17.1487 0.447351H22.0287L14.5006 19.8442ZM24.8187 19.8442H20.0782L23.9817 0.447351H28.7222L24.8187 19.8442ZM34.8553 5.82087C34.9948 4.77617 35.8318 4.17882 36.8083 4.17882C38.3428 4.02884 40.0144 4.32881 41.4094 5.07355L42.2464 0.897309C40.8514 0.299965 39.3169 0 37.9243 0C33.3233 0 29.9753 2.68676 29.9753 6.41563C29.9753 9.25237 32.3468 10.7419 34.0208 11.6392C35.8318 12.5339 36.5293 13.1312 36.3898 14.026C36.3898 15.368 34.9948 15.9654 33.6023 15.9654C31.9283 15.9654 30.2543 15.518 28.7222 14.7707L27.8852 18.9495C29.5592 19.6943 31.3703 19.9942 33.0443 19.9942C38.2033 20.1416 41.4094 17.4574 41.4094 13.4286C41.4094 8.35506 34.8553 8.05768 34.8553 5.82087ZM58 19.8442L54.236 0.447351H50.1929C49.3559 0.447351 48.5189 1.0447 48.2399 1.93942L41.2698 19.8442H46.1499L47.1239 17.0101H53.12L53.678 19.8442H58ZM50.8904 5.6709L52.283 12.9813H48.3794L50.8904 5.6709Z" fill="#172B85" /></svg>}
                        {paymentMethod !== PaymentMethodEnum.VISA && <svg width="58" height="20" viewBox="0 0 58 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14.5006 19.8442H9.48107L5.71703 4.32879C5.53838 3.61508 5.15904 2.98412 4.60104 2.68674C3.20849 1.93942 1.67399 1.34466 0 1.0447V0.447351H8.08608C9.20207 0.447351 10.0391 1.34466 10.1786 2.38678L12.1316 13.5786L17.1487 0.447351H22.0287L14.5006 19.8442ZM24.8187 19.8442H20.0782L23.9817 0.447351H28.7222L24.8187 19.8442ZM34.8553 5.82087C34.9948 4.77617 35.8318 4.17882 36.8083 4.17882C38.3428 4.02884 40.0144 4.32881 41.4094 5.07355L42.2464 0.897309C40.8514 0.299965 39.3169 0 37.9243 0C33.3233 0 29.9753 2.68676 29.9753 6.41563C29.9753 9.25237 32.3468 10.7419 34.0208 11.6392C35.8318 12.5339 36.5293 13.1312 36.3898 14.026C36.3898 15.368 34.9948 15.9654 33.6023 15.9654C31.9283 15.9654 30.2543 15.518 28.7222 14.7707L27.8852 18.9495C29.5592 19.6943 31.3703 19.9942 33.0443 19.9942C38.2033 20.1416 41.4094 17.4574 41.4094 13.4286C41.4094 8.35506 34.8553 8.05768 34.8553 5.82087ZM58 19.8442L54.236 0.447351H50.1929C49.3559 0.447351 48.5189 1.0447 48.2399 1.93942L41.2698 19.8442H46.1499L47.1239 17.0101H53.12L53.678 19.8442H58ZM50.8904 5.6709L52.283 12.9813H48.3794L50.8904 5.6709Z" fill="#333333" /></svg>}
                      </span>
                    </label>
                  </div>
                </li>
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input type="radio" name="payment-purchases" aria-label="Мир." value={PaymentMethodEnum.MIR} onChange={paymentMethodInputChanged} />
                      <span className="btn-radio-image__image">
                        {paymentMethod === PaymentMethodEnum.MIR && <svg width="66" height="20" viewBox="0 0 66 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M17.7849 3.80523e-07V0.008734C17.7768 0.008734 15.2069 3.33161e-07 14.5216 2.62882C13.8934 5.0393 12.1231 11.6943 12.0742 11.8777H11.5847C11.5847 11.8777 9.77355 5.07424 9.13721 2.62009C8.45192 -0.00873332 5.87392 3.80523e-07 5.87392 3.80523e-07H0V20H5.87392V8.12227H6.36341L9.78986 20H13.869L17.2954 8.131H17.7849V20H23.6588V3.80523e-07H17.7849Z" fill="#4DB45E" /><path fillRule="evenodd" clipRule="evenodd" d="M39.241 0C39.241 0 37.5197 0.165939 36.712 2.09607L32.5513 11.8777H32.0618V0H26.1879V20H31.7355C31.7355 20 33.5384 19.8253 34.3461 17.9039L38.4252 8.12227H38.9147V20H44.7886V0H39.241Z" fill="#4DB45E" /><path fillRule="evenodd" clipRule="evenodd" d="M47.3993 9.08297V20H53.2732V13.6245H59.6366C62.4104 13.6245 64.76 11.7293 65.6329 9.08297H47.3993Z" fill="#4DB45E" /><path fillRule="evenodd" clipRule="evenodd" d="M59.6366 0H46.5753C47.2279 3.80786 49.8957 6.86463 53.3466 7.86026C54.1298 8.08734 54.9538 8.20961 55.8022 8.20961H65.8695C65.9592 7.75546 66 7.29258 66 6.81223C66 3.04803 63.1528 0 59.6366 0Z" fill="url(#paint0_linear_124_818)" /><defs><linearGradient id="paint0_linear_124_818" x1="46.5769" y1="4.1048" x2="66" y2="4.1048" gradientUnits="userSpaceOnUse"><stop offset="0.3" stop-color="#00B4E6" /><stop offset="1" stop-color="#088CCB" /></linearGradient></defs></svg>}
                        {paymentMethod !== PaymentMethodEnum.MIR &&
                          <svg width="66" height="20" viewBox="0 0 66 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                              d="M17.7849 3.80523e-07V0.008734C17.7768 0.008734 15.2069 3.33161e-07 14.5216 2.62882C13.8934 5.0393 12.1231 11.6943 12.0742 11.8777H11.5847C11.5847 11.8777 9.77355 5.07424 9.13721 2.62009C8.45192 -0.00873332 5.87392 3.80523e-07 5.87392 3.80523e-07H0V20H5.87392V8.12227H6.36341L9.78986 20H13.869L17.2954 8.131H17.7849V20H23.6588V3.80523e-07H17.7849Z"
                              fill="#333333" />
                            <path fillRule="evenodd" clipRule="evenodd"
                              d="M39.241 0C39.241 0 37.5197 0.165939 36.712 2.09607L32.5513 11.8777H32.0618V0H26.1879V20H31.7355C31.7355 20 33.5384 19.8253 34.3461 17.9039L38.4252 8.12227H38.9147V20H44.7886V0H39.241Z"
                              fill="#333333" />
                            <path fillRule="evenodd" clipRule="evenodd"
                              d="M47.3993 9.08297V20H53.2732V13.6245H59.6366C62.4104 13.6245 64.76 11.7293 65.6329 9.08297H47.3993Z"
                              fill="#333333" />
                            <path fillRule="evenodd" clipRule="evenodd"
                              d="M59.6366 0H46.5753C47.2279 3.80786 49.8957 6.86463 53.3466 7.86026C54.1298 8.08734 54.9538 8.20961 55.8022 8.20961H65.8695C65.9592 7.75546 66 7.29258 66 6.81223C66 3.04803 63.1528 0 59.6366 0Z"
                              fill="#333333" />
                          </svg>}
                      </span>
                    </label>
                  </div>
                </li>
                <li className="payment-method__item">
                  <div className="btn-radio-image">
                    <label>
                      <input type="radio" name="payment-purchases" aria-label="Iomoney." value={PaymentMethodEnum.UMONEY} onChange={paymentMethodInputChanged} />
                      <span className="btn-radio-image__image">
                        {paymentMethod === PaymentMethodEnum.UMONEY && <svg width="106" height="24" viewBox="0 0 106 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M93.1269 12.0691C93.1269 9.12539 90.9406 6.74414 87.8526 6.74414C84.8257 6.74414 82.6704 9.03389 82.6704 12.1801C82.6704 15.3421 84.8868 17.6476 88.0668 17.6476C90.0845 17.6476 91.7813 16.7281 92.8361 14.8591L90.6962 13.8466C90.192 14.7811 89.0908 15.3886 88.0668 15.3886C86.7676 15.3886 85.2696 14.3919 85.1776 13.0059H93.0503C93.1005 12.6962 93.1261 12.383 93.1269 12.0691ZM85.2232 11.1691C85.4073 9.76739 86.3547 8.84864 87.8681 8.84864C89.3661 8.84864 90.2833 9.74864 90.4055 11.1691H85.2232Z" fill="black" /><path d="M63.6579 6.7417C60.5545 6.7417 58.3535 9.01645 58.3535 12.2249C58.3535 15.4019 60.5545 17.6452 63.6889 17.6452C66.8379 17.6452 69.0389 15.4019 69.0389 12.2714C69.0389 9.0472 66.7768 6.7417 63.6579 6.7417ZM63.6889 15.2617C62.129 15.2617 61.1662 14.0782 61.1662 12.2399C61.1662 10.3709 62.1445 9.0937 63.6889 9.0937C65.2479 9.0937 66.2262 10.3552 66.2262 12.2399C66.2262 14.0939 65.2634 15.2617 63.6889 15.2617Z" fill="black" /><path d="M52.6076 6.74481C51.3363 6.74481 50.3786 7.18731 49.421 8.28456H49.1066C48.4633 7.29381 47.4136 6.74481 46.2358 6.74481C45.6478 6.73895 45.0668 6.87549 44.5406 7.14319C44.0145 7.41088 43.5583 7.80208 43.2097 8.28456H42.8953L42.8799 8.26956V6.95856H40.249V17.4166H43.0919V12.0346C43.0919 10.2968 43.8103 9.27531 45.0521 9.27531C46.2042 9.27531 46.9521 10.1446 46.9521 11.4706V17.4166H49.8096V12.0346C49.8096 10.3096 50.5281 9.27531 51.7854 9.27531C52.9219 9.27531 53.6551 10.1446 53.6551 11.4863V17.4166H56.5134V11.1353C56.5134 8.40681 55.0765 6.74481 52.6076 6.74481Z" fill="black" /><path d="M99.4489 13.7893H99.2457C99.2457 13.6033 98.0061 10.2913 97.1934 8.2393L96.6855 6.95605H93.8213L97.8846 17.4508L96.2836 21.4498H99.1279L104.979 6.9598H102.114L101.646 8.05705L100.061 12.0523C99.6145 13.1683 99.4312 13.6858 99.4489 13.7893Z" fill="black" /><path d="M76.9237 6.74463C75.6517 6.74463 74.5593 7.30863 73.8261 8.31513H73.5265L73.4971 8.30013V6.95838H70.8647V17.4164H73.7076V12.0651C73.7076 10.3581 74.5173 9.29013 75.8475 9.29013C77.0893 9.29013 78.0021 10.2351 78.0021 11.7291V17.4156H80.8449V11.1051C80.8449 8.54388 79.199 6.74463 76.9237 6.74463Z" fill="black" /><path d="M20.9415 0.75C14.7994 0.75 9.86377 5.8125 9.86377 12C9.86377 18.2385 14.848 23.25 20.94 23.25C27.0321 23.25 32.0207 18.1875 32.0207 12C32.0207 5.8125 27.0336 0.75 20.9415 0.75ZM20.9415 16.1933C18.6758 16.1933 16.8134 14.301 16.8134 12C16.8134 9.699 18.6758 7.80675 20.9415 7.80675C23.2073 7.80675 25.0704 9.699 25.0704 12C25.0196 14.301 23.2073 16.1933 20.9415 16.1933Z" fill="#8B3FFD" /><path d="M9.86375 4.01855V20.3821H5.93881L0.903809 4.01855H9.86375Z" fill="#8B3FFD" /></svg>}
                        {paymentMethod !== PaymentMethodEnum.UMONEY && <svg width="106" height="24" viewBox="0 0 106 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M93.1269 12.0691C93.1269 9.12539 90.9406 6.74414 87.8526 6.74414C84.8257 6.74414 82.6704 9.03389 82.6704 12.1801C82.6704 15.3421 84.8868 17.6476 88.0668 17.6476C90.0845 17.6476 91.7813 16.7281 92.8361 14.8591L90.6962 13.8466C90.192 14.7811 89.0908 15.3886 88.0668 15.3886C86.7676 15.3886 85.2696 14.3919 85.1776 13.0059H93.0503C93.1005 12.6962 93.1261 12.383 93.1269 12.0691ZM85.2232 11.1691C85.4073 9.76739 86.3547 8.84864 87.8681 8.84864C89.3661 8.84864 90.2833 9.74864 90.4055 11.1691H85.2232Z" fill="black" /><path d="M63.6579 6.7417C60.5545 6.7417 58.3535 9.01645 58.3535 12.2249C58.3535 15.4019 60.5545 17.6452 63.6889 17.6452C66.8379 17.6452 69.0389 15.4019 69.0389 12.2714C69.0389 9.0472 66.7768 6.7417 63.6579 6.7417ZM63.6889 15.2617C62.129 15.2617 61.1662 14.0782 61.1662 12.2399C61.1662 10.3709 62.1445 9.0937 63.6889 9.0937C65.2479 9.0937 66.2262 10.3552 66.2262 12.2399C66.2262 14.0939 65.2634 15.2617 63.6889 15.2617Z" fill="black" /><path d="M52.6076 6.74481C51.3363 6.74481 50.3786 7.18731 49.421 8.28456H49.1066C48.4633 7.29381 47.4136 6.74481 46.2358 6.74481C45.6478 6.73895 45.0668 6.87549 44.5406 7.14319C44.0145 7.41088 43.5583 7.80208 43.2097 8.28456H42.8953L42.8799 8.26956V6.95856H40.249V17.4166H43.0919V12.0346C43.0919 10.2968 43.8103 9.27531 45.0521 9.27531C46.2042 9.27531 46.9521 10.1446 46.9521 11.4706V17.4166H49.8096V12.0346C49.8096 10.3096 50.5281 9.27531 51.7854 9.27531C52.9219 9.27531 53.6551 10.1446 53.6551 11.4863V17.4166H56.5134V11.1353C56.5134 8.40681 55.0765 6.74481 52.6076 6.74481Z" fill="black" /><path d="M99.4489 13.7893H99.2457C99.2457 13.6033 98.0061 10.2913 97.1934 8.2393L96.6855 6.95605H93.8213L97.8846 17.4508L96.2836 21.4498H99.1279L104.979 6.9598H102.114L101.646 8.05705L100.061 12.0523C99.6145 13.1683 99.4312 13.6858 99.4489 13.7893Z" fill="black" /><path d="M76.9237 6.74463C75.6517 6.74463 74.5593 7.30863 73.8261 8.31513H73.5265L73.4971 8.30013V6.95838H70.8647V17.4164H73.7076V12.0651C73.7076 10.3581 74.5173 9.29013 75.8475 9.29013C77.0893 9.29013 78.0021 10.2351 78.0021 11.7291V17.4156H80.8449V11.1051C80.8449 8.54388 79.199 6.74463 76.9237 6.74463Z" fill="black" /><path d="M20.9415 0.75C14.7994 0.75 9.86377 5.8125 9.86377 12C9.86377 18.2385 14.848 23.25 20.94 23.25C27.0321 23.25 32.0207 18.1875 32.0207 12C32.0207 5.8125 27.0336 0.75 20.9415 0.75ZM20.9415 16.1933C18.6758 16.1933 16.8134 14.301 16.8134 12C16.8134 9.699 18.6758 7.80675 20.9415 7.80675C23.2073 7.80675 25.0704 9.699 25.0704 12C25.0196 14.301 23.2073 16.1933 20.9415 16.1933Z" fill="#333333" /><path d="M9.86375 4.01855V20.3821H5.93881L0.903809 4.01855H9.86375Z" fill="#333333" /></svg>}
                      </span>
                    </label>
                  </div>
                </li>
              </ul>
            </section>
            <div className="popup__total">
              <p className="popup__total-text">Итого</p>
              <svg width="310" height="2" viewBox="0 0 310 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1L310 1.00003" stroke="#CFCFCF" strokeDasharray="4 4" /></svg>
              <p className="popup__total-price">{Number(price) * purchaseNumber}&nbsp;₽</p>
            </div>
            <div className="popup__button">
              <button className="btn" type="button" onClick={buyButtonClickHandler}>Купить</button>
            </div>
          </div>
        </div>
      </section >
    </div >
  )
}
