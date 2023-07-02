import { BasePagination, GenderEnum, OnlyId, ResponseWithPagination, UserStatusEnum } from '@shared/types';

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

export interface User {
  id: string;
  username: string;
  email: string;
  status: UserStatusEnum;
  createdDate: string | null;
  updatedDate: string | null;
  gender: GenderEnum;
}

export type UsersWithPagination = ResponseWithPagination<User>;

export type BackSortOrder = 'ASC' | 'DESC' | undefined;

export interface BackSorter<T extends string> {
  sortOrder?: BackSortOrder;
  sortField?: T;
}

export type UserSortOrderFields = keyof Omit<User, 'id'>;

export type GetUsersQuery = BasePagination & BackSorter<UserSortOrderFields>;
