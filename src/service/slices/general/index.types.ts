import { Provider } from 'react-redux';

export type Contract = {
  _id: string;
  name: string;
};

export type Product = {
  _id: string;
  uniqueListId: string;
  name: string;
  brand: Brand;
  sku: string;
  unit: string;
};

export type Provider = {
  _id: string;
  name: string;
  taxid: number;
  crr: number;
  registered: string;
  contracts: Contract[];
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
  products: Product[];
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
