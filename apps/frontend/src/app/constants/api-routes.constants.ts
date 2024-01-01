export const REST_API_URL = 'http://localhost:3042/api';

/**
 * Предоставляет REST API маршруты
 */
export enum APIRoutes {
  /**
   * Пользователи
   */
  REFRESH_TOKEN = '/users/refresh',
  USERS_LIST = '/users/usersList',

  //Тренировки
  TRAININGS_CATALOG = '/trainings/catalogue',
}
