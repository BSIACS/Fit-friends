/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthorizationRequest } from '../../types/authorization-request.interface';
import { SignInDTO } from '../../dto/sign-in.dto';
import { RegisterTrainerDTO } from '../../dto/register-trainer.dto';
import { RefreshTokensPairDTO } from '../../dto/refresh-tokens-pair.dto';
import { RefreshTokenRequest } from '../../types/refresh-token-request.interface';
import { AuthorizationHeader, AxiosFactory } from '../../services/axios';
import { CreateTrainerRequest } from '../../types/create-trainer-request.interface';
import { setAPIError } from './authorization.slice';


export const signInThunk = createAsyncThunk(
  'authorization/signInThunk',
  async (payload: AuthorizationRequest, thunkApi) => {
    try {
      thunkApi.dispatch(setAPIError(''))
      const response = await AxiosFactory.createAxiosInstance({authorizationHeader: AuthorizationHeader.NO_TOKEN}).post<SignInDTO>('/users/login', {
        email: payload.email,
        password: payload.password
      });

      return response.data;
    } catch (error: any) {
      let isErrorDetected = false;

      if(Array.isArray(error.response.data.message)){
        isErrorDetected = true;
        thunkApi.dispatch(setAPIError(error.response.data.message[0]));
      }
      if(error.response.data.message && !isErrorDetected){
        thunkApi.dispatch(setAPIError(error.response.data.message));
      }

      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshTokensPairThunk = createAsyncThunk(
  'authorization/refreshTokensPairThunk',
  async (payload: RefreshTokenRequest, thunkApi) => {
    try {
      const response = await AxiosFactory.createAxiosInstance({authorizationHeader: AuthorizationHeader.REFRESH}).post<RefreshTokensPairDTO>('/users/refresh');

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const registerTrainerThunk = createAsyncThunk(
  'authorization/registerTrainerThunk',
  async (payload: CreateTrainerRequest, thunkApi) => {
    try {
      const axiosInstance = axios.create({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
      })
      const response = await axiosInstance.post<RegisterTrainerDTO>('http://localhost:3042/api/users/register/trainer', payload.formData);

      return response.data;
    } catch (error: any) {
      let isErrorDetected = false;

      if(Array.isArray(error.response.data.message)){
        isErrorDetected = true;
        thunkApi.dispatch(setAPIError(error.response.data.message[0]));
      }
      if(error.response.data.message && !isErrorDetected){
        thunkApi.dispatch(setAPIError(error.response.data.message));
      }

      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const registerUserThunk = createAsyncThunk(
  'authorization/registerUserThunk',
  async (payload: CreateTrainerRequest, thunkApi) => {
    try {
      const axiosInstance = axios.create({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
      })
      const response = await axiosInstance.post<RegisterTrainerDTO>('http://localhost:3042/api/users/register/user', payload.formData);

      return response.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const signOutThunk = createAsyncThunk(
  'authorization/signOutThunk',
  async (payload, thunkApi) => {
    try {

      return;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

