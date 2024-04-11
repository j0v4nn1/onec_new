import { Provider } from 'react-redux';

export type Document = {
  _id: string;
  name: string;
};

export type Provider = {
  _id: string;
  name: string;
  taxid: number;
  crr: number;
  registered: string;
  documents: Document[];
};

export type Brand = {
  _id: string;
  name: string;
};

export type InitialState = {
  request: boolean;
  loading: boolean;
  failed: boolean;
  providers: Provider[];
  brands: Brand[];
  error: string | undefined;
};

export type jsonDataArray = {
  array: [providers: [], brands: []];
};

export interface jsonData {
  providers: Provider[];
  brands: Brand[];
}

export interface jsonDataProviders {
  status: 'success';
  data: Provider[];
}
