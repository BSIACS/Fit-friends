import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import axios from 'axios';
import { REST_API_URL } from '../constants/api-routes.constants';

const axiosInstance = axios.create({
  baseURL: REST_API_URL,
});

export type AppThunkDispatch = ThunkDispatch<RootState, ReturnType<typeof axiosInstance>, Action>;

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
