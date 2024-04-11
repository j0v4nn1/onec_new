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
import { useState } from 'react';
import styles from './index.module.css';
import AddProviderModal from 'components/addProviderModal';
import AddDocumentModal from 'components/addDocumentModal';
import { Props } from './index.types';
import { Receipt } from '../../service/slices/receipts/index.types';

const ReceiptInfo = ({ _id }: Props) => {
  const dispatch = useAppDispatch();
  const receipt = useAppSelector((store) =>
    store.receipts.receipts.find((receipt) => receipt._id === _id)
  ) as Receipt;
  const [vendor, setVendor] = useState('Аларм-моторс Озерки');
  const [warehouse, setWarehouse] = useState('Выберите склад');
  const [isProviderModalShowed, setIsProviderModalShowed] = useState(false);
  const [isDocumentModalShowed, setIsDocumentModalShowed] = useState(false);
  const [documentInput, setDocumentInput] = useState('');
  const [invoiceInput, setInvoiceInput] = useState('');
  const [isVATnull, setIsVATnull] = useState(false);

  const closeModal = () => {
    dispatch(closeModalAction());
  };

  const generateWarehouses = (vendor: string) => {
    switch (vendor) {
      case 'Аларм-моторс Озерки':
        return (
          <NavDropdown title={warehouse} menuVariant="dark">
            <NavDropdown.Item onClick={() => setWarehouse('Склад з\\ч Exeed')}>
              Склад з\ч Exeed
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setWarehouse('Склад з\\ч Omoda')}>
              Склад з\ч Omoda
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setWarehouse('Склад з\\ч Ford')}>
              Склад з\ч Ford
            </NavDropdown.Item>
          </NavDropdown>
        );
      case 'Аларм-моторс Юго-запад':
        return (
          <NavDropdown title={warehouse} menuVariant="dark">
            <NavDropdown.Item onClick={() => setWarehouse('Склад з\\ч Tank')}>
              Склад з\ч Tank
            </NavDropdown.Item>
          </NavDropdown>
        );
      case 'Аларм-моторс Лахта':
        return (
          <NavDropdown title={warehouse} menuVariant="dark">
            <NavDropdown.Item onClick={() => setWarehouse('Склад з\\ч Geely')}>
              Склад з\ч Geely
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setWarehouse('Склад з\\ч Faw')}>
              Склад з\ч Faw
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => setWarehouse('Склад з\\ч Sollers')}>
              Склад з\ч Sollers
            </NavDropdown.Item>
          </NavDropdown>
        );
      case 'Аларм-Комтранс':
        return (
          <NavDropdown title={warehouse} menuVariant="dark">
            <NavDropdown.Item onClick={() => setWarehouse('Склад з\\ч Mazda')}>
              Склад з\ч Mazda
            </NavDropdown.Item>
          </NavDropdown>
        );
    }
  };

  return (
    <>
      <ModalBootstrap.Header closeButton>
        <ModalBootstrap.Title id="contained-modal-title-vcenter">
          Поступление товаров - {receipt.date}
        </ModalBootstrap.Title>
      </ModalBootstrap.Header>
      <ModalBootstrap.Body>
        <h5 style={{ maxWidth: '250px' }}>
          <NavDropdown title={vendor} menuVariant="dark">
            <NavDropdown.Item
              onClick={() => {
                setVendor('Аларм-моторс Озерки');
                setWarehouse('Склад з\\ч Exeed');
              }}>
              Аларм-моторс Озерки
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setVendor('Аларм-моторс Юго-запад');
                setWarehouse('Склад з\\ч Tank');
              }}>
              Аларм-моторс Юго-запад
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setVendor('Аларм-моторс Лахта');
                setWarehouse('Склад з\\ч Geely');
              }}>
              Аларм-моторс Лахта
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                setVendor('Аларм-Комтранс');
                setWarehouse('Склад з\\ч Mazda');
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
            <Col xs={1}>Поставщик:</Col>
            <Col xs={2}>
              <Form.Control placeholder={receipt.contract} size="sm" type="text" disabled />
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
                value={receipt.document}
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
            <Col xs={1}>Документ:</Col>
            <Col xs={2}>
              <Form.Control value={receipt.contract} size="sm" type="text" disabled />
            </Col>
            <Col xs={1}>
              <Button
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
          <Container fluid>
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <Nav.Link>Добавить</Nav.Link>
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
          <tbody></tbody>
        </Table>
      </ModalBootstrap.Body>
      <ModalBootstrap.Footer>
        <Button onClick={closeModal}>Закрыть</Button>
        <Button>Сохранить</Button>
      </ModalBootstrap.Footer>
      <AddProviderModal
        isProviderModalShowed={isProviderModalShowed}
        setIsProviderModalShowed={setIsProviderModalShowed}
      />
      <AddDocumentModal
        isDocumentModalShowed={isDocumentModalShowed}
        setIsDocumentModalShowed={setIsDocumentModalShowed}
      />
    </>
  );
};

export default ReceiptInfo;
