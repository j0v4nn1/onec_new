import { TNomenclatureProduct } from '../receipts/index.types';
export enum ModalType {
  Provider = 'Provider',
  Product = 'Product',
  Auth = 'Auth',
  Contract = 'Contract',
  ProductDetail = 'ProductDetail',
  Warning = 'Warning',
  Saving = 'Saving',
}

export type TAction = { payload: TNomenclatureProduct; type: string } | null;

export type ModalState = {
  isOpen: boolean;
  type: ModalType | null;
  action: TAction;
};
