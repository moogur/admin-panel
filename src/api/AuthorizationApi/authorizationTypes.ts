import { OnlyId } from '@shared/types';

export interface LoginAdmin {
  username: string;
  password: string;
}

export interface Admin extends OnlyId {
  username: string;
  email: string | null;
}

export interface UpdateAdminBody extends Omit<Admin, 'id'> {
  password?: string;
}

export interface ServicesVersions {
  authorization: string | null;
}

export interface ServicesIps extends ServicesVersions {
  server: string | null;
}
