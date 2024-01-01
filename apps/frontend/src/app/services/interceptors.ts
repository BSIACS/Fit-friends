import { getAccessToken } from './token';
import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export const requestWithAccessTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;

  return config;
}

export const refreshTokensPairInterceptor = (value: AxiosResponse<any, any>) => {
  console.log('refreshTokensPairInterceptor');


  return value;
}
