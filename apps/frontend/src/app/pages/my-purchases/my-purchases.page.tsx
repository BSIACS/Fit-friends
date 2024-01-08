import { useEffect, useState } from 'react';
import { HeaderComponent } from '../../components/header/header.component';
import { BadRequestPage } from '../bad-request/bad-request.page';
import { useAppSelector } from '../../hooks/useAppSelector';
import { UserBalance } from '../../dto/user-balance.dto';
import { LoaderComponent } from '../../components/loader/loader.component';
import { TrainingListItemComponent } from '../../components/training-list-item/training-list-item.component';
import { TrainingDTO } from '../../dto/training.dto';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/app-routes.constants';
import { AuthorizationHeader, AxiosFactory } from '../../services/axios';


export function MyPurchasesPage(): JSX.Element {
  const authoriztionData = useAppSelector(state => state.authorization.authoriztionData);
  const isAuthoriztionDataLoading = useAppSelector(state => state.authorization.isLoading);
  const [userBalance, setUserBalance] = useState<UserBalance[] | undefined>(undefined);
  const [userBalanceToShow, setUserBalanceToShow] = useState<UserBalance[] | undefined>(undefined);
  const [isBalanceDataLoaded, setIsBalanceDataLoaded] = useState(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);

  useEffect(() => {
    getUserBalanceData();
  }, [authoriztionData]);

  const getUserBalanceData = async () => {
    try {
      setIsBalanceDataLoaded(false);

      const response = await AxiosFactory.createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS })
        .get<UserBalance[]>(`/userAccount/balance`);

      setUserBalance(response.data);
      setUserBalanceToShow(response.data);
      setIsBalanceDataLoaded(true);
    }
    catch (error) {
      setIsBalanceDataLoaded(true);
      setIsRequestError(true);
    }
  }

  const onlyActiveChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.currentTarget.checked) {
      setUserBalanceToShow(userBalance?.filter(item => item.remained > 0));
    }
    else {
      setUserBalanceToShow(userBalance);
    }
  }

  if (isRequestError) {
    return <BadRequestPage />
  }

  return (
    <div className="wrapper">
      <HeaderComponent />
      <LoaderComponent isHidden={!isAuthoriztionDataLoading && isBalanceDataLoaded} />
      <main>
        <section className="my-purchases">
          <div className="container">
            <div className="my-purchases__wrapper">
              <Link className="btn-flat my-purchases__back" to={AppRoutes.USER_ACCOUNT}>
                <svg width="16" height="12" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span>Назад</span>
              </Link>
              <div className="my-purchases__title-wrapper">
                <h1 className="my-purchases__title">Мои покупки</h1>
                <div className="my-purchases__controls">
                  <div className="custom-toggle custom-toggle--switch custom-toggle--switch-right my-purchases__switch"
                    data-validate-type="checkbox">
                    <label>
                      <input type="checkbox" value="user-agreement-1" name="user-agreement" onChange={onlyActiveChangeHandler} />
                      <span className="custom-toggle__icon">
                        <svg width="9" height="6" aria-hidden="true" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 4L3.99647 7L10 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      <span className="custom-toggle__label">Только активные</span>
                    </label>
                  </div>
                </div>
              </div>
              <ul className="my-purchases__list">
                {
                  userBalanceToShow &&
                  userBalanceToShow.map((item) =>
                    <TrainingListItemComponent key={item.id} training={item.training as TrainingDTO} />
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
