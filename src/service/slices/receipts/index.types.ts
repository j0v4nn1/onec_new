import { Product, Provider } from '../general/index.types';

export type TReceipt = {
  _id: string;
  number: number | null;
  provider: Provider;
  products: Product[];
  date: string;
  vendor: string;
  contract: string;
  document: string;
  invoice: string;
  docdate: string;
  author: string;
  vat: number;
  total: number;
  store: string;
  time: string;
};

export type TReceiptWithTempData = TReceipt & {
  temporaryData: {
    provider: {
      activeProvider: Provider | null;
      isActive: boolean;
    };
    contract: {
      activeContract: string;
      isActive: boolean;
    };
  };
};

export interface jsonDataReceipts {
  status: 'success' | 'failure';
  result: TReceipt[];
}

export enum ReceiptType {
  NEW = 'new',
  DETAILS = 'details',
}

export interface ReceiptsState {
  receiptId: string;
  receiptType: ReceiptType;
  receiptsRequest: boolean;
  loading: boolean;
  receiptsFailed: boolean;
  receipts: TReceipt[];
  error: string | undefined;
  newReceipt: TReceiptWithTempData;
}
