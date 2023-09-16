import {
  BasePagination,
  FrontendServices,
  GenderEnum,
  OnlyId,
  ResponseWithPagination,
  SomeOptional,
  UserStatusEnum,
} from '@shared/types';

export interface LoginAdmin {
  username: string;
  password: string;
}

export interface Admin extends OnlyId {
  username: string;
  email: string | null;
  hasAvatar: boolean;
}

export interface UpdateAdminBody extends Omit<Admin, 'id' | 'hasAvatar'> {
  password?: string;
}

export interface ServicesVersions {
  authorization: string | null;
}

export interface ServicesIps extends ServicesVersions {
  server: string | null;
}

export interface BaseUser extends OnlyId {
  username: string;
  email: string;
  status: UserStatusEnum;
  createdDate: string | null;
  updatedDate: string | null;
  gender: GenderEnum;
}

export interface User extends BaseUser {
  name: string | null;
  surname: string | null;
  patronymic: string | null;
  biography: string | null;
  birthDate: string | null;
}

export type UsersWithPagination = ResponseWithPagination<BaseUser>;

export type BackSortOrder = 'ASC' | 'DESC' | undefined;

export interface BackSorter<T extends string> {
  sortOrder?: BackSortOrder;
  sortField?: T;
}

export type UserSortOrderFields = keyof Omit<BaseUser, 'id'>;

export type GetUsersQuery = BasePagination & BackSorter<UserSortOrderFields>;

export interface DeleteUsers {
  ids: string[];
}

export type CreateUser = LoginAdmin & Pick<BaseUser, 'email' | 'gender'>;

export type UpdateUser = SomeOptional<CreateUser, 'password' | 'gender'>;

export interface DeleteLanguageDictionary {
  code: string;
}

export interface UpdateLanguageDictionary {
  nameEn: string;
  nameSelf?: string | null;
}

export type AddLanguageDictionary = UpdateLanguageDictionary & DeleteLanguageDictionary;

export type LanguageDictionary = OnlyId & AddLanguageDictionary;

export interface GetDefaultMessages {
  service: FrontendServices;
}

export type GetLocalizationMessages = DeleteLanguageDictionary & GetDefaultMessages;
