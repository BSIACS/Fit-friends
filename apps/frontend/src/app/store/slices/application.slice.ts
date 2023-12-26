/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TrainerData } from '../../types/trainer-data';
import { TrainerDTO } from '../../dto/trainer.dto';
import { deleteTrainersCertificateDataThunk, getOrdersByTrainerIdDataThunk, getTrainerDetailThunk, getTrainingsByTrainerIdDataThunk, getTrainingsDataThunk, getUserDetailThunk, updateTrainerDataThunk, updateTrainerWithQuestionnaireDataThunk, updateTrainersCertificateDataThunk, updateUserDataThunk, updateUserWithQuestionnaireDataThunk } from './application.thunk';
import { UserData } from '../../types/user-data';
import { TrainingDTO } from '../../dto/training.dto';
import { GetOrdersDTO } from '../../dto/get-orders.dto';
import { OrderDTO } from '../../dto/order.dto';


export interface ApplicationState {
  isLoading: boolean;
  isPersonalAccountCoachPageDataLoading: boolean;
  isTrainingDataLoading: boolean;
  isBadRequest: boolean;
  actualTrainerData: TrainerData;
  actualUserData: UserData;
  editTrainerFormData: TrainerData;
  editUserFormData: UserData | undefined;
  actualTrainingsData: TrainingDTO[];
  actualTrainingsDataCount: number;
  actualOrdersData: OrderDTO[];
  actualOrdersDataCount: number;
  isUserFormEditable: boolean;
  isTrainerFormEditable: boolean;
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
  actualTrainingsDataCount: 0,
  actualOrdersData: [],
  actualOrdersDataCount: 0,
  isUserFormEditable: false,
  isTrainerFormEditable: false,
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
    setActualTrainingsData: (state, action) => { state.actualTrainingsData = action.payload; },
    setIsTrainingCardUserPageDataLoaded: (state, action) => { state.isTrainingDataLoading = action.payload; },
    setIsUserFormEditable: (state, action) => { state.isUserFormEditable = action.payload; },
    clearAppliactionState: (state) => {
      state.actualTrainerData = {};
      state.actualUserData = {};
    },
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

      //UPDATE TRAINERS CERTIFICATE
      .addCase(updateTrainersCertificateDataThunk.fulfilled, (state, action: PayloadAction<TrainerDTO>,) => {
        state.actualTrainerData = action.payload;
        state.isLoading = false;
      })
      .addCase(updateTrainersCertificateDataThunk.rejected, (state, action) => {
        state.isBadRequest = true;
        state.editTrainerFormData = state.actualTrainerData;
      })

      //DELETE TRAINERS CERTIFICATE
      .addCase(deleteTrainersCertificateDataThunk.fulfilled, (state, action: PayloadAction<TrainerDTO>,) => {
        state.actualTrainerData = action.payload;
        state.isLoading = false;
      })
      .addCase(deleteTrainersCertificateDataThunk.rejected, (state) => {
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
        state.actualTrainingsData = action.payload.trainings;
        state.actualTrainingsDataCount = action.payload.count;
        state.isTrainingDataLoading = false;
      })

      //MY TRAININGS
      .addCase(getTrainingsByTrainerIdDataThunk.pending, (state) => {
        state.isTrainingDataLoading = true;
      })
      .addCase(getTrainingsByTrainerIdDataThunk.fulfilled, (state, action: PayloadAction<any>,) => {
        state.actualTrainingsData = action.payload.trainings;
        state.actualTrainingsDataCount = action.payload.count;
        state.isTrainingDataLoading = false;
      })

      //MY ORDERS
      .addCase(getOrdersByTrainerIdDataThunk.fulfilled, (state, action: PayloadAction<GetOrdersDTO>) => {
        state.actualOrdersData = action.payload.orders;
        state.actualOrdersDataCount = action.payload.count;
      })
  }
});

export const { changeEditTrainerFormData,
  changeEditUserFormData,
  setIsBadRequest,
  setIsLoading,
  setIsTrainingDataLoading,
  setIsTrainingCardUserPageDataLoaded,
  setIsUserFormEditable,
  clearAppliactionState
} = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
