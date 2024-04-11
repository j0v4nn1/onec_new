import { createSlice } from '@reduxjs/toolkit';
import { ModalState, ModalType } from './index.types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: ModalState = {
  isOpen: false,
  type: null,
};

const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ModalType>) {
      state.isOpen = true;
      state.type = action.payload;
    },
    closeModal(state) {
      state.isOpen = false;
      state.type = null;
    },
  },
});

export const { openModal, closeModal } = modal.actions;
export default modal.reducer;
