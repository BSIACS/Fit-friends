import { Navigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AuthorizationStatusEnum } from '../../types/authorization-status.enum';
import { getAccessToken } from '../../services/token';
import { AccessDeniedPage } from '../../pages/access-denied/access-denied.page';
import { LoaderComponent } from '../loader/loader.component';


type PrivateRouteComponentProps = {
  validRole: string;
  children: JSX.Element;
}

/**
 * Provide private access to a child component, requiring authorization
 * @param { PrivateComponentProps } props props for the component.
 * @returns JSX element, if authorization status is 'authorized'. Or redirect to login screen otherwise.
 */
export function PrivateRouteComponent({ validRole, children }: PrivateRouteComponentProps): JSX.Element {
  const status = useAppSelector((state) => state.authorization.authoriztionStatus);
  const currentUserRole = useAppSelector((state) => state.authorization.authoriztionData.role);
  const isLoading = useAppSelector((state) => state.authorization.isLoading);

  if(isLoading){
    return <LoaderComponent isHidden={false}/>;
  }

  // if(validRole !== currentUserRole){
  //   return <AccessDeniedPage/>
  // }

  if(status === AuthorizationStatusEnum.AUTHORIZED){
    return children;
  }
  else if(status === AuthorizationStatusEnum.UNAUTHORIZED || getAccessToken() === ''){
    return <Navigate to={'/signIn'} />;
  }
  else{
    return <LoaderComponent isHidden={false}/>;
  }
}
