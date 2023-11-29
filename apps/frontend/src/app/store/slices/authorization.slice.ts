import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { signOutThunk, refreshTokensPairThunk, registerTrainerThunk, signInThunk } from './authorization.thunk';
import { SignInDTO } from '../../dto/sign-in.dto';
import { decodeToken } from "react-jwt";
import { AuthoriztionData } from '../../types/authoriztion-data.interface';
import { removeAccessToken, removeRefreshToken, setAccessToken, setRefreshToken } from '../../services/token';
import { RefreshTokensPairDTO } from '../../dto/refresh-tokens-pair.dto';
import { AuthorizationStatusEnum } from '../../types/authorization-status.enum';
import { RegisterTrainerDTO } from '../../dto/register-trainer.dto';


export interface AuthorizationState {
  isLoading: boolean;
  authoriztionData: AuthoriztionData;
  isRegistrationComplete: boolean;
  authoriztionStatus: AuthorizationStatusEnum;
}

const initialState: AuthorizationState = {
  isLoading: false,
  authoriztionData: {},
  isRegistrationComplete: false,
  authoriztionStatus: AuthorizationStatusEnum.UNDEFINED,
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
        console.log('refreshTokensPairThunk.pending');
        state.isLoading = true;
      })
      .addCase(refreshTokensPairThunk.fulfilled, (state, action: PayloadAction<RefreshTokensPairDTO>) => {
        console.log('refreshTokensPairThunk.fulfilled');
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
      .addCase(signOutThunk.fulfilled, (state) => {
        state.authoriztionData = {};
        state.authoriztionStatus = AuthorizationStatusEnum.UNAUTHORIZED;
        removeAccessToken();
        removeRefreshToken();
      })
  }
});

export const { setIsRegistrationComplete, setIsLoading } = authorizationSlice.actions;
export const authorizationReducer = authorizationSlice.reducer;
