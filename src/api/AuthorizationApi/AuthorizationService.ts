import { OnlyId, RequestConfig, SecretKeysEnum } from '@shared/types';

import { BaseApiService } from '../baseApi';
import { AUTHORIZATION_BASEURL } from '../baseUrls';

import { Admin, LoginAdmin, UpdateAdminBody } from './authorizationTypes';

export class AuthorizationService extends BaseApiService {
  constructor() {
    super(AUTHORIZATION_BASEURL);
  }

  public adminLogin(config: RequestConfig<LoginAdmin>): Promise<Admin> {
    return this.request({
      method: 'post',
      url: 'admin/login',
      ...config,
    });
  }

  public adminLogout(): Promise<OnlyId> {
    return this.request({
      method: 'get',
      url: 'admin/logout',
    });
  }

  public getAdminInfo(): Promise<Admin> {
    return this.request({
      method: 'get',
      url: 'admin',
    });
  }

  public updateSecret(config: RequestConfig<{ status: SecretKeysEnum }>): Promise<OnlyId> {
    return this.request({
      method: 'put',
      url: 'secretOrToken',
      ...config,
    });
  }

  public updateAdminInfo(config: RequestConfig<UpdateAdminBody>): Promise<OnlyId> {
    return this.request({
      method: 'patch',
      url: 'admin',
      ...config,
    });
  }
}
