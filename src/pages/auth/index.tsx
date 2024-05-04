import { Button } from 'react-bootstrap';
import styles from './index.module.css';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../service/store/index.types';
import { getUsersThunk } from '../../service/slices/users';

const Auth = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((store) => store.users);

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  const selectOptions = users.map((user) => {
    return (
      <option key={user._id} value={user.name}>
        {user.name} {user.role}
      </option>
    );
  });

  return (
    <>
      <div className={styles.wrapper}>Добро пожаловать в Сферу - программу для работы с ЭДО.</div>
      <Form className={styles.form}>
        <h1 className={styles.title}>Пожалуйста авторизуйтесь:</h1>
        <Form.Group className={styles.group}>
          <Form.Label htmlFor="inputPassword5">Логин:</Form.Label>
          <Form.Select
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            htmlSize={1}
            size="sm">
            <option hidden value="default">
              Выберите аккаунт
            </option>
            {selectOptions}
          </Form.Select>
        </Form.Group>
        <Form.Group className={styles.group}>
          <Form.Label htmlFor="inputPassword">Пароль:</Form.Label>
          <Form.Control
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            id="inputPassword"
          />
          <Form.Text id="passwordHelpBlock" muted>
            Ваш пароль должен быть длиной от 8 до 20 символов, содержать буквы и цифры, и не должен
            содержать пробелов, специальных символов или эмодзи.
          </Form.Text>
        </Form.Group>
        <Button>Войти</Button>
      </Form>
    </>
  );
};

export default Auth;
