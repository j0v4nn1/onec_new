import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../new_user/index.types';

const initialState: User = {
  name: '',
  email: '',
  password: '',
  passport: '',
  role: '',
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.pending, (state) => {
      state.loading = true;
      state.request = true;
    });
    builder.addCase(
      getUsersThunk.fulfilled,
      (state, action: PayloadAction<{ status: string; users: UserWithId[] }>) => {
        state.loading = false;
        state.request = false;
        state.users = action.payload.users;
      }
    );
    builder.addCase(getUsersThunk.rejected, (state) => {
      state.loading = false;
      state.failed = true;
      state.request = false;
    });
  },
});

export default users.reducer;
