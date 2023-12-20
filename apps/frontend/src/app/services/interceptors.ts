import { getAccessToken } from './token';
import { InternalAxiosRequestConfig } from 'axios';

export const requestWithAccessTokenInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;

  return config;
}
