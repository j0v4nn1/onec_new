import { Container, Nav, Navbar, Table } from 'react-bootstrap';
import { nomenclature as parts } from '../data';

const Nomenclature = () => {
  const tables = parts.map(({ id, nomenclature, quantity, unit, price }) => {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{nomenclature}</td>
        <td>{quantity}</td>
        <td>{unit}</td>
        <td>{price}</td>
        <td>{price * quantity}</td>
      </tr>
    );
  });

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
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
            <th>Номер</th>
            <th>Номенклатура</th>
            <th>Количество</th>
            <th>Единица измерения</th>
            <th>Цена</th>
            <th>Сумма</th>
          </tr>
        </thead>
        <tbody>{tables}</tbody>
      </Table>
    </>
  );
};

export default Nomenclature;
