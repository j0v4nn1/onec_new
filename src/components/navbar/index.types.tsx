export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_USER = 'superuser',
}

export type Payload<T> = {
  key: keyof typeof<T>;
  value: string | Role;
};

export type NavbarProps = {
  role: Role;
};
