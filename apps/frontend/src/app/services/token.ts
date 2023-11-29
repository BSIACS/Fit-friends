/* eslint-disable no-console */
const ACCESS_TOKEN_KEY_NAME = 'FIT_FRIENDS_ACCESS_TOKEN';
const REFRESH_TOKEN_KEY_NAME = 'FIT_FRIENDS_REFRESH_TOKEN';


export type Token = string;

export const setAccessToken = (token: Token) => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);
};

export const setRefreshToken = (token: Token) => {
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, token);
};

export const getAccessToken = (): Token => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
  return token ?? '';
};

export const getRefreshToken = (): Token => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};
