import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchReceipts } from '../../../utils';
import { TReceipt, ReceiptsState, ReceiptType } from './index.types';
import { Product, Provider } from '../general/index.types';

export const getReceipts = createAsyncThunk('receipts/fetchReceipts', async () => {
  const res = await fetchReceipts();
  return res.result;
});

const initialState: ReceiptsState = {
  receiptId: '',
  receiptType: ReceiptType.NEW,
  receiptsRequest: false,
  loading: false,
  receiptsFailed: false,
  receipts: [],
  error: undefined,
  newReceipt: {
    temporaryData: {
      provider: {
        activeProvider: null,
        isActive: false,
      },
      contract: {
        activeContract: '',
        isActive: false,
      },
    },
    _id: '',
    number: null,
    provider: {
      _id: '',
      name: '',
      taxid: 0,
      crr: 0,
      registered: '',
      contracts: [],
    },
    products: [],
    date: '',
    vendor: '',
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
    setProvider: (state, action: PayloadAction<Provider>) => {
      state.newReceipt.provider = action.payload;
    },
    setContract: (state, action: PayloadAction<string>) => {
      state.newReceipt.contract = action.payload;
    },
    setReceiptId: (state, action: PayloadAction<string>) => {
      state.receiptId = action.payload;
    },
    setReceiptType: (state, action: PayloadAction<ReceiptType>) => {
      state.receiptType = action.payload;
    },
    setProduct: (state, action: PayloadAction<Product>) => {
      state.newReceipt.products.push(action.payload);
    },
    setActiveProvider: (state, action: PayloadAction<Provider | null>) => {
      state.newReceipt.temporaryData.provider.activeProvider = action.payload;
    },
    setIsActiveProvider: (state, action: PayloadAction<boolean>) => {
      state.newReceipt.temporaryData.provider.isActive = action.payload;
    },
    setActiveContract: (state, action: PayloadAction<string>) => {
      state.newReceipt.temporaryData.contract.activeContract = action.payload;
    },
    setIsActiveContract: (state, action: PayloadAction<boolean>) => {
      state.newReceipt.temporaryData.contract.isActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReceipts.pending, (state) => {
      state.loading = true;
      state.receiptsRequest = true;
    });
    builder.addCase(getReceipts.fulfilled, (state, action: PayloadAction<TReceipt[]>) => {
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

export const {
  setProvider,
  setContract,
  setReceiptId,
  setProduct,
  setReceiptType,
  setActiveProvider,
  setIsActiveProvider,
  setActiveContract,
  setIsActiveContract,
} = actions;

export default reducer;
