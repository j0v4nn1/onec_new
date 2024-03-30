import { jsonDataReceipts } from 'service/slices/receipts/index.types';
import { API } from '../constants';

const checkResponse = (response: Response) => {
  if (!response.ok) {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
  return response.json();
};

export const fetchReceipts = async (): Promise<jsonDataReceipts> => {
  const data = await fetch(`${API}/receipts`);
  return checkResponse(data);
};
