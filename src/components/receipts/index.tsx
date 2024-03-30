import { Container, Nav, Navbar, Table } from 'react-bootstrap';
import { getReceipts } from '../../service/slices/receipts';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'service/store/index.types';
import Spinner from 'react-bootstrap/Spinner';
import styles from './index.module.css';

const Receipts = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getReceipts());
  }, []);

  const receipts = useAppSelector((store) => store.receipts.receipts);
  const loading = useAppSelector((store) => store.receipts.loading);
  const tables = receipts.map(
    ({ number, date, vendor, author, type, total, store, time, invoice }) => {
      return (
        <tr key={number}>
          <td>{date}</td>
          <td>{type}</td>
          <td>{number}</td>
          <td>
            {invoice} от {date}
          </td>
          <td>{vendor}</td>
          <td>{store}</td>
          <td>{total}</td>
          <td>{author}</td>
          <td>{time}</td>
        </tr>
      );
    }
  );

  function BasicExample() {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return loading ? (
    <div className={styles.wrapper}>{BasicExample()}</div>
  ) : (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link>Добавить</Nav.Link>
              <Nav.Link>Удалить</Nav.Link>
              <Nav.Link href="#" disabled>
                Изменить
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Документ</th>
            <th>Номер</th>
            <th>СФ</th>
            <th>Поставщик</th>
            <th>Место хранения</th>
            <th>Всего</th>
            <th>Автор</th>
            <th>Время</th>
          </tr>
        </thead>
        <tbody>{tables}</tbody>
      </Table>
    </>
  );
};

export default Receipts;
