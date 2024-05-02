import { jsonDataReceipts } from 'service/slices/receipts/index.types';
import { API } from '../constants';

const checkResponse = (response: Response | Response[]) => {
  if (Array.isArray(response)) {
    const promises = response.map((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
      return res.json();
    });
    return Promise.all(promises);
  } else {
    if (!response.ok) {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
    return response.json();
  }
};

export const fetchReceipts = async (): Promise<jsonDataReceipts> => {
  const data = await fetch(`${API}/receipts`);
  return checkResponse(data);
};

export const generateDate = (today: Date) => {
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear().toString().slice(-2);
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  return `${formattedDay}.${formattedMonth}.${year}`;
};

export const getAllData = async () => {
  const providers = await fetch(`${API}/providers`);
  const brands = await fetch(`${API}/brands`);
  const products = await fetch(`${API}/products`);
  return checkResponse([providers, brands, products]);
};

export const addContractToProvider = async (id: string, contract: { _id: string; name: string }) => {
  const data = await fetch(`${API}/providers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(contract),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return checkResponse(data);
};

export const addProduct = async (product: { sku: string; name: string; brand: string; unit: string }) => {
  const data = await fetch(`${API}/products`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return checkResponse(data);
};

export const addBrand = async (brand: string) => {
  const data = await fetch(`${API}/brands`, {
    method: 'POST',
    body: JSON.stringify({ name: brand }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return checkResponse(data);
};

// export const generateVendor = (store: string) => {
//   switch (store) {
//     case 'З\\ч склад Exeed':
//       return 'Аларм-моторс Озерки';
//     case 'З\\ч склад Jaecoo':
//       return 'Аларм-моторс Озерки';
//     case 'З\\ч склад Omoda':
//       return 'Аларм-моторс Озерки';
//     case 'З\\ч склад Ford':
//       return 'Аларм-моторс Озерки';
//     case 'З\\ч склад Tank':
//       return 'Аларм-моторс Юго-запад';
//     case 'З\\ч склад Geely':
//       return 'Аларм-моторс Лахта';
//     case 'З\\ч склад Faw':
//       return 'Аларм-моторс Лахта';
//     case 'З\\ч склад Sollers':
//       return 'Аларм-моторс Лахта';
//     case 'З\\ч склад Mazda':
//       return 'Аларм-Комтранс';
//     default:
//       return 'Ошибка';
//   }
// };
