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
import { PersonalAccountCoachPage } from './pages/personal-account-coach/personal-account-coach.page';
import { QuestionnaireCoachPage } from './pages/questionnaire-coach/questionnaire-coach.page';
import { setIsLoading } from './store/slices/authorization.slice';
import { BadRequestPage } from './pages/bad-request/bad-request.page';
import { AppRoutes } from './constants/app-routes.constants';
import { TrainingCatalogPage } from './pages/training-catalog/training-catalog.page';

export function App() {
  const dispatch = useAppDispatch();

  const refreshToken = getRefreshToken();
  console.log('refreshToken -- ', refreshToken);


  if (refreshToken) {
    setIsLoading(true);
    dispatch(refreshTokensPairThunk({ refreshToken: refreshToken }));
  }



  return (
    <Routes>
      <Route path={'/'} element={<StartPage />} />
      <Route path={AppRoutes.SIGN_IN} element={<SignInPage />} />
      <Route path={AppRoutes.SIGN_UP} element={<SignUpPage />} />
      <Route path={'/index'} element={<PrivateRouteComponent validRole='user'><IndexPage /></PrivateRouteComponent>} />
      <Route path={AppRoutes.TRAINING_CATALOG} element={<PrivateRouteComponent validRole='user'><TrainingCatalogPage /></PrivateRouteComponent>} />
      <Route path={'/coachAccount'} element={<PrivateRouteComponent validRole='trainer'><PersonalAccountCoachPage /></PrivateRouteComponent>} />
      <Route path={'/questionnaireCoach'} element={<PrivateRouteComponent validRole='trainer'><QuestionnaireCoachPage /></PrivateRouteComponent>} />
      <Route path={'/notFound'} element={<NotFoundPage />} />
      <Route path={'/badRequest'} element={<BadRequestPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
