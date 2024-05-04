import { Container, Nav, Navbar, Table } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../service/store/index.types';
import { openModal } from '../../service/slices/modal';
import { ModalType } from '../../service/slices/modal/index.types';
import ModalSwitch from '../../components/modal_switch';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';
import { getUsersThunk } from '../../service/slices/users';
import Spinner from 'react-bootstrap/Spinner';

export default function Users() {
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  const userList = users.map(({ _id, name, passport, role, email }) => {
    return (
      <tr key={_id} onClick={() => {}}>
        <td style={{ cursor: 'pointer' }}>
          <Form.Check type="radio" name="receipt" readOnly></Form.Check>
        </td>
        <td style={{ cursor: 'pointer' }}>{name}</td>
        <td style={{ cursor: 'pointer' }}>{role}</td>
        <td style={{ cursor: 'pointer' }}>{email}</td>
        <td style={{ cursor: 'pointer' }}>{passport}</td>
      </tr>
    );
  });

  return loading ? (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Spinner />
    </div>
  ) : (
    users && (
      <>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <Nav.Link
                  onClick={() => {
                    dispatch(openModal(ModalType.USER));
                  }}>
                  Добавить
                </Nav.Link>
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
              <th style={{ textAlign: 'center' }}>Имя</th>
              <th style={{ textAlign: 'center' }}>Доступ</th>
              <th style={{ textAlign: 'center' }}>Электронная почта</th>
              <th style={{ textAlign: 'center' }}>Пасспортные данные</th>
            </tr>
          </thead>
          <tbody>{userList}</tbody>
        </Table>
        <ModalSwitch />
      </>
    )
  );
}
