/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TrainerData } from '../../types/trainer-data';
import { TrainerDTO } from '../../dto/trainer.dto';
import { getTrainerDetailThunk, getTrainingsDataThunk, getUserDetailThunk, updateTrainerDataThunk, updateTrainerWithQuestionnaireDataThunk, updateUserDataThunk, updateUserWithQuestionnaireDataThunk } from './application.thunk';
import { UserData } from '../../types/user-data';


export interface ApplicationState {
  isLoading: boolean;
  isPersonalAccountCoachPageDataLoading: boolean;
  isTrainingDataLoading: boolean;
  isBadRequest: boolean;
  actualTrainerData: TrainerData;
  actualUserData: UserData;
  editTrainerFormData: TrainerData;
  editUserFormData: UserData | undefined;
  actualTrainingsData: []
}

const initialState: ApplicationState = {
  isLoading: false,
  isPersonalAccountCoachPageDataLoading: true,
  isTrainingDataLoading: false,
  isBadRequest: false,
  actualTrainerData: {},
  editTrainerFormData: {},
  actualUserData: {},
  editUserFormData: {},
  actualTrainingsData: [],
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    changeEditTrainerFormData: (state, action) => { state.editTrainerFormData = action.payload; },
    changeEditUserFormData: (state, action) => { state.editUserFormData = action.payload; },
    setIsBadRequest: (state, action) => { state.isBadRequest = action.payload; },
    setIsLoading: (state, action) => { state.isLoading = action.payload; },
    setisPersonalAccountCoachPageDataLoading: (state, action) => { state.isPersonalAccountCoachPageDataLoading = action.payload; },
    setIsTrainingDataLoading: (state, action) => { state.isTrainingDataLoading = action.payload; },
    setIsTrainingCardUserPageDataLoaded: (state, action) => { state.isTrainingDataLoading = action.payload; },
  },
  extraReducers(builder) {
    builder
      //USER ACCOUNT PAGE
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
      //USER ACCOUNT PAGE
      .addCase(getUserDetailThunk.fulfilled, (state, action: PayloadAction<TrainerDTO>,) => {
          state.actualUserData = action.payload;
          state.editUserFormData = action.payload;
      })
      .addCase(updateUserDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserDataThunk.fulfilled, (state, action: PayloadAction<any>,) => {
          state.actualUserData = action.payload;
          state.isLoading = false;
      })
      .addCase(updateUserDataThunk.rejected, (state, action) => {
        // state.isBadRequest = true;
        // state.editTrainerFormData = state.actualTrainerData;
      })
      //USER'S QUESTIONNAIRE
      .addCase(updateUserWithQuestionnaireDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserWithQuestionnaireDataThunk.fulfilled, (state, action: PayloadAction<any>,) => {
          state.actualUserData = action.payload;
          state.isLoading = false;
      })
      //TRAINERS'S QUESTIONNAIRE
      .addCase(updateTrainerWithQuestionnaireDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTrainerWithQuestionnaireDataThunk.fulfilled, (state, action: PayloadAction<any>,) => {
          state.actualTrainerData = action.payload;
          state.isLoading = false;
      })

      //TRAINING CATALOG
      .addCase(getTrainingsDataThunk.pending, (state) => {
        state.isTrainingDataLoading = true;
      })
      .addCase(getTrainingsDataThunk.fulfilled, (state, action: PayloadAction<any>,) => {
        state.actualTrainingsData = action.payload;
        state.isTrainingDataLoading = false;
      })
  }
});

export const { changeEditTrainerFormData, changeEditUserFormData, setIsBadRequest, setIsLoading, setIsTrainingDataLoading, setIsTrainingCardUserPageDataLoaded } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
