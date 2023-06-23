import { OnlyId, RequestConfig, RequestConfigWithAbortSignal, SecretKeysEnum } from '@shared/types';

import { BaseApiService } from '../baseApi';
import { AUTHORIZATION_BASEURL } from '../baseUrls';

import { Admin, LoginAdmin, ServicesVersions, UpdateAdminBody } from './authorizationTypes';

export class AuthorizationService extends BaseApiService {
  constructor() {
    super({ baseUrl: AUTHORIZATION_BASEURL });
  }

  public adminLogin = (config: RequestConfigWithAbortSignal<LoginAdmin>): Promise<Admin> =>
    this.request({
      method: 'POST',
      url: '/admin/login',
      ...config,
    });

  public adminLogout = (config: RequestConfigWithAbortSignal<undefined>): Promise<OnlyId> =>
    this.request({
      method: 'POST',
      url: '/admin/logout',
      ...config,
    });

  public getAdminInfo = (config: RequestConfigWithAbortSignal<undefined>): Promise<Admin> =>
    this.request({
      method: 'GET',
      url: '/admin',
      ...config,
    });

  public updateSecret = (config: RequestConfig<{ type: SecretKeysEnum }>): Promise<{ status: true }> =>
    this.request({
      method: 'PUT',
      url: '/secretOrToken',
      ...config,
    });

  public updateAdminInfo = (config: RequestConfig<UpdateAdminBody>): Promise<Admin> =>
    this.request({
      method: 'PATCH',
      url: '/admin',
      ...config,
    });

  public getServicesVersions = (config: RequestConfigWithAbortSignal<undefined>): Promise<ServicesVersions> =>
    this.request({
      method: 'GET',
      url: '/info/servicesVersions',
      ...config,
    });
}
