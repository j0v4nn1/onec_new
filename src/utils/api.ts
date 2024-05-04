import axios from 'axios';
import { BASE_URL } from '../constants';
import { User } from '../service/slices/new_user/index.types';

export const sendUserData = (data: User) =>
  axios.post(`${BASE_URL}/users/registration`, data).then(({ data }) => data);

export const getUsers = () => axios.get(`${BASE_URL}/users`).then(({ data }) => data);
