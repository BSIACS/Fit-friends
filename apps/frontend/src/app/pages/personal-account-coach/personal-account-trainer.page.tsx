import styles from './personal-account-trainer.module.css';
import { useEffect } from 'react';
import { HeaderComponent } from '../../components/header/header.component'
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getTrainerDetailThunk } from '../../store/slices/application.thunk';
import { setIsLoading } from '../../store/slices/application.slice';
import { Link, Navigate } from 'react-router-dom';
import { AppRoutes } from '../../constants/app-routes.constants';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { UUID } from '../../types/uuid.type';
import { TrainerFormInfoComponent } from './trainer-info-form/trainer-info-form.component';


export function PersonalAccountTrainerPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const trainer = useAppSelector(state => state.application.editTrainerFormData);
  const isBadRequest = useAppSelector(state => state.application.isBadRequest);
  const isPersonalAccountCoachPageDataLoading = useAppSelector(state => state.application.isPersonalAccountCoachPageDataLoading);

  useEffect(() => {
    dispatch(setIsLoading(true));
    dispatch(getTrainerDetailThunk());
  }, []);

  if (isBadRequest) {
    return <Navigate to={'/badRequest'} />;
  }

  return (
    <div className="wrapper">
      <HeaderComponent />
      <LoaderComponent isHidden={!isPersonalAccountCoachPageDataLoading} />
      <main>
        <section className="inner-page" >
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Личный кабинет</h1>
              {
                trainer &&
                <TrainerFormInfoComponent user={trainer} />
              }
              <div className="inner-page__content">
                <div className="personal-account-coach">
                  <div className="personal-account-coach__navigation">
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoutes.MY_TRAININGS}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true" viewBox="0 0 20 29" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.1227 12.6442H13.8758V2.20507C13.8758 -0.230712 12.6251 -0.72367 11.0995 1.10317L10 2.42256L0.695297 13.5866C-0.582897 15.1089 -0.0468803 16.3558 1.87728 16.3558H6.12419V26.7949C6.12419 29.2307 7.37489 29.7237 8.90048 27.8968L10 26.5774L19.3047 15.4134C20.5829 13.8911 20.0469 12.6442 18.1227 12.6442Z" fill="#333333" /></svg>
                      </div>
                      <span className="thumbnail-link__text">Мои тренировки</span>
                    </Link>
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoutes.CREATE_TRAINING}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.2956 0H8.71935C3.25662 0 0 3.255 0 8.715V21.27C0 26.745 3.25662 30 8.71935 30H21.2806C26.7433 30 29.9999 26.745 29.9999 21.285V8.715C30.015 3.255 26.7583 0 21.2956 0ZM21.0105 16.125H16.133V21C16.133 21.615 15.6228 22.125 15.0075 22.125C14.3922 22.125 13.8819 21.615 13.8819 21V16.125H9.00449C8.38918 16.125 7.87893 15.615 7.87893 15C7.87893 14.385 8.38918 13.875 9.00449 13.875H13.8819V9C13.8819 8.385 14.3922 7.875 15.0075 7.875C15.6228 7.875 16.133 8.385 16.133 9V13.875H21.0105C21.6258 13.875 22.136 14.385 22.136 15C22.136 15.615 21.6258 16.125 21.0105 16.125Z" fill="currentColor" /></svg>
                      </div>
                      <span className="thumbnail-link__text">Создать тренировку</span>
                    </Link>
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoutes.FRIEND_LIST_TRAINER}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" aria-hidden="true" viewBox="0 0 30 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 10.2951C24.7784 10.2951 26.6254 8.46058 26.6254 6.19756C26.6254 3.93454 24.7784 2.1 22.5 2.1C20.2216 2.1 18.3746 3.93454 18.3746 6.19756C18.3746 8.46058 20.2216 10.2951 22.5 10.2951Z" fill="currentColor" /><path d="M9.64286 10.2439C12.5722 10.2439 14.947 7.95073 14.947 5.12195C14.947 2.29318 12.5722 0 9.64286 0C6.71348 0 4.33876 2.29318 4.33876 5.12195C4.33876 7.95073 6.71348 10.2439 9.64286 10.2439Z" fill="currentColor" /><path d="M9.64286 12.8049C9.52291 12.8049 9.40347 12.8066 9.28457 12.8101C4.13499 12.9606 0 16.3425 0 20.4878C0 20.7746 0.23338 21 0.53041 21H18.7553C19.0523 21 19.2857 20.7746 19.2857 20.4878C19.2857 20.307 19.2778 20.1277 19.2624 19.95C19.2313 19.5927 19.1694 19.2422 19.0789 18.9C18.6759 17.3762 17.7048 16.0183 16.3515 14.973C14.6142 13.6312 12.247 12.8049 9.64286 12.8049Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M17.4923 13.9177C18.8214 12.9394 20.5777 12.3439 22.5 12.3439C26.6337 12.3439 30 15.0975 30 18.4902C30 18.7197 29.8185 18.9 29.5875 18.9H21.394C21.1529 16.8579 19.6704 15.0676 17.4923 13.9177ZM19.2624 19.95C19.2313 19.5927 19.1694 19.2422 19.0789 18.9C18.6759 17.3762 17.7048 16.0183 16.3515 14.973C14.6142 13.6312 12.247 12.8049 9.64286 12.8049C9.52291 12.8049 9.40347 12.8066 9.28457 12.8101C5.17731 13.6013 2.14286 16.2931 2.14286 19.489C2.14286 19.7472 2.37624 19.95 2.67327 19.95H19.2624Z" fill="currentColor" /></svg>
                      </div>
                      <span className="thumbnail-link__text">Мои друзья</span>
                    </Link>
                    <Link className="thumbnail-link thumbnail-link--theme-light" to={AppRoutes.MY_ORDERS}>
                      <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
                        <svg width="30" height="26" viewBox="0 0 26 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.7034 10.4423C23.7185 9.33242 22.2336 8.6875 20.1754 8.46252V7.32266C20.1754 5.2679 19.3227 3.28813 17.8232 1.90829C16.309 0.498454 14.339 -0.161468 12.2955 0.0335087C8.78186 0.378468 5.82688 3.84306 5.82688 7.59262V8.46252C3.76869 8.6875 2.28385 9.33242 1.29886 10.4423C-0.127173 12.0621 -0.0830689 14.2218 0.0786462 15.7217L1.10774 24.0757C1.41647 27.0004 2.57788 30 8.89947 30H17.1028C23.4244 30 24.5858 27.0004 24.8946 24.0907L25.9237 15.7067C26.0854 14.2218 26.1148 12.0621 24.7034 10.4423ZM12.5013 2.11826C13.9714 1.98328 15.3681 2.44823 16.456 3.45311C17.5292 4.44299 18.1319 5.85283 18.1319 7.32266V8.37253H7.87037V7.59262C7.87037 4.92294 10.0315 2.35824 12.5013 2.11826ZM7.73806 16.7266H7.72336C6.91478 16.7266 6.25322 16.0516 6.25322 15.2267C6.25322 14.4018 6.91478 13.7269 7.72336 13.7269C8.54664 13.7269 9.2082 14.4018 9.2082 15.2267C9.2082 16.0516 8.54664 16.7266 7.73806 16.7266ZM18.029 16.7266H18.0143C17.2057 16.7266 16.5442 16.0516 16.5442 15.2267C16.5442 14.4018 17.2057 13.7269 18.0143 13.7269C18.8376 13.7269 19.4992 14.4018 19.4992 15.2267C19.4992 16.0516 18.8376 16.7266 18.029 16.7266Z" fill="currentColor" /></svg>
                      </div>
                      <span className="thumbnail-link__text">Мои заказы</span>
                    </Link>
                    <div className="personal-account-coach__calendar">
                      <div className="thumbnail-spec-gym">
                        <div className="thumbnail-spec-gym__image">
                          <picture>
                            <source type="image/webp" srcSet="assets/img/content/thumbnails/nearest-gym-01.webp, img/content/thumbnails/nearest-gym-01@2x.webp 2x" />
                            <img src="assets/img/content/thumbnails/nearest-gym-01.jpg" srcSet="assets/img/content/thumbnails/nearest-gym-01@2x.jpg 2x" width="330" height="190" alt="" />
                          </picture>
                        </div>
                        <p className="thumbnail-spec-gym__type">Ближайший зал</p>
                        <div className="thumbnail-spec-gym__header" style={{ alignItems: 'center' }}>
                          <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CertificatesComponent trainerId={trainer.id as UUID} certificateFilesNames={trainer.certificateFilesNames as string[]}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div >
  );
}
