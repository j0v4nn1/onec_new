import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './index.types';
import { Role } from '../../../components/navbar/index.types';
import { Payload } from '../../../components/user_create/index.types';

const initialState: User = {
  name: '',
  email: '',
  password: '',
  passport: '',
  role: Role.USER,
};

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Payload<typeof initialState>>) => {
      const { key, value } = action.payload;
      state[key] = value;
    },
    resetFormData: (state) => {
      state.name = '';
      state.email = '';
      state.password = '';
      state.passport = '';
      state.role = Role.USER;
    },
  },
});

const { reducer, actions } = user;

export const { setFormData, resetFormData } = actions;

export default reducer;
