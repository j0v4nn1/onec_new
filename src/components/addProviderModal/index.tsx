import { Button, Col, Form, ListGroup, Modal, Row, Table } from 'react-bootstrap';
import { Props } from './index.types';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import React, { useState } from 'react';
import { addProvider } from 'service/slices/receipts';
import { Provider } from 'service/slices/general/index.types';

const AddProviderModal = ({ isProviderModalShowed, setIsProviderModalShowed }: Props) => {
  const dispatch = useAppDispatch();
  const { providers } = useAppSelector((store) => store.general);
  const [isActiveProvider, setIsActiveProvider] = useState(false);
  const [activeProvider, setActiveProvider] = useState<Provider | null>(null);
  const [activeRadioButton, setActiveRadioButton] = useState<'name' | 'taxid' | 'crr'>('name');
  const [searchInput, setSearchInput] = useState('');

  const searchResults = (filter: 'name' | 'taxid' | 'crr'): Provider[] =>
    providers.filter((p) => {
      return p[filter].toString().toLowerCase().includes(searchInput.toLowerCase());
    });

  const providersList = searchResults(activeRadioButton).map((provider) => {
    return (
      <ListGroup.Item
        onClick={() => {
          setIsActiveProvider(true);
          setActiveProvider(provider);
        }}
        action
        active={isActiveProvider && provider._id === activeProvider?._id}
        key={provider._id}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              maxWidth: '430px',
              width: '100%',
            }}>
            <div>{provider.name}</div>
            <div>{provider.taxid}</div>
          </div>
          <div>{provider.crr}</div>
        </div>
      </ListGroup.Item>
    );
  });

  const closeModal = () => {
    setIsProviderModalShowed(false);
    setActiveProvider(null);
    setIsActiveProvider(false);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActiveRadioButton(event.target.value as 'name' | 'taxid' | 'crr');
  };

  return (
    <Modal
      show={isProviderModalShowed}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Выбрать поставщика</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs="auto">
            <Form.Control
              value={searchInput}
              onChange={(event) => {
                setSearchInput(event.target.value);
              }}
              type="text"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Найти</Button>
          </Col>
          <Col
            xs="auto"
            style={{
              margin: 'auto',
              width: '100%',
              maxWidth: '450px',
            }}>
            <Form
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.Check
                checked={activeRadioButton === 'name'}
                onChange={handleOptionChange}
                value={'name'}
                id="name"
                label="Имя"
                type="radio"
                name="searchProvider"
              />
              <Form.Check
                checked={activeRadioButton === 'taxid'}
                onChange={handleOptionChange}
                value={'taxid'}
                id="taxid"
                label="ИНН"
                type="radio"
                name="searchProvider"
              />
              <Form.Check
                checked={activeRadioButton === 'crr'}
                onChange={handleOptionChange}
                value={'crr'}
                id="crr"
                label="КПП"
                type="radio"
                name="searchProvider"
              />
            </Form>
          </Col>
        </Row>
        <Table className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Имя</th>
              <th style={{ textAlign: 'center' }}>ИНН</th>
              <th style={{ textAlign: 'center' }}>КПП</th>
            </tr>
          </thead>
        </Table>
        <ListGroup className="mt-3">{providersList}</ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={closeModal}>Закрыть</Button>
        <Button
          onClick={() => {
            activeProvider && dispatch(addProvider(activeProvider));
            closeModal();
          }}
          disabled={!isActiveProvider}>
          Выбрать
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProviderModal;
