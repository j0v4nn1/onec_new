export interface Receipt {
  number: number;
  type: string;
  vendor: string;
  date: string;
  contarct: string;
  document: string;
  invoice: string;
  author: string;
  uuid: string;
  total: number;
  store: string;
  time: string;
}

export interface jsonDataReceipts {
  status: 'success' | 'failure';
  data: Receipt[];
}

export interface ReceiptsState {
  receiptsRequest: boolean;
  loading: boolean;
  receiptsFailed: boolean;
  receipts: Receipt[];
  error: string | undefined;
}
