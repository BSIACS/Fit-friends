import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';
import { AuthorizationStatusEnum } from '../../types/authorization-status.enum';
import { LoaderComponent } from '../loader/loader.component';
import { BadRequestPage } from '../../pages/bad-request/bad-request.page';
import { useState } from 'react';
import { AppRoutes } from '../../constants/app-routes.constants';



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
  const authoriztionStatus = useAppSelector((state) => state.authorization.authoriztionStatus);
  const authoriztionData = useAppSelector((state) => state.authorization.authoriztionData);
  const [isAuthorizationDataLoaded, setIsAuthorizationDataLoaded] = useState<boolean>(false);


  if(authoriztionStatus === AuthorizationStatusEnum.UNAUTHORIZED){
    return <Navigate to={AppRoutes.SIGN_IN}/>
  }

  if(authoriztionStatus === AuthorizationStatusEnum.AUTHORIZED){
    if(authoriztionData?.role === validRole){
      return children
    }
    else{
      return <BadRequestPage/>
    }
  }


  return (
    <LoaderComponent isHidden={false} />
  )
}
