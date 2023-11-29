import axios from 'axios';
import { InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken } from './token';

const REST_API_URL = 'http://localhost:3042/api';

export enum AuthorizationHeader {
  ACCESS = 'access',
  REFRESH = 'refresh',
  UNDEFINED = 'undefined'
}

export class AxiosFactory {

  public static createAxiosInstance(authorizationHeader: AuthorizationHeader) {
    const axiosInstance = axios.create({
      baseURL: REST_API_URL,
    });


    switch (authorizationHeader) {
      case AuthorizationHeader.ACCESS:
        axiosInstance.interceptors.request.use(this.requestWithAccessTokenInterceptor)
        break;
      case AuthorizationHeader.REFRESH:
        axiosInstance.interceptors.request.use(this.requestWithRefreshTokenInterceptor)
        break;
    }


    return axiosInstance;
  }

  private static requestWithAccessTokenInterceptor(config: InternalAxiosRequestConfig) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;

    return config;
  }

  private static requestWithRefreshTokenInterceptor(config: InternalAxiosRequestConfig) {
    config.headers.Authorization = `Bearer ${getRefreshToken()}`;

    return config;
  }

  private static requestWithJSONBodyHeaderInterceptor(config: InternalAxiosRequestConfig) {
    config.headers['Content-Type'] = 'application/json';

    return config;
  }
}
