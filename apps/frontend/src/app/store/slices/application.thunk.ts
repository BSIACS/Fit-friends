import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetUserDetailRequest } from '../../types/get-user-detail-request.interface';
import { getAccessToken } from '../../services/token';
import { InternalAxiosRequestConfig } from 'axios';
import { RootState } from '../store';
import { UpdateTrainerRequest } from '../../types/update-trainer-request.interface';
import { UpdateUserRequest } from '../../types/update-user-request.interface';
import { GetOrdersDTO } from '../../dto/get-orders.dto';
import { DeleteTrainersCertificateRequest } from '../../types/delete-trainers-certificate-request.interface';
import { AuthorizationHeader, AxiosFactory } from '../../services/axios';
import { TrainerDTO } from '../../dto/trainer.dto';
import { UserDTO } from '../../dto/user.dto';


const requestWithAccessTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;

  return config;
}

export const getUserDetailThunk = createAsyncThunk(
  'application/getUserDetailThunk',
  async (payload: GetUserDetailRequest, thunkApi) => {
    try {
      const response = await AxiosFactory
        .createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS })
        .get<UserDTO>(`/users/detail/${payload.id}`);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getTrainerDetailThunk = createAsyncThunk(
  'application/getTrainerDetailThunk',
  async (payload, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const userId = (state as RootState).authorization.authoriztionData?.userId;
      const response = await AxiosFactory
        .createAxiosInstance({ authorizationHeader: AuthorizationHeader.ACCESS })
        .get<TrainerDTO>(`/users/detail/trainer/${userId}`);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateTrainerDataThunk = createAsyncThunk(
  'application/updateTrainerDataThunk',
  async (payload: UpdateTrainerRequest, thunkApi) => {
    try {
      const axiosInstance = axios.create({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
      });
      axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
      const response = await axiosInstance.patch<any>(`http://localhost:3042/api/users/update/trainer`, payload.formData);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateTrainersCertificateDataThunk = createAsyncThunk(
  'application/updateTrainersCertificateDataThunk',
  async (payload: UpdateTrainerRequest, thunkApi) => {
    try {
      const axiosInstance = axios.create({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
      });
      axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
      const response = await axiosInstance.patch<any>(`http://localhost:3042/api/users/update/certificate`, payload.formData);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteTrainersCertificateDataThunk = createAsyncThunk(
  'application/deleteTrainersCertificateDataThunk',
  async (payload: DeleteTrainersCertificateRequest, thunkApi) => {
    try {
      const axiosInstance = axios.create();
      axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
      const response = await axiosInstance.delete<any>(`http://localhost:3042/api/users/certificate`, { data: payload });

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateUserDataThunk = createAsyncThunk(
  'application/updateUserDataThunk',
  async (payload: UpdateUserRequest, thunkApi) => {
    try {
      const axiosInstance = axios.create({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
      });
      axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
      const response = await axiosInstance.patch<any>(`http://localhost:3042/api/users/update/user`, payload.formData);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateUserWithQuestionnaireDataThunk = createAsyncThunk(
  'application/updateUserWithQuestionnaireDataThunk',
  async (payload: UpdateUserRequest, thunkApi) => {
    try {
      const axiosInstance = axios.create({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
      });
      axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
      const response = await axiosInstance.patch<any>(`http://localhost:3042/api/users/questionnaire/user`, payload.formData);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateTrainerWithQuestionnaireDataThunk = createAsyncThunk(
  'application/updateTrainerWithQuestionnaireDataThunk',
  async (payload: UpdateTrainerRequest, thunkApi) => {
    try {
      const axiosInstance = axios.create({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
      });
      payload.formData.get('level')
      axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
      const response = await axiosInstance.patch<any>(`http://localhost:3042/api/users/questionnaire/trainer`, payload.formData);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getTrainingsDataThunk = createAsyncThunk(
  'application/getTrainingsDataThunk',
  async (payload: string, thunkApi) => {
    try {
      console.log(`http://localhost:3042/api/trainings/catalogue/${payload}`);

      const axiosInstance = axios.create();
      axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
      const response = await axiosInstance.get<any>(`http://localhost:3042/api/trainings/catalogue${payload}`);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getTrainingsByTrainerIdDataThunk = createAsyncThunk(
  'application/getTrainingsByTrainerIdDataThunk',
  async (payload: string, thunkApi) => {
    try {
      const axiosInstance = axios.create();
      axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
      const response = await axiosInstance.get<any>(`http://localhost:3042/api/trainerAccount/getTrainingsList${payload}`);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getOrdersByTrainerIdDataThunk = createAsyncThunk(
  'application/getOrdersByTrainerIdDataThunk',
  async (payload: string, thunkApi) => {
    try {
      const axiosInstance = axios.create();
      axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
      const response = await axiosInstance.get<GetOrdersDTO>(`http://localhost:3042/api/trainerAccount/getOrders${payload}`);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);



