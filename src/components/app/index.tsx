import NavBarReact from '../navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Auth, Nomenclature, Orders, Receipts, CreateReceipt } from '../../pages';
import { useAppDispatch } from 'service/store/index.types';
import { useEffect } from 'react';
import { getData } from '../../service/slices/general';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <BrowserRouter>
      <NavBarReact />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/nomenclature" element={<Nomenclature />} />
        <Route path="/receipts/add" element={<CreateReceipt />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
