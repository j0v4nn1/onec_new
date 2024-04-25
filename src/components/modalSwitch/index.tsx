import { ModalType } from '../../service/slices/modal/index.types';
import Modal from '../modal';
import ProviderList from '../providerList';
import ContractList from '../contractList';
import { useDispatch } from 'react-redux';
import { setActiveProvider, setContract, setProduct, setProvider, updateProductDetails } from '../../service/slices/receipts';
import { useAppSelector } from '../../service/store/index.types';
import { closeModal } from '../../service/slices/modal';
import ProductList from '../productList';
import { v4 as uuidv4 } from 'uuid';
import { TProduct } from '../../service/slices/general/index.types';
import ProductDetails from '../productDetails';
import Warning from '../warning';

const ModalSwitch = () => {
  const { provider, contract } = useAppSelector((store) => store.receipts.newReceipt.temporaryData);
  const { activeProduct } = useAppSelector((store) => store.receipts.newReceipt.temporaryData.product);
  const { productDetails } = useAppSelector((store) => store.receipts.newReceipt.temporaryData.product);
  const { type } = useAppSelector((state) => state.modal);
  const { products } = useAppSelector((state) => state.general);
  const dispatch = useDispatch();
  const product = products.find((product) => activeProduct === product._id) as TProduct;
  const deleteProductAction = useAppSelector((state) => state.modal.action);
  return type === ModalType.Provider ? (
    <Modal
      actionButtonText="Выбрать"
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
      actionButtonText="Выбрать"
      action={() => {
        contract.activeContract && dispatch(setContract(contract.activeContract));
        dispatch(closeModal());
      }}
      title={'Выбрать документ'}>
      <ContractList />
    </Modal>
  ) : type === ModalType.Product ? (
    <Modal
      actionButtonText="Выбрать"
      title={'Выбрать товар'}
      action={() => {
        const uniqueListId = uuidv4();
        dispatch(
          setProduct({
            ...product,
            price: 0,
            amount: 0,
            country: '',
            customDeclaration: '',
            location: '',
            uniqueListId,
          })
        );
      }}>
      <ProductList />
    </Modal>
  ) : type === ModalType.ProductDetail ? (
    <Modal
      title={`Внесите данные для товара: ${product.name}`}
      action={() => {
        dispatch(updateProductDetails({ ...product, ...productDetails, price: +productDetails.price, amount: +productDetails.amount }));
      }}
      actionButtonText="Сохранить">
      <ProductDetails />
    </Modal>
  ) : type === ModalType.Warning ? (
    <Modal
      title={`Удаление`}
      action={() => {
        // @ts-ignore
        dispatch(deleteProductAction);
        dispatch(closeModal());
      }}
      actionButtonText="Да">
      <Warning />
    </Modal>
  ) : null;
};

export default ModalSwitch;
