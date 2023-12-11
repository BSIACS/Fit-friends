/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TrainerData } from '../../types/trainer-data';
import { TrainerDTO } from '../../dto/trainer.dto';
import { getTrainerDetailThunk, getTrainingsDataThunk, updateTrainerDataThunk, updateTrainerWithQuestionnaireDataThunk, updateUserDataThunk, updateUserWithQuestionnaireDataThunk } from './application.thunk';


export interface ApplicationState {
  isLoading: boolean;
  isPersonalAccountCoachPageDataLoading: boolean;
  isTrainingCardUserPageDataLoaded: boolean;
  isTrainingDataLoading: boolean;
  isBadRequest: boolean;
  actualTrainerData: TrainerData;
  actualUserData: any;
  editTrainerFormData: TrainerData;
  actualTrainingsData: []
}

const initialState: ApplicationState = {
  isLoading: false,
  isPersonalAccountCoachPageDataLoading: true,
  isTrainingCardUserPageDataLoaded: false,
  isTrainingDataLoading: false,
  isBadRequest: false,
  actualTrainerData: {},
  editTrainerFormData: {},
  actualUserData: {},
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
    setIsTrainingCardUserPageDataLoaded: (state, action) => { state.isTrainingDataLoading = action.payload; },
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

      .addCase(updateUserWithQuestionnaireDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserWithQuestionnaireDataThunk.fulfilled, (state, action: PayloadAction<any>,) => {
          state.actualUserData = action.payload;
          state.isLoading = false;
      })
      .addCase(updateTrainerWithQuestionnaireDataThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTrainerWithQuestionnaireDataThunk.fulfilled, (state, action: PayloadAction<any>,) => {
          state.actualTrainerData = action.payload;
          state.isLoading = false;
      })
      .addCase(getTrainingsDataThunk.pending, (state) => {
        state.isTrainingDataLoading = true;
      })
      .addCase(getTrainingsDataThunk.fulfilled, (state, action: PayloadAction<any>,) => {
        state.actualTrainingsData = action.payload;
        state.isTrainingDataLoading = false;
      })
      // .addCase(getTrainingReviewsThunk.pending, (state) => {
      //   console.log();
      // })
      // .addCase(getTrainingReviewsThunk.fulfilled, (state, action: PayloadAction<getTrainingReviewsPayload>,) => {
      //   console.log('addCase');
      //   action.payload.testFunc();
      //   //action.payload.setIsLoaded(true);
      // })
      // .addCase(getTrainingReviewsThunk.rejected, (state) => {
      //   console.log();
      // })
  }
});

export const { changeEditTrainerFormData, setIsBadRequest, setIsLoading, setIsTrainingDataLoading, setIsTrainingCardUserPageDataLoaded } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
