import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchReceipts } from '../../../utils';
import { Receipt, ReceiptsState } from './index.types';

export const getReceipts = createAsyncThunk('receipts/fetchReceipts', async () => {
  const res = await fetchReceipts();
  return res.data;
});

const initialState: ReceiptsState = {
  receiptsRequest: false,
  loading: false,
  receiptsFailed: false,
  receipts: [],
  error: undefined,
};

const receipts = createSlice({
  name: 'receipts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReceipts.pending, (state) => {
      state.loading = true;
      state.receiptsRequest = true;
    });
    builder.addCase(getReceipts.fulfilled, (state, action: PayloadAction<Receipt[]>) => {
      const receipts = action.payload;
      state.receipts = receipts.map((receipt) => receipt);
      state.loading = false;
    });
    builder.addCase(getReceipts.rejected, (state) => {
      state.loading = false;
      state.receiptsFailed = true;
      state.receiptsRequest = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const { reducer } = receipts;

export default reducer;
