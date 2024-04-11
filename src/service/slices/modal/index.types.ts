export enum ModalType {
  Receipt = 'Receipt',
  Transfer = 'Transfer',
  Auth = 'Auth',
  Arrival = 'Arrival',
}

export type ModalState = {
  isOpen: boolean;
  type: ModalType | null;
};
