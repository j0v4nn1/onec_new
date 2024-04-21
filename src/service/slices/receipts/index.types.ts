import { Product, Provider } from '../general/index.types';

export interface Receipt {
  _id: string;
  number: number | null;
  type: string;
  provider: Provider;
  products: Product[];
  date: string;
  contract: string;
  document: string;
  invoice: string;
  docdate: string;
  author: string;
  vat: number;
  total: number;
  store: string;
  time: string;
}

export interface jsonDataReceipts {
  status: 'success' | 'failure';
  result: Receipt[];
}

export interface ReceiptsState {
  checkedReceiptId: string;
  receiptsRequest: boolean;
  loading: boolean;
  receiptsFailed: boolean;
  receipts: Receipt[];
  error: string | undefined;
  newReceipt: Receipt;
}
