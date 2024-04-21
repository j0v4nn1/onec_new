import { Props } from './index.types';
import { Button, Col, Modal, Row, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../service/store/index.types';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import { Product } from '../../service/slices/general/index.types';
import { v4 as uuid } from 'uuid';
import { setProduct } from '../../service/slices/receipts';

const AddProductToReceipt = ({ isProductListModalShowed, setIsProductListModalShowed }: Props) => {
  const closeModal = () => setIsProductListModalShowed(false);
  const { products } = useAppSelector((state) => state.general);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const dispatch = useAppDispatch();
  const addProductHandler = () => {
    const uniqueListId = uuid();
    activeProduct &&
      dispatch(
        setProduct({
          ...activeProduct,
          uniqueListId,
        })
      );
  };
  const productList = products.map((product) => {
    return (
      <tr style={{ cursor: 'pointer' }} key={product._id} onClick={() => setActiveProduct(product)}>
        <td>
          <Form.Check
            readOnly
            checked={activeProduct?._id === product._id}
            type="radio"
            name="product"
          />
        </td>
        <td>{product.sku}</td>
        <td>{product.name}</td>
        <td>{product.brand.name}</td>
        <td>{product.unit}</td>
      </tr>
    );
  });
  return (
    <Modal
      show={isProductListModalShowed}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Выбрать товар</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ overflow: 'hidden', overflowY: 'scroll', height: '450px' }}>
        <Row className="mb-3">
          <Col xs="auto">
            <Form.Control type="text" className=" mr-sm-2" />
          </Col>
          <Col xs="auto">
            <Button type="submit">Найти</Button>
          </Col>
        </Row>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Товар</th>
              <th>Наименование</th>
              <th>Брэнд</th>
              <th>Ед. изм.</th>
            </tr>
          </thead>
          <tbody>{productList}</tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={addProductHandler}>Добавить</Button>
        <Button onClick={closeModal}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductToReceipt;
