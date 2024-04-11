import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Brand, InitialState, Provider, jsonDataArray } from './index.types';
import { getAllData } from '../../../utils/';
import type { PayloadAction } from '@reduxjs/toolkit';

export const getData = createAsyncThunk('data/getData', async () => {
  return await getAllData();
});

const initialState: InitialState = {
  request: false,
  loading: false,
  failed: false,
  providers: [],
  brands: [],
  error: undefined,
};

const general = createSlice({
  name: 'general',
  initialState,
  reducers: {
    updateProviderDocument: (state, action: PayloadAction<Provider>) => {
      const index = state.providers.findIndex((provider) => provider._id === action.payload._id);
      state.providers[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
      state.request = true;
    });
    builder.addCase(
      getData.fulfilled,
      (state, action: PayloadAction<[{ providers: Provider[] }, { brands: Brand[] }]>) => {
        const { providers } = action.payload[0];
        const { brands } = action.payload[1];
        console.log(providers);
        state.providers = providers.map((provider) => provider);
        state.brands = brands.map((brand) => brand);
        state.loading = false;
      }
    );
    builder.addCase(getData.rejected, (state) => {
      state.loading = false;
      state.failed = true;
      state.request = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const { reducer, actions } = general;

export const { updateProviderDocument } = actions;

export default reducer;
