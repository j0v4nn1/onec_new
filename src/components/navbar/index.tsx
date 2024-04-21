import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

function NavBarReact() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Сфера.Склад</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <NavLink
              className="nav-link"
              to="receipts"
              style={({ isActive }) => {
                return { fontWeight: isActive ? 'bold' : '' };
              }}>
              Поступления
            </NavLink>
            {/*<NavLink className="nav-link" to="#action2">*/}
            {/*  Перемещения*/}
            {/*</NavLink>*/}
            <NavLink
              className="nav-link"
              to="/nomenclature"
              style={({ isActive }) => {
                return { fontWeight: isActive ? 'bold' : '' };
              }}>
              Номенклатура
            </NavLink>
            <NavLink
              className="nav-link"
              style={({ isActive }) => {
                return { fontWeight: isActive ? 'bold' : '' };
              }}
              to="/orders">
              Журнал заказ-нарядов
            </NavLink>
            {/*<NavLink className="nav-link" to="#">*/}
            {/*  Счета*/}
            {/*</NavLink>*/}
            <NavDropdown title="Оперативные" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Материальная ведомость</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Отчёты</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Остатки Маркировки</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Печать реестров документов</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control type="search" placeholder="Поиск" className="me-2" aria-label="Search" />
            <Button variant="outline-success">Найти</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarReact;
