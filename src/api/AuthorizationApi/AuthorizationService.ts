import { OnlyId, RequestConfig, RequestConfigWithAbortSignal, SecretKeysEnum } from '@shared/types';

import { BaseApiService } from '../baseApi';
import { AUTHORIZATION_BASEURL } from '../baseUrls';

import { Admin, LoginAdmin, UpdateAdminBody } from './authorizationTypes';

export class AuthorizationService extends BaseApiService {
  constructor() {
    super({ baseUrl: AUTHORIZATION_BASEURL });
  }

  public adminLogin = (config: RequestConfigWithAbortSignal<LoginAdmin>): Promise<Admin> =>
    this.request({
      method: 'post',
      url: '/admin/login',
      ...config,
    });

  public adminLogout = (config: RequestConfigWithAbortSignal<undefined>): Promise<OnlyId> =>
    this.request({
      method: 'post',
      url: '/admin/logout',
      ...config,
    });

  public getAdminInfo = (config: RequestConfigWithAbortSignal<undefined>): Promise<Admin> =>
    this.request({
      method: 'get',
      url: '/admin',
      ...config,
    });

  public updateSecret = (config: RequestConfig<{ type: SecretKeysEnum }>): Promise<{ status: true }> =>
    this.request({
      method: 'put',
      url: '/secretOrToken',
      ...config,
    });

  public updateAdminInfo = (config: RequestConfig<UpdateAdminBody>): Promise<Admin> =>
    this.request({
      method: 'patch',
      url: '/admin',
      ...config,
    });
}
