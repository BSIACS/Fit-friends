/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { refreshTokensPairThunk, signInThunk } from './authorization.thunk';
import { SignInDTO } from '../../dto/sign-in.dto';
import { decodeToken } from "react-jwt";
import { AuthoriztionData } from '../../types/authoriztion-data.interface';
import { setAccessToken, setRefreshToken } from '../../services/token';
import { RefreshTokensPairDTO } from '../../dto/refresh-tokens-pair.dto';
import { AuthorizationStatusEnum } from '../../types/authorization-status.enum';
import { TrainerData } from '../../types/trainer-data';
import { TrainerDTO } from '../../dto/trainer.dto';
import { getTrainerDetailThunk, getTrainingsDataThunk, updateTrainerDataThunk } from './application.thunk';


export interface ApplicationState {
  isLoading: boolean;
  isPersonalAccountCoachPageDataLoading: boolean;
  isTrainingDataLoading: boolean;
  isBadRequest: boolean;
  actualTrainerData: TrainerData;
  editTrainerFormData: TrainerData;
  actualTrainingsData: []
}

const initialState: ApplicationState = {
  isLoading: false,
  isPersonalAccountCoachPageDataLoading: true,
  isTrainingDataLoading: false,
  isBadRequest: false,
  actualTrainerData: {},
  editTrainerFormData: {},
  actualTrainingsData: [],
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    changeEditTrainerFormData: (state, action) => { state.editTrainerFormData = action.payload; },
    setIsBadRequest: (state, action) => { state.isBadRequest = action.payload; },
    setIsLoading: (state, action) => { state.isLoading = action.payload; },
    setisPersonalAccountCoachPageDataLoading: (state, action) => { state.isPersonalAccountCoachPageDataLoading = action.payload; },
    setIsTrainingDataLoading: (state, action) => { state.isTrainingDataLoading = action.payload; },
  },
  extraReducers(builder) {
    builder
      .addCase(getTrainerDetailThunk.pending, (state) => {
        state.isPersonalAccountCoachPageDataLoading = true;
      })
      .addCase(getTrainerDetailThunk.fulfilled, (state, action: PayloadAction<TrainerDTO>,) => {
          state.actualTrainerData = action.payload;
          state.editTrainerFormData = action.payload;
          state.isPersonalAccountCoachPageDataLoading = false;
      })
      .addCase(updateTrainerDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTrainerDataThunk.fulfilled, (state, action: PayloadAction<TrainerDTO>,) => {
          state.actualTrainerData = action.payload;
          state.isLoading = false;
      })
      .addCase(updateTrainerDataThunk.rejected, (state, action) => {
        state.isBadRequest = true;
        state.editTrainerFormData = state.actualTrainerData;
      })
      .addCase(getTrainingsDataThunk.pending, (state) => {
        state.isTrainingDataLoading = true;
      })
      .addCase(getTrainingsDataThunk.fulfilled, (state, action: PayloadAction<any>,) => {
        state.actualTrainingsData = action.payload;
        state.isTrainingDataLoading = false;
      })
  }
});

export const { changeEditTrainerFormData, setIsBadRequest, setIsLoading, setIsTrainingDataLoading } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
