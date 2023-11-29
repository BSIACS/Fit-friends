import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { GetUserDetailRequest } from '../../types/get-user-detail-request.interface';
import { getAccessToken } from '../../services/token';
import { InternalAxiosRequestConfig } from 'axios';
import { RootState } from '../store';
import { UpdateTrainerRequest } from '../../types/update-trainer-request.interface';


const requestWithAccessTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;

  return config;
}

export const getUserDetailThunk = createAsyncThunk(
  'application/getUserDetailThunk',
  async (payload: GetUserDetailRequest, thunkApi) => {
    try {
      console.log('getUserDetailThunk ******************');

      const axiosInstance = axios.create();
      axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);

      const response = await axiosInstance.get<any>(`http://localhost:3042/api/users/detail/${payload.id}`);
      console.log(response.data);

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
      const userId = (state as RootState).authorization.authoriztionData.userId;

      const axiosInstance = axios.create();
      axiosInstance.interceptors.request.use(requestWithAccessTokenInterceptor);
      const response = await axiosInstance.get<any>(`http://localhost:3042/api/users/detail/trainer/${userId}`);
      console.log(response.data);

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

      console.log(`FORM DATA ${payload.formData.get('description')}`);


      const response = await axiosInstance.patch<any>(`http://localhost:3042/api/users/update/trainer`, payload.formData);
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.log('updateTrainerDataThunk - rejected');

      return thunkApi.rejectWithValue(error.message);
    }
  }
);



