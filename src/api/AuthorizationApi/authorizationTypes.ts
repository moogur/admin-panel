import { OnlyId } from '@shared/types';

export interface LoginAdmin {
  username: string;
  password: string;
}

export interface Admin extends OnlyId {
  username: string;
  email: string;
}