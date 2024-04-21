import { ModalType } from '../../service/slices/modal/index.types';
import Modal from '../modal';
import ProviderList from '../providerList';
import ContractList from '../contractList';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveProvider, setContract, setProvider } from '../../service/slices/receipts';
import { useAppSelector } from '../../service/store/index.types';
import { closeModal } from '../../service/slices/modal';

const ModalSwitch = () => {
  const { provider, contract } = useAppSelector((store) => store.receipts.newReceipt.temporaryData);
  const { type } = useAppSelector((state) => state.modal);
  const dispatch = useDispatch();
  return type === ModalType.Provider ? (
    <Modal
      action={() => {
        provider.activeProvider && dispatch(setProvider(provider.activeProvider));
        dispatch(closeModal());
        dispatch(setActiveProvider(null));
      }}
      title={'Выбрать поставщика'}>
      <ProviderList />
    </Modal>
  ) : type === ModalType.Contract ? (
    <Modal
      action={() => {
        contract.activeContract && dispatch(setContract(contract.activeContract));
        dispatch(closeModal());
      }}
      title={'Выбрать документ'}>
      <ContractList />
    </Modal>
  ) : null;
};

export default ModalSwitch;
