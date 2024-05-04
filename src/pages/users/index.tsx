import { Container, Nav, Navbar, Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { setReceiptType } from '../../service/slices/receipts';
import { ReceiptType } from '../../service/slices/receipts/index.types';

export default function AdminPanel() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <NavLink className="nav-link" to="./add">
                Добавить
              </NavLink>
              <Nav.Link>Удалить</Nav.Link>
              <Nav.Link>Изменить</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>#</th>
            <th style={{ textAlign: 'center' }}>Дата</th>
            <th style={{ textAlign: 'center' }}>Документ</th>
            <th style={{ textAlign: 'center' }}>Номер</th>
            <th style={{ textAlign: 'center' }}>СФ</th>
            <th style={{ textAlign: 'center' }}>Поставщик</th>
            <th style={{ textAlign: 'center' }}>Место хранения</th>
            <th style={{ textAlign: 'center' }}>Всего</th>
            <th style={{ textAlign: 'center' }}>Автор</th>
            <th style={{ textAlign: 'center' }}>Время</th>
          </tr>
        </thead>
      </Table>
    </>
  );
}
