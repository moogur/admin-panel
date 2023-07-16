import { OnlyId, RequestConfigForProperties, SecretKeysEnum } from '@shared/types';

import { BaseApiService } from '../baseApi';
import { AUTHORIZATION_BASEURL } from '../baseUrls';

import {
  Admin,
  LoginAdmin,
  ServicesVersions,
  UpdateAdminBody,
  ServicesIps,
  UsersWithPagination,
  GetUsersQuery,
  User,
  DeleteUsers,
} from './authorizationTypes';

export class AuthorizationService extends BaseApiService {
  constructor() {
    super({ baseUrl: AUTHORIZATION_BASEURL });
  }

  public adminLogin = (config?: RequestConfigForProperties<LoginAdmin>): Promise<Admin> =>
    this.request({
      method: 'POST',
      url: '/admin/login',
      ...config,
    });

  public adminLogout = (config?: RequestConfigForProperties): Promise<OnlyId> =>
    this.request({
      method: 'POST',
      url: '/admin/logout',
      ...config,
    });

  public getAdminInfo = (config?: RequestConfigForProperties): Promise<Admin> =>
    this.request({
      method: 'GET',
      url: '/admin',
      ...config,
    });

  public updateSecret = (config?: RequestConfigForProperties<{ type: SecretKeysEnum }>): Promise<{ status: true }> =>
    this.request({
      method: 'PUT',
      url: '/secretOrToken',
      ...config,
    });

  public updateAdminInfo = (config?: RequestConfigForProperties<UpdateAdminBody>): Promise<Admin> =>
    this.request({
      method: 'PATCH',
      url: '/admin',
      ...config,
    });

  public getServicesVersions = (config?: RequestConfigForProperties): Promise<ServicesVersions> =>
    this.request({
      method: 'GET',
      url: '/info/servicesVersions',
      ...config,
    });

  public changeAvatar = (config?: RequestConfigForProperties<FormData>): Promise<{ result: true }> =>
    this.request({
      method: 'PUT',
      url: '/admin/avatar',
      headers: {
        Accept: 'application/json; charset=utf-8',
      },
      ...config,
    });

  public getAvatar = (config?: RequestConfigForProperties): Promise<string> =>
    this.request<undefined, undefined, undefined, File>({
      method: 'GET',
      url: '/admin/avatar',
      convertResponse: 'blob',
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*',
        'Content-Type': 'application/json; charset=utf-8',
      },
      ...config,
    }).then(this.convertFileToUrl);

  public getClientIp = (config?: RequestConfigForProperties): Promise<{ ip: string | null }> =>
    this.request({
      method: 'GET',
      url: '/info/clientIp',
      ...config,
    });

  public getServicesIps = (config?: RequestConfigForProperties): Promise<ServicesIps> =>
    this.request({
      method: 'GET',
      url: '/info/servicesIps',
      ...config,
    });

  public getUsers = (
    config?: RequestConfigForProperties<undefined, undefined, GetUsersQuery>,
  ): Promise<UsersWithPagination> =>
    this.request({
      method: 'GET',
      url: '/users',
      ...config,
    });

  public getUserInfo = (config?: RequestConfigForProperties<undefined, OnlyId>): Promise<User> =>
    this.request({
      method: 'GET',
      url: `/users/${config?.urlParameters?.id}`,
      ...config,
    });

  public deleteUsers = (config?: RequestConfigForProperties<undefined, undefined, DeleteUsers>): Promise<DeleteUsers> =>
    this.request({
      method: 'DELETE',
      url: '/users',
      ...config,
    });
}
