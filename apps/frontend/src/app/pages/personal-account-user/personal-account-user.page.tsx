import { useEffect } from 'react';
import { HeaderComponent } from '../../components/header/header.component';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getUserDetailThunk } from '../../store/slices/application.thunk';
import { setIsLoading } from '../../store/slices/application.slice';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../constants/app-routes.constants';
import { UUID } from '../../types/uuid.type';
import { LoaderComponent } from '../../components/loader/loader.component';
import { UserFormInfoComponent } from './user-info-form/user-info-form.component';
import { BadRequestPage } from '../bad-request/bad-request.page';
import { CaloriesScheduleComponent } from './calories-schedule/calories-schedule.component';


export function PersonalAccountUserPage(): JSX.Element {
  const authoriztionData = useAppSelector(state => state.authorization.authoriztionData);
  const isAuthoriztionDataLoading = useAppSelector(state => state.authorization.isLoading);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.application.editUserFormData);
  const isBadRequest = useAppSelector(state => state.application.isBadRequest);

  useEffect(() => {
    dispatch(setIsLoading(true));
  }, []);

  useEffect(() => {
    dispatch(getUserDetailThunk({ id: authoriztionData?.userId as UUID }));
  }, [isAuthoriztionDataLoading]);

  if (isBadRequest) {
    return <BadRequestPage />
  }

  return (
    <div className="wrapper">
      <LoaderComponent isHidden={!isAuthoriztionDataLoading && user !== undefined} />
      <HeaderComponent />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              {
                user &&
                <UserFormInfoComponent user={user} />
              }
              <div className="inner-page__content">
                <div className="personal-account-user">
                  {
                    user &&
                    <CaloriesScheduleComponent user={user} />
                  }
                  <div className="personal-account-user__additional-info">
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoutes.FRIEND_LIST_USER}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 10.2951C24.7784 10.2951 26.6254 8.46058 26.6254 6.19756C26.6254 3.93454 24.7784 2.1 22.5 2.1C20.2216 2.1 18.3746 3.93454 18.3746 6.19756C18.3746 8.46058 20.2216 10.2951 22.5 10.2951Z" fill="currentColor" /><path d="M9.64286 10.2439C12.5722 10.2439 14.947 7.95073 14.947 5.12195C14.947 2.29318 12.5722 0 9.64286 0C6.71348 0 4.33876 2.29318 4.33876 5.12195C4.33876 7.95073 6.71348 10.2439 9.64286 10.2439Z" fill="currentColor" /><path d="M9.64286 12.8049C9.52291 12.8049 9.40347 12.8066 9.28457 12.8101C4.13499 12.9606 0 16.3425 0 20.4878C0 20.7746 0.23338 21 0.53041 21H18.7553C19.0523 21 19.2857 20.7746 19.2857 20.4878C19.2857 20.307 19.2778 20.1277 19.2624 19.95C19.2313 19.5927 19.1694 19.2422 19.0789 18.9C18.6759 17.3762 17.7048 16.0183 16.3515 14.973C14.6142 13.6312 12.247 12.8049 9.64286 12.8049Z" fill="currentColor" /><path fillRule="evenodd" clipRule="evenodd" d="M17.4923 13.9177C18.8214 12.9394 20.5777 12.3439 22.5 12.3439C26.6337 12.3439 30 15.0975 30 18.4902C30 18.7197 29.8185 18.9 29.5875 18.9H21.394C21.1529 16.8579 19.6704 15.0676 17.4923 13.9177ZM19.2624 19.95C19.2313 19.5927 19.1694 19.2422 19.0789 18.9C18.6759 17.3762 17.7048 16.0183 16.3515 14.973C14.6142 13.6312 12.247 12.8049 9.64286 12.8049C9.52291 12.8049 9.40347 12.8066 9.28457 12.8101C5.17731 13.6013 2.14286 16.2931 2.14286 19.489C2.14286 19.7472 2.37624 19.95 2.67327 19.95H19.2624Z" fill="currentColor" /></svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoutes.MY_PURCHASES}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.4194 30C22.7996 30 23.9184 28.8939 23.9184 27.5294C23.9184 26.1649 22.7996 25.0588 21.4194 25.0588C20.0393 25.0588 18.9205 26.1649 18.9205 27.5294C18.9205 28.8939 20.0393 30 21.4194 30Z" fill="currentColor" /><path d="M9.99574 30C11.3759 30 12.4947 28.8939 12.4947 27.5294C12.4947 26.1649 11.3759 25.0588 9.99574 25.0588C8.61561 25.0588 7.4968 26.1649 7.4968 27.5294C7.4968 28.8939 8.61561 30 9.99574 30Z" fill="currentColor" /><path d="M5.12639 3.79765L4.84079 7.25647C4.78367 7.92 5.31202 8.47059 5.98316 8.47059H27.8453C28.445 8.47059 28.9448 8.01882 28.9876 7.42588C29.1733 4.92706 27.2455 2.89412 24.718 2.89412H7.16837C7.02558 2.27294 6.73998 1.68 6.29732 1.18588C5.58333 0.437647 4.58376 0 3.55563 0H1.07097C0.485507 0 0 0.48 0 1.05882C0 1.63765 0.485507 2.11765 1.07097 2.11765H3.55563C3.9983 2.11765 4.41241 2.30118 4.71228 2.61176C5.01215 2.93647 5.15495 3.36 5.12639 3.79765Z" fill="currentColor" /><path d="M27.5026 10.5882H5.59761C4.99787 10.5882 4.51236 11.04 4.45524 11.6188L3.94118 17.76C3.74126 20.1741 5.65473 22.2353 8.09655 22.2353H23.9755C26.1174 22.2353 28.0023 20.4988 28.1594 18.3812L28.6306 11.7882C28.6878 11.1388 28.1737 10.5882 27.5026 10.5882Z" fill="currentColor" /></svg>
                      </div>
                      <span className="thumbnail-link__text">Мои покупки</span>
                    </Link>
                    <div className="thumbnail-spec-gym">
                      <div className="thumbnail-spec-gym__image">
                        <picture>
                          <source type="image/webp"
                            srcSet="assets/img/content/thumbnails/nearest-gym-01.webp, assets/img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                          <img src="assets/img/content/thumbnails/nearest-gym-01.jpg"
                            srcSet="assets/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                        </picture>
                      </div>
                      {/* <p className="thumbnail-spec-gym__type">Ближайший зал</p> */}
                      <div className="thumbnail-spec-gym__header">
                        <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >
      </main >
    </div >
  );
}
