import { createSlice } from '@reduxjs/toolkit';
import { AuthUserState } from '../new_user/index.types';
import { Role } from 'components/navbar/index.types';

const initialState: AuthUserState = {
  accessToken: '',
  name: '',
  email: '',
  password: '',
  passport: '',
  role: Role.ADMIN,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

const { reducer } = user;

export default reducer;
