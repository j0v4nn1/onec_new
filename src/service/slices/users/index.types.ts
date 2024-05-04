import { User } from '../new_user/index.types';

export type UsersState = {
  request: boolean;
  loading: boolean;
  failed: boolean;
  users: UserWithTokens[];
};

export type UserWithTokens = Omit<User, 'password'> & {
  _id: string;
  accessToken: string;
  refreshToken: string;
};
