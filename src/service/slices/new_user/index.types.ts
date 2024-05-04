import { Role } from 'components/navbar/index.types';

export type User = {
  name: string;
  email: string;
  password: string;
  passport: string;
  role: string;
};

export type AuthUserState = Omit<User, 'role'> & {
  accessToken: string;
  role: Role | null;
};
