import NavBarReact from '../navbar/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from '../orders/orders';
import Welcome from '../welcome/welcome.tsx';
import Receipts from '../receipts/receipts.tsx';
import Nomenclature from '../nomenclature/nomenclature.tsx';
const App = () => {
  return (
    <BrowserRouter>
      <NavBarReact />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/nomenclature" element={<Nomenclature />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
