import axios from 'axios';
import { InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from './token';
import { RefreshTokensPairDTO } from '../dto/refresh-tokens-pair.dto';
import { APIRoutes, REST_API_URL } from '../constants/api-routes.constants';

/**
 * Перечисление описывающее тип токена записываемый в заголовок авторизации (Authorization)
 */
export enum AuthorizationHeader {
  ACCESS = 'access',
  REFRESH = 'refresh',
  NO_TOKEN = 'no_token',
}

/**
 * Тип описывающий конфигурационные параметры запроса
 */
export type AxiosFactoryOptions = {
  authorizationHeader: AuthorizationHeader;
}

export class AxiosFactory {
  /**
   * Создаёт экземпляр axios с заранее опредлёнными параметрами
   * @param options конфигурационные параметры запроса
   */
  public static createAxiosInstance(options: AxiosFactoryOptions) {
    const axiosInstance = axios.create({
      baseURL: REST_API_URL,
    });

    if (options.authorizationHeader === AuthorizationHeader.ACCESS) {
      axiosInstance.interceptors.request.use(this.requestWithAccessTokenHeaderInterceptor);
      axiosInstance.interceptors.response.use(undefined, this.refreshTokensPairOn401StatusInterceptor);
    }
    else if (options.authorizationHeader === AuthorizationHeader.REFRESH) {
      axiosInstance.interceptors.request.use(this.requestWithRefreshTokenHeaderInterceptor);
    }

    return axiosInstance;
  }

  /**
  * Интерсептор подключающий access-токен в заголовок
  */
  private static requestWithAccessTokenHeaderInterceptor(config: InternalAxiosRequestConfig) {
    config.headers.Authorization = `Bearer ${getAccessToken()}`;

    return config;
  }

  /**
  * Интерсептор подключающий refresh-токен в заголовок
  */
  private static requestWithRefreshTokenHeaderInterceptor(config: InternalAxiosRequestConfig) {
    config.headers.Authorization = `Bearer ${getRefreshToken()}`;

    return config;
  }

  /**
   * Интерсептор предоставляющий функционал совершения повторного запроса при получении кода 401 от сервера
   */
  private static refreshTokensPairOn401StatusInterceptor = async (error: any) => {
    const originalRequest = error.config;

    if (+error.request.status === 401) {
      try {
        const response = await axios.create({
          baseURL: REST_API_URL,
        }).post<RefreshTokensPairDTO>(APIRoutes.REFRESH_TOKEN, undefined, {
          headers: { Authorization: `Bearer ${getRefreshToken()}` },
        });

        if (response.data.accessToken && response.data.refreshToken) {
          setAccessToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
        }

        originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;

        return axios.request(originalRequest);
      } catch (error) {
        throw new Error('[AxiosFactory][refreshTokensPairOn401StatusInterceptor] Ошибка при попытке обновления access-токена');
      }
    }

    return error;
  }
}
