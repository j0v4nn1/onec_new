import NavBarReact from '../navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from '../orders';
import Welcome from '../welcome';
import Receipts from '../receipts';
import Nomenclature from '../nomenclature';
import AddReceiptModal from 'components/addReceiptModal';
import { ModalType } from 'service/slices/modal/index.types';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import { useEffect } from 'react';
import { getData } from '../../service/slices/general';
import ReceiptDetails from '../receiptDetails';

const App = () => {
  const modalType = useAppSelector((store) => store.modal.type);
  const { checkedReceiptId } = useAppSelector((store) => store.receipts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <BrowserRouter>
      <NavBarReact />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/nomenclature" element={<Nomenclature />} />
      </Routes>
      {modalType === ModalType.Arrival && <AddReceiptModal />}
      {modalType === ModalType.Receipt && <ReceiptDetails _id={checkedReceiptId} />}
    </BrowserRouter>
  );
};

export default App;
