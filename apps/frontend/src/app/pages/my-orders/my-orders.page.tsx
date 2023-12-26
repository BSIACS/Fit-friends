import { useEffect, useState } from 'react';
import { HeaderComponent } from '../../components/header/header.component'
import { LoaderComponent } from '../../components/loader/loader.component'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getOrdersByTrainerIdDataThunk } from '../../store/slices/application.thunk';
import { OrderComponent } from '../../components/order/order.component';
import { SortEnum } from '../../types/sort.enum';
import { AppRoutes } from '../../constants/app-routes.constants';
import { Link } from 'react-router-dom';

enum SortByEnum {
  SUM = 'SUM',
  QUANTITY = 'QUANTITY',
}

const DEFAULT_SORT_BY = SortByEnum.SUM;
const DEFAULT_SUM_SORT_DIRECTION = SortEnum.DESC;
const DEFAULT_QUANTITY_SORT_DIRECTION = SortEnum.ASC;
const DEFAULT_ORDERS_PER_PAGE = 6;


export function MyOrdersPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.application.actualOrdersData);
  const [sortBy, setSortBy] = useState<SortByEnum>(DEFAULT_SORT_BY);
  const [sumSortDirection, setSumSortDirection] = useState<SortEnum>(DEFAULT_SUM_SORT_DIRECTION);
  const [quantitySortDirection, setQuantitySortDirection] = useState<SortEnum>(DEFAULT_QUANTITY_SORT_DIRECTION);


  useEffect(() => {
    dispatch(getOrdersByTrainerIdDataThunk(`?sortBy=${sortBy}&sortDirection=${sumSortDirection}&ordersPerPage=${DEFAULT_ORDERS_PER_PAGE}&pageNumber=${1}`));
  }, []);

  //#region HANDLERS

  const sortBySumAscendingButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSumSortDirection(SortEnum.DESC);
    dispatch(getOrdersByTrainerIdDataThunk(`?sortBy=${SortByEnum.SUM}&sortDirection=${SortEnum.DESC}&ordersPerPage=${DEFAULT_ORDERS_PER_PAGE}&pageNumber=${1}`));
  }

  const sortBySumDescendingButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSumSortDirection(SortEnum.ASC);
    dispatch(getOrdersByTrainerIdDataThunk(`?sortBy=${SortByEnum.SUM}&sortDirection=${SortEnum.ASC}&ordersPerPage=${DEFAULT_ORDERS_PER_PAGE}&pageNumber=${1}`));
  }

  const sortByQuantityAscendingButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setQuantitySortDirection(SortEnum.DESC);
    dispatch(getOrdersByTrainerIdDataThunk(`?sortBy=${SortByEnum.SUM}&sortDirection=${SortEnum.DESC}&ordersPerPage=${DEFAULT_ORDERS_PER_PAGE}&pageNumber=${1}`));
  }

  const sortByQuantityDescendingButtonClick = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setQuantitySortDirection(SortEnum.ASC);
    dispatch(getOrdersByTrainerIdDataThunk(`?sortBy=${SortByEnum.SUM}&sortDirection=${SortEnum.ASC}&ordersPerPage=${DEFAULT_ORDERS_PER_PAGE}&pageNumber=${1}`));
  }

  //#endregion

  return (
    <div className="wrapper">
      <HeaderComponent />
      <LoaderComponent isHidden={true} />
      <main>
        <section className="my-orders">
          <div className="container">
            <div className="my-orders__wrapper">
              <Link className="btn-flat btn-flat--underlined my-orders__back" to={AppRoutes.TRAINER_ACCOUNT}>
                <svg width="14" height="10" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
                <span>Назад</span>
              </Link>
              <div className="my-orders__title-wrapper">
                <h1 className="my-orders__title">Мои заказы</h1>
                <div className="sort-for">
                  <p>Сортировать по:</p>
                  <div className="sort-for__btn-container">
                    {
                      sumSortDirection === SortEnum.DESC &&
                      <button className="btn-filter-sort" type="button"
                        onClick={sortBySumDescendingButtonClick}><span>Сумме</span>
                        <svg width="16" height="10" aria-hidden="true" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1H17H1Z" fill="#8E8E8E" /><path d="M1 6H13H1Z" fill="#8E8E8E" /><path d="M1 11H7H1Z" fill="#8E8E8E" /><path d="M1 1H17M1 6H13M1 11H7" stroke="currentColor" stroke-linecap="round" /></svg>
                      </button>
                    }
                    {
                      sumSortDirection === SortEnum.ASC &&
                      <button className="btn-filter-sort" type="button"
                        onClick={sortBySumAscendingButtonClick}><span>Сумме</span>
                        <svg width="16" height="10" aria-hidden="true" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11H17M1 6H13M1 1H7" stroke="currentColor" stroke-linecap="round" /></svg>
                      </button>
                    }
                    {
                      quantitySortDirection === SortEnum.ASC &&
                      <button className="btn-filter-sort" type="button"
                        onClick={sortByQuantityAscendingButtonClick}><span>Количеству</span>
                        <svg width="16" height="10" aria-hidden="true" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 11H17M1 6H13M1 1H7" stroke="currentColor" stroke-linecap="round" /></svg>
                      </button>
                    }
                    {
                      quantitySortDirection === SortEnum.DESC &&
                      <button className="btn-filter-sort" type="button"
                        onClick={sortByQuantityDescendingButtonClick}><span>Количеству</span>
                        <svg width="16" height="10" aria-hidden="true" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1H17H1Z" fill="#8E8E8E" /><path d="M1 6H13H1Z" fill="#8E8E8E" /><path d="M1 11H7H1Z" fill="#8E8E8E" /><path d="M1 1H17M1 6H13M1 11H7" stroke="currentColor" stroke-linecap="round" /></svg>

                      </button>
                    }
                  </div>
                </div>
              </div>
              <ul className="my-orders__list">
                {
                  orders &&
                  orders.map((order) =>
                    <OrderComponent key={order.id} order={order} />
                  )
                }
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
