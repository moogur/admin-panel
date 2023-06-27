import { OnlyId, RequestConfigForProperties, SecretKeysEnum } from '@shared/types';

import { BaseApiService } from '../baseApi';
import { AUTHORIZATION_BASEURL } from '../baseUrls';

import { Admin, LoginAdmin, ServicesVersions, UpdateAdminBody } from './authorizationTypes';

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
    this.request<undefined, File>({
      method: 'GET',
      url: '/admin/avatar',
      convertResponse: 'blob',
      headers: {
        Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*',
        'Content-Type': 'application/json; charset=utf-8',
      },
      ...config,
    }).then(this.convertFileToUrl);
}
