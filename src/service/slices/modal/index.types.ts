export enum ModalType {
  Provider = 'Provider',
  Product = 'Product',
  Auth = 'Auth',
  Contract = 'Contract',
}

export type ModalState = {
  isOpen: boolean;
  type: ModalType | null;
};
