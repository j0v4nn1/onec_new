import NavBarReact from '../components/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from '../components/orders';
import Welcome from '../components/welcome';
import Receipts from '../components/receipts';
import Nomenclature from '../components/nomenclature';

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
