import { Link } from 'react-router-dom'
import { OrderDTO } from '../../dto/order.dto'
import { TrainingTypeEnum } from '../../types/training-type.enum'
import { getTypeTrainingTag } from '../../utils/view-transform'
import { AppRoutes } from '../../constants/app-routes.constants'


type OrderProps = {
  order: OrderDTO,
}


export function OrderComponent({ order }: OrderProps): JSX.Element {

  return (
    <li className="my-orders__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <img src={`http://localhost:3042/assets/training-data/${order.training?.id}/${order.training?.backgroundImgFileName}`}
                srcSet={`http://localhost:3042/assets/training-data/${order.training?.id}/${order.training?.backgroundImgFileName}`} width="330" height="190"
                alt="" />
            </picture>
          </div>
          <p className="thumbnail-training__price"><span
            className="thumbnail-training__price-value">{order.training?.price}</span><span>₽</span>
          </p>
          <h2 className="thumbnail-training__title">{order.training?.name}</h2>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>{getTypeTrainingTag(order.training?.trainingType as TrainingTypeEnum)}</span></div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag"><span>#{order.training?.calories}ккал</span></div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.38211 1.15534L10.79 3.9943C10.9819 4.3895 11.4939 4.76856 11.9258 4.84115L14.4775 5.2686C16.1094 5.54282 16.4933 6.73647 15.3175 7.914L13.3337 9.91417C12.9977 10.2529 12.8137 10.9062 12.9177 11.374L13.4857 13.85C13.9336 15.8098 12.9017 16.568 11.1819 15.5437L8.79017 14.1162C8.35822 13.8581 7.6463 13.8581 7.20635 14.1162L4.81461 15.5437C3.1028 16.568 2.06292 15.8018 2.51087 13.85L3.07881 11.374C3.18279 10.9062 2.99881 10.2529 2.66285 9.91417L0.679071 7.914C-0.4888 6.73647 -0.112841 5.54282 1.51898 5.2686L4.0707 4.84115C4.49465 4.76856 5.00659 4.3895 5.19857 3.9943L6.60642 1.15534C7.37433 -0.385114 8.62219 -0.385114 9.38211 1.15534Z" fill="currentColor" /></svg>
              <span className="thumbnail-training__rate-value">{order.training?.rating}</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">{order.training?.description}</p>
          </div>
          <Link className="btn-flat btn-flat--underlined thumbnail-training__button-orders" to={`${AppRoutes.TRAINING_CARD_TRAINER}/${order.training?.id}`}>
            <svg width="18" height="18" aria-hidden="true" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 5.8V9.8M8.99561 12.2H9.00279M9 17C13.4 17 17 13.4 17 9C17 4.6 13.4 1 9 1C4.6 1 1 4.6 1 9C1 13.4 4.6 17 9 17Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <span>Подробнее</span>
          </Link>
        </div>
        <div className="thumbnail-training__total-info">
          <div className="thumbnail-training__total-info-card">
            <svg width="32" height="32" aria-hidden="true" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.165 14.725H9.18999C8.24499 14.725 7.48001 15.49 7.48001 16.435V24.115H13.165V14.725Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /><path d="M17.1419 7.89996H14.8619C13.9169 7.89996 13.1519 8.66499 13.1519 9.60999V24.1H18.8369V9.60999C18.8369 8.66499 18.0869 7.89996 17.1419 7.89996Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /><path d="M22.8222 17.275H18.8472V24.1H24.5322V18.985C24.5172 18.04 23.7522 17.275 22.8222 17.275Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /><path d="M11.5 31H20.5C28 31 31 28 31 20.5V11.5C31 4 28 1 20.5 1H11.5C4 1 1 4 1 11.5V20.5C1 28 4 31 11.5 31Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <p className="thumbnail-training__total-info-value">{order.totalPurchased}</p>
            <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
          </div>
          <div className="thumbnail-training__total-info-card">
            <svg width="31" height="28" aria-hidden="true" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.95 9.41176H8.24999M28.55 17.1353C29.362 17.1047 30 16.4165 30 15.5753V12.4247C30 11.5835 29.362 10.8953 28.55 10.8647M28.55 17.1353H25.708C24.142 17.1353 22.7065 15.927 22.576 14.2753C22.489 13.3118 22.837 12.4094 23.446 11.7823C23.9825 11.2012 24.722 10.8647 25.534 10.8647H28.55M28.55 17.1353L28.55 19.3529C28.55 23.9412 25.65 27 21.3 27H8.24999C3.9 27 1 23.9412 1 19.3529V8.64706C1 4.48706 3.378 1.58117 7.07549 1.09176C7.45249 1.03058 7.84399 1 8.24999 1H21.3C21.677 1 22.0395 1.01528 22.3875 1.07645C26.1285 1.53528 28.55 4.45647 28.55 8.64706L28.55 10.8647" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <p className="thumbnail-training__total-info-value">{order.totalPaid}<span>₽</span></p>
            <p className="thumbnail-training__total-info-text">Общая сумма</p>
          </div>
        </div>
      </div>
    </li>
  )
}
