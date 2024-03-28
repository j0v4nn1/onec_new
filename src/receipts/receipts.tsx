import { Button, Container, Nav, Navbar, Table } from 'react-bootstrap';
import { receipts } from '../data.ts';

const Receipts = () => {
  const tables = receipts.map(({ id, date, vendor, receiver, counterparty }) => {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{vendor}</td>
        <td>{counterparty}</td>
        <td>{date}</td>
        <td>{receiver}</td>
      </tr>
    );
  });

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link href="#action1">Добавить</Nav.Link>
              <Nav.Link href="#action2">Удалить</Nav.Link>
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
            <th>Номер поступления</th>
            <th>Поставщик</th>
            <th>Контрагент</th>
            <th>Дата приёмки</th>
            <th>Кто принял</th>
          </tr>
        </thead>
        <tbody>{tables}</tbody>
      </Table>
    </>
  );
};

export default Receipts;
