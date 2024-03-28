import NavBarReact from '../navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Orders from '../orders';
import Welcome from '../welcome';
import Receipts from '../receipts';
import Nomenclature from '../nomenclature';
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
