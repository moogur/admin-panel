import { OnlyId, RequestConfig } from '@shared/types';

import { BaseApiService } from '../baseApi';
import { AUTHORIZATION_BASEURL } from '../baseUrls';

import { Admin, LoginAdmin } from './authorizationTypes';

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
}
