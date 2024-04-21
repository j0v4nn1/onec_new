import {
  Button,
  Col,
  Container,
  Form,
  Modal as ModalBootstrap,
  Nav,
  NavDropdown,
  Navbar,
  Row,
  Table,
} from 'react-bootstrap';
import { closeModal as closeModalAction } from 'service/slices/modal';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import React, { useState } from 'react';
import styles from './index.module.css';
import AddProviderModal from 'components/addProviderModal';
import AddDocumentModal from 'components/addDocumentModal';
import AddProductToReceipt from '../../components/addProductToReceipt';
import { Product } from '../../service/slices/general/index.types';

const CreateReceipt = () => {
  const dispatch = useAppDispatch();
  const { receipts } = useAppSelector((store) => store.receipts);
  const { provider, contract } = useAppSelector((store) => store.receipts.newReceipt);
  const receiptNumber = receipts[receipts.length - 1].number;
  const [vendor, setVendor] = useState('Аларм-моторс Озерки');
  const [warehouse, setWarehouse] = useState('Выберите склад');
  const [isProviderModalShowed, setIsProviderModalShowed] = useState(false);
  const [isDocumentModalShowed, setIsDocumentModalShowed] = useState(false);
  const [isProductListModalShowed, setIsProductListModalShowed] = useState(false);
  const [documentInput, setDocumentInput] = useState('');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [invoiceInput, setInvoiceInput] = useState('');
  const [isVATnull, setIsVATnull] = useState(false);
  const { isOpen } = useAppSelector((store) => store.modal);
  const closeModal = () => {
    dispatch(closeModalAction());
  };
  const { products } = useAppSelector((state) => state.receipts.newReceipt);
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear().toString().slice(-2);
  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

  const productsList = products.map((product) => {
    return (
      <tr>
        <td>
          <Form.Check
            readOnly
            checked={activeProduct?.uniqueListId === product.uniqueListId}
            type="radio"
            name="productInReceipt"
          />
        </td>
        <td>{product.sku}</td>
        <td>{product.name}</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  });

  const generateWarehouses = (vendor: string) => {
    switch (vendor) {
      case 'Аларм-моторс Озерки':
        return (
          <NavDropdown title={warehouse} menuVariant="dark">
            <NavDropdown.Item onClick={() => setWarehouse('З\\ч склад Exeed')}>
              З\ч склад Exeed
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setWarehouse('З\\ч склад Omoda')}>
              З\ч склад Omoda
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setWarehouse('З\\ч склад Ford')}>
              З\ч склад Ford
            </NavDropdown.Item>
          </NavDropdown>
        );
      case 'Аларм-моторс Юго-запад':
        return (
          <NavDropdown title={warehouse} menuVariant="dark">
            <NavDropdown.Item onClick={() => setWarehouse('З\\ч склад Tank')}>
              З\ч склад Tank
            </NavDropdown.Item>
          </NavDropdown>
        );
      case 'Аларм-моторс Лахта':
        return (
          <NavDropdown title={warehouse} menuVariant="dark">
            <NavDropdown.Item onClick={() => setWarehouse('З\\ч склад Geely')}>
              З\ч склад Geely
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setWarehouse('З\\ч склад Faw')}>
              З\ч склад Faw
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setWarehouse('З\\ч склад Sollers')}>
              З\ч склад Sollers
            </NavDropdown.Item>
          </NavDropdown>
        );
      case 'Аларм-Комтранс':
        return (
          <NavDropdown title={warehouse} menuVariant="dark">
            <NavDropdown.Item onClick={() => setWarehouse('З\\ч склад Mazda')}>
              З\ч склад Mazda
            </NavDropdown.Item>
          </NavDropdown>
        );
    }
  };

  return (
    <section className="p-3 pb-0">
      <h4>
        Поступление товаров - С000046{receiptNumber !== null && receiptNumber + 1} от{' '}
        {formattedDate}
      </h4>
      <h5 style={{ maxWidth: '250px' }}>
        <NavDropdown title={vendor} menuVariant="dark">
          <NavDropdown.Item
            onClick={() => {
              setVendor('Аларм-моторс Озерки');
              setWarehouse('З\\ч склад Exeed');
            }}>
            Аларм-моторс Озерки
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              setVendor('Аларм-моторс Юго-запад');
              setWarehouse('З\\ч склад Tank');
            }}>
            Аларм-моторс Юго-запад
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              setVendor('Аларм-моторс Лахта');
              setWarehouse('З\\ч склад Geely');
            }}>
            Аларм-моторс Лахта
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => {
              setVendor('Аларм-Комтранс');
              setWarehouse('З\\ч склад Mazda');
            }}>
            Аларм-Комтранс
          </NavDropdown.Item>
        </NavDropdown>
      </h5>
      <h6 style={{ maxWidth: '150px' }} className="mt-3">
        {generateWarehouses(vendor)}
      </h6>
      <Container className="mt-5" fluid>
        <Row>
          <Col className="px-0" xs={1}>
            Поставщик:
          </Col>
          <Col xs={2}>
            <Form.Control placeholder={provider.name} size="sm" type="text" disabled />
          </Col>
          <Col xs={1}>
            <Button onClick={() => setIsProviderModalShowed(true)} size="sm">
              Выбрать
            </Button>
          </Col>
          <Col xs={1}>Договор:</Col>
          <Col xs={2}>
            <Form.Control
              onChange={(event) => {
                setDocumentInput(event.target.value);
              }}
              value={documentInput}
              size="sm"
              type="text"
            />
          </Col>
          <Col xs={2}>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '146px' }}>
              от <input className={styles.date} type="date" name="calendar" />
            </div>
          </Col>
          <Col xs={2}>Налог:</Col>
        </Row>
        <Row className="mt-3">
          <Col className="px-0" xs={1}>
            Документ:
          </Col>
          <Col xs={2}>
            <Form.Control value={contract} size="sm" type="text" disabled />
          </Col>
          <Col xs={1}>
            <Button
              disabled={provider.name === ''}
              onClick={() => {
                setIsDocumentModalShowed(true);
              }}
              size="sm">
              Выбрать
            </Button>
          </Col>
          <Col xs={1}>СФ:</Col>
          <Col xs={2}>
            <Form.Control
              onChange={(event) => {
                setInvoiceInput(event.target.value);
              }}
              value={invoiceInput}
              size="sm"
              type="text"
            />
          </Col>
          <Col xs={2}>
            <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '146px' }}>
              от <input className={styles.date} type="date" name="calendar" />
            </div>
          </Col>
          <Col xs={2}>
            <Form.Select
              onChange={(event) => {
                if (event.target.value === 'Без налога') {
                  setIsVATnull(true);
                } else {
                  setIsVATnull(false);
                }
              }}
              size="sm"
              defaultValue={'НДС сверху 20%'}>
              <option>Без налога</option>
              <option>НДС сверху 10%</option>
              <option>НДС сверху 20%</option>
            </Form.Select>
          </Col>
        </Row>
      </Container>
      <Navbar expand="lg" className="mt-5">
        <Container className="px-0" fluid>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link
                onClick={() => {
                  setIsProductListModalShowed(true);
                }}>
                Добавить
              </Nav.Link>
              <Nav.Link>Удалить</Nav.Link>
              <Nav.Link disabled>Изменить</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Товар</th>
            <th>Наименование</th>
            <th>Кол-во</th>
            <th>Цена</th>
            <th>Сумма</th>
            {!isVATnull ? <th>НДС</th> : null}
            <th>Всего</th>
            <th>Страна</th>
            <th>ГТД</th>
            <th>Локация</th>
          </tr>
        </thead>
        <tbody>{productsList}</tbody>
      </Table>
    </section>
  );
};

export default CreateReceipt;
