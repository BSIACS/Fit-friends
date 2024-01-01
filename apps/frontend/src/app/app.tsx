import { Route, Routes } from 'react-router-dom';
import { StartPage } from './pages/start/start.page';
import { SignInPage } from './pages/sign-in/sign-in.page';
import { refreshTokensPairThunk } from './store/slices/authorization.thunk';
import { useAppDispatch } from './hooks/useAppDispatch';
import { getRefreshToken } from './services/token';
import { useEffect } from 'react';
import { IndexPage } from './pages/index/index.page';
import { PrivateRouteComponent } from './components/private-route/private-route.component';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { SignUpPage } from './pages/sign-up/sign-up.page';
import { PersonalAccountTrainerPage } from './pages/personal-account-coach/personal-account-trainer.page';
import { QuestionnaireCoachPage } from './pages/questionnaire-coach/questionnaire-coach.page';
import { setIsLoading } from './store/slices/authorization.slice';
import { BadRequestPage } from './pages/bad-request/bad-request.page';
import { AppRoutes } from './constants/app-routes.constants';
import { TrainingCatalogPage } from './pages/training-catalog/training-catalog.page';
import { QuestionnaireUserPage } from './pages/questionnaire-user/questionnaire-user.page';
import { TrainingCardTrainerPage } from './pages/training-card-trainer/training-card-trainer.page';
import { TrainingCardUserPage } from './pages/training-card-user/training-card-user.page';
import { UsersCatalogPage } from './pages/users-catalog/users-catalog.page';
import { UserCardPage } from './pages/user-card/user-card.page';
import { UserCardTrainerPage } from './pages/user-card-trainer/user-card-trainer.page';
import { FriendsListUserPage } from './pages/friends-list-user/friends-list-user.page';
import { FriendsListTrainerPage } from './pages/friends-list-trainer/friends-list-trainer.page';
import { PersonalAccountUserPage } from './pages/personal-account-user/personal-account-user.page';
import { MyPurchasesPage } from './pages/my-purchases/my-purchases.page';
import { CreateTrainingPage } from './pages/create-training/create-training.page';
import { MyTrainingsPage } from './pages/my-trainings/my-trainings.page';
import { MyOrdersPage } from './pages/my-orders/my-orders.page';


export function App() {
  const dispatch = useAppDispatch();
  const refreshToken = getRefreshToken();

  console.log('getRefreshToken() - ', refreshToken);


  useEffect(() => {
    setIsLoading(true);
    dispatch(refreshTokensPairThunk({ refreshToken: refreshToken }));
  }, []);

  return (
    <Routes>
      <Route path={'/'} element={<StartPage />} />
      <Route path={AppRoutes.SIGN_IN} element={<SignInPage />} />
      <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
      <Route path={AppRoutes.INDEX} element={<PrivateRouteComponent validRole='user'><IndexPage /></PrivateRouteComponent>} />
      <Route path={AppRoutes.TRAINING_CATALOG} element={<PrivateRouteComponent validRole='user'><TrainingCatalogPage /></PrivateRouteComponent>} />
      <Route path={AppRoutes.TRAINER_ACCOUNT} element={<PrivateRouteComponent validRole='trainer'><PersonalAccountTrainerPage /></PrivateRouteComponent>} />
      <Route path={AppRoutes.CREATE_TRAINING} element={<PrivateRouteComponent validRole='trainer'><CreateTrainingPage /></PrivateRouteComponent>} />
      <Route path={AppRoutes.MY_TRAININGS} element={<PrivateRouteComponent validRole='trainer'><MyTrainingsPage /></PrivateRouteComponent>} />
      <Route path={AppRoutes.MY_ORDERS} element={<PrivateRouteComponent validRole='trainer'><MyOrdersPage /></PrivateRouteComponent>} />
      <Route path={AppRoutes.USER_ACCOUNT} element={<PrivateRouteComponent validRole='user'><PersonalAccountUserPage /></PrivateRouteComponent>} />
      <Route path={AppRoutes.QUESTIONNAIRE_COACH} element={<PrivateRouteComponent validRole='trainer'><QuestionnaireCoachPage /></PrivateRouteComponent>} />
      <Route path={AppRoutes.QUESTIONNAIRE_USER} element={<PrivateRouteComponent validRole='user'><QuestionnaireUserPage /></PrivateRouteComponent>} />
      <Route path={AppRoutes.MY_PURCHASES} element={<PrivateRouteComponent validRole='user'><MyPurchasesPage /></PrivateRouteComponent>} />

      <Route path={`${AppRoutes.TRAINING_CARD_USER}/:id`} element={<PrivateRouteComponent validRole='user'><TrainingCardUserPage /></PrivateRouteComponent>} />
      <Route path={`${AppRoutes.TRAINING_CARD_TRAINER}/:id`} element={<PrivateRouteComponent validRole='trainer'><TrainingCardTrainerPage /></PrivateRouteComponent>} />


      <Route path={AppRoutes.USERS_CATALOG} element={<PrivateRouteComponent validRole='user'><UsersCatalogPage /></PrivateRouteComponent>} />
      <Route path={`${AppRoutes.USER_CARD}/:id`} element={<PrivateRouteComponent validRole='user'><UserCardPage /></PrivateRouteComponent>} />

      <Route path={`${AppRoutes.TRAINER_CARD}/:id`} element={<PrivateRouteComponent validRole='user'><UserCardTrainerPage /></PrivateRouteComponent>} />

      <Route path={AppRoutes.FRIEND_LIST_USER} element={<PrivateRouteComponent validRole='user'><FriendsListUserPage /></PrivateRouteComponent>} />
      <Route path={AppRoutes.FRIEND_LIST_TRAINER} element={<PrivateRouteComponent validRole='trainer'><FriendsListTrainerPage /></PrivateRouteComponent>} />
      <Route path={'/notFound'} element={<NotFoundPage />} />
      <Route path={'/badRequest'} element={<BadRequestPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
