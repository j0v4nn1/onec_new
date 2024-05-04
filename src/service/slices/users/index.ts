import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../../../utils/api';

const getUsersThunk = createAsyncThunk('auth/getUsers', async () => {
  return await getUsers();
});

const initialState = {
  name: '',
  email: '',
  role: '',
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

const { reducer } = auth;

export default reducer;
