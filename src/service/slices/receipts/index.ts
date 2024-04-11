import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchReceipts } from '../../../utils';
import { Receipt, ReceiptsState } from './index.types';
import { Provider } from '../general/index.types';

export const getReceipts = createAsyncThunk('receipts/fetchReceipts', async () => {
  const res = await fetchReceipts();
  return res.result;
});

const initialState: ReceiptsState = {
  checkedReceiptId: '',
  receiptsRequest: false,
  loading: false,
  receiptsFailed: false,
  receipts: [],
  error: undefined,
  newReceipt: {
    _id: '',
    number: null,
    type: 'Поступление товаров',
    provider: {
      _id: '',
      name: '',
      taxid: 0,
      crr: 0,
      registered: '',
      documents: [],
    },
    date: '',
    contract: '',
    document: '',
    invoice: '',
    docdate: '',
    author: '',
    vat: 0,
    total: 0,
    store: '',
    time: '',
  },
};

const receipts = createSlice({
  name: 'receipts',
  initialState,
  reducers: {
    addProvider: (state, action: PayloadAction<Provider>) => {
      state.newReceipt.provider = action.payload;
    },
    addContract: (state, action: PayloadAction<string>) => {
      state.newReceipt.contract = action.payload;
    },
    setCheckedReceiptId: (state, action: PayloadAction<string>) => {
      state.checkedReceiptId = action.payload;
    },
  },
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

const { reducer, actions } = receipts;

export const { addProvider, addContract, setCheckedReceiptId } = actions;

export default reducer;
