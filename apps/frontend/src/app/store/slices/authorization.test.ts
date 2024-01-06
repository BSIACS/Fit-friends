import { AuthorizationStatusEnum } from '../../types/authorization-status.enum';
import { AuthorizationState, authorizationSlice, setAPIError, setAuthorizationStatus, setIsLoading, setIsRegistrationComplete } from './authorization.slice';

describe('Reducer: authorization', () => {
  let initialState: AuthorizationState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      authoriztionData: undefined,
      isRegistrationComplete: false,
      authoriztionStatus: AuthorizationStatusEnum.UNDEFINED,
      emailAPIError: { isError: false, message: '' },
      passwordAPIError: { isError: false, message: '' },
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(authorizationSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        isLoading: false,
        authoriztionData: undefined,
        isRegistrationComplete: false,
        authoriztionStatus: AuthorizationStatusEnum.UNDEFINED,
        emailAPIError: { isError: false, message: '' },
        passwordAPIError: { isError: false, message: '' },
      })
  });

  it('with the "setIsLoading" action and payload equal "true", should change the isLoading flag to true', () => {
    expect(authorizationSlice.reducer(initialState, setIsLoading(true)))
      .toEqual({
        ...initialState,
        isLoading: true,
      })
  });

  it('with the "setIsLoading" action and payload equal "false", should change the isLoading flag to false', () => {
    expect(authorizationSlice.reducer(initialState, setIsLoading(false)))
      .toEqual({
        ...initialState,
        isLoading: false,
      })
  });

  it('with the "setIsRegistrationComplete" action and payload equal "true", should change the isRegistrationComplete flag to true', () => {
    expect(authorizationSlice.reducer(initialState, setIsRegistrationComplete(true)))
      .toEqual({
        ...initialState,
        isRegistrationComplete: true,
      })
  });

  it('with the "setIsRegistrationComplete" action and payload equal "false", should change the isRegistrationComplete flag to false', () => {
    expect(authorizationSlice.reducer(initialState, setIsRegistrationComplete(false)))
      .toEqual({
        ...initialState,
        isRegistrationComplete: false,
      })
  });

  it('with the "setAuthorizationStatus" action should change the authorization status',()=>{
    expect(authorizationSlice.reducer(initialState, setAuthorizationStatus(AuthorizationStatusEnum.AUTHORIZED)))
      .toEqual({...initialState, authoriztionStatus: AuthorizationStatusEnum.AUTHORIZED});
  });

  it('with the "setAPIError" action should set correct error status',()=>{
    expect(authorizationSlice.reducer(initialState, setAPIError('[email] Email address is already in use')))
      .toEqual({...initialState, emailAPIError: { isError: true, message: 'Email address is already in use' }});
  });

  it('with the "setAPIError" action should set correct error status',()=>{
    expect(authorizationSlice.reducer(initialState, setAPIError('[password] Password is not correct')))
      .toEqual({...initialState, passwordAPIError: { isError: true, message: 'Password is not correct' }});
  });
})



