import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { signOutThunk, refreshTokensPairThunk, registerTrainerThunk, signInThunk, registerUserThunk } from './authorization.thunk';
import { SignInDTO } from '../../dto/sign-in.dto';
import { decodeToken } from "react-jwt";
import { AuthoriztionData } from '../../types/authoriztion-data.interface';
import { removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from '../../services/token';
import { RefreshTokensPairDTO } from '../../dto/refresh-tokens-pair.dto';
import { AuthorizationStatusEnum } from '../../types/authorization-status.enum';
import { RegisterTrainerDTO } from '../../dto/register-trainer.dto';
import { RegisterUserDTO } from '../../dto/register-user.dto';


export interface AuthorizationState {
  isLoading: boolean;
  authoriztionData: AuthoriztionData;
  isRegistrationComplete: boolean;
  authoriztionStatus: AuthorizationStatusEnum;
  emailAPIError: { isError: boolean, message: string }
  passwordAPIError: { isError: boolean, message: string }
}

const initialState: AuthorizationState = {
  isLoading: false,
  authoriztionData: {},
  isRegistrationComplete: false,
  authoriztionStatus: AuthorizationStatusEnum.UNDEFINED,
  emailAPIError: { isError: false, message: '' },
  passwordAPIError: { isError: false, message: '' },
};

export const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setIsRegistrationComplete: (state, action: PayloadAction<boolean>) => {
      state.isRegistrationComplete = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatusEnum>) => {
      state.authoriztionStatus = action.payload;
    },
    setAPIError: (state, action: PayloadAction<string>) => {
      let errorMessage = action.payload;
      if (errorMessage.includes('[email] ')) {
        errorMessage = errorMessage.replace('[email] ', '');
        state.emailAPIError = { isError: true, message: errorMessage };
      }
      else{
        state.emailAPIError = { isError: false, message: '' };
      }

      if (errorMessage.includes('[password] ')) {
        errorMessage = errorMessage.replace('[password] ', '');
        state.passwordAPIError = { isError: true, message: errorMessage };
      }
      else{
        state.passwordAPIError = { isError: false, message: '' };
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action: PayloadAction<SignInDTO>,) => {
        state.isLoading = false;
        if (action.payload.accessToken && action.payload.refreshToken) {
          setAccessToken(action.payload.accessToken);
          setRefreshToken(action.payload.refreshToken);
          state.authoriztionStatus = AuthorizationStatusEnum.AUTHORIZED;
          const decodedToken: any = decodeToken<any>(action.payload.accessToken);
          state.authoriztionData = { userId: decodedToken.userId, role: decodedToken.role };
        }
      })
      .addCase(refreshTokensPairThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshTokensPairThunk.fulfilled, (state, action: PayloadAction<RefreshTokensPairDTO>) => {
        if (action.payload.accessToken && action.payload.refreshToken) {
          setAccessToken(action.payload.accessToken);
          setRefreshToken(action.payload.refreshToken);
          state.authoriztionStatus = AuthorizationStatusEnum.AUTHORIZED;
          const decodedToken: any = decodeToken<any>(action.payload.accessToken);
          state.authoriztionData = { userId: decodedToken.userId, role: decodedToken.role };
        }
        state.authoriztionStatus = AuthorizationStatusEnum.AUTHORIZED;
        state.isLoading = false;
      })
      .addCase(registerTrainerThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerTrainerThunk.fulfilled, (state, action: PayloadAction<RegisterTrainerDTO>) => {
        const { trainer, tokensPair } = action.payload;
        state.authoriztionData = { email: trainer?.email, name: trainer?.name, role: trainer?.role, userId: trainer?.id }
        state.isRegistrationComplete = true;
        if (tokensPair) {
          setAccessToken(tokensPair.accessToken);
          setRefreshToken(tokensPair.refreshToken);
        }
        state.authoriztionStatus = AuthorizationStatusEnum.AUTHORIZED;
        state.isLoading = false;
      })
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUserThunk.fulfilled, (state, action: PayloadAction<RegisterUserDTO>) => {
        const { user, tokensPair } = action.payload;
        state.authoriztionData = { email: user?.email, name: user?.name, role: user?.role, userId: user?.id }
        state.isRegistrationComplete = true;
        if (tokensPair) {
          setAccessToken(tokensPair.accessToken);
          setRefreshToken(tokensPair.refreshToken);
        }
        state.authoriztionStatus = AuthorizationStatusEnum.AUTHORIZED;
        state.isLoading = false;
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        state.authoriztionData = {};
        state.authoriztionStatus = AuthorizationStatusEnum.UNAUTHORIZED;
        removeAccessToken();
        removeRefreshToken();
      })
  }
});

export const { setIsRegistrationComplete, setIsLoading, setAPIError } = authorizationSlice.actions;
export const authorizationReducer = authorizationSlice.reducer;
