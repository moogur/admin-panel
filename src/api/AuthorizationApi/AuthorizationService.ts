import { OnlyId, RequestConfigForProperties, SecretKeysEnum, SuccessResult } from '@shared/types';

import { BaseApiService } from '../baseApi';
import { AUTHORIZATION_BASE_URL } from '../baseUrls';
import { headersForImage } from '../utils';

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
  CreateUser,
  UpdateUser,
  LanguageDictionary,
  AddLanguageDictionary,
  DeleteLanguageDictionary,
  UpdateLanguageDictionary,
  GetLocalizationMessages,
  GetDefaultMessages,
} from './authorizationTypes';

export class AuthorizationService extends BaseApiService {
  constructor() {
    super({ baseUrl: AUTHORIZATION_BASE_URL });
  }

  public adminLogin = (config: RequestConfigForProperties<LoginAdmin>): Promise<Admin> =>
    this.request({
      method: 'POST',
      url: '/admin/login',
      ...config,
    });

  public adminLogout = (config: RequestConfigForProperties): Promise<OnlyId> =>
    this.request({
      method: 'POST',
      url: '/admin/logout',
      ...config,
    });

  public getAdminInfo = (config: RequestConfigForProperties): Promise<Admin> =>
    this.request({
      method: 'GET',
      url: '/admin',
      ...config,
    });

  public updateSecret = (config: RequestConfigForProperties<{ type: SecretKeysEnum }>): Promise<{ status: true }> =>
    this.request({
      method: 'PUT',
      url: '/secretOrToken',
      ...config,
    });

  public updateAdminInfo = (config: RequestConfigForProperties<UpdateAdminBody>): Promise<Admin> =>
    this.request({
      method: 'PATCH',
      url: '/admin',
      ...config,
    });

  public getServicesVersions = (config: RequestConfigForProperties): Promise<ServicesVersions> =>
    this.request({
      method: 'GET',
      url: '/info/servicesVersions',
      ...config,
    });

  public changeAvatar = (config: RequestConfigForProperties<FormData>): Promise<SuccessResult> =>
    this.request({
      method: 'PUT',
      url: '/admin/avatar',
      headers: {
        Accept: 'application/json; charset=utf-8',
      },
      ...config,
    });

  public getAvatar = (config: RequestConfigForProperties): Promise<string> =>
    this.request<File>({
      method: 'GET',
      url: '/admin/avatar',
      convertResponse: 'blob',
      headers: headersForImage,
      ...config,
    }).then(this.convertFileToUrl);

  public getClientIp = (config: RequestConfigForProperties): Promise<{ ip: string | null }> =>
    this.request({
      method: 'GET',
      url: '/info/clientIp',
      ...config,
    });

  public getServicesIps = (config: RequestConfigForProperties): Promise<ServicesIps> =>
    this.request({
      method: 'GET',
      url: '/info/servicesIps',
      ...config,
    });

  public getUsers = (
    config: RequestConfigForProperties<undefined, undefined, GetUsersQuery>,
  ): Promise<UsersWithPagination> =>
    this.request({
      method: 'GET',
      url: '/users',
      ...config,
    });

  public getUserInfo = (config: RequestConfigForProperties<undefined, OnlyId>): Promise<User> =>
    this.request({
      method: 'GET',
      url: `/users/${config?.urlParameters.id}`,
      ...config,
    });

  public deleteUsers = (config: RequestConfigForProperties<undefined, undefined, DeleteUsers>): Promise<DeleteUsers> =>
    this.request({
      method: 'DELETE',
      url: '/users',
      ...config,
    });

  public restoreUsers = (config: RequestConfigForProperties<undefined, undefined, DeleteUsers>): Promise<DeleteUsers> =>
    this.request({
      method: 'PATCH',
      url: '/users',
      ...config,
    });

  public createUser = (config: RequestConfigForProperties<CreateUser>): Promise<User> =>
    this.request({
      method: 'POST',
      url: '/users',
      ...config,
    });

  public updateUser = (config: RequestConfigForProperties<UpdateUser, OnlyId>): Promise<User> =>
    this.request({
      method: 'PATCH',
      url: `/users/${config.urlParameters.id}`,
      ...config,
    });

  public getLanguageDictionary = (config: RequestConfigForProperties): Promise<LanguageDictionary[]> =>
    this.request({
      method: 'GET',
      url: '/languageDictionary',
      ...config,
    });

  public addLanguageToDictionary = (
    config: RequestConfigForProperties<AddLanguageDictionary>,
  ): Promise<LanguageDictionary> =>
    this.request({
      method: 'POST',
      url: '/languageDictionary',
      ...config,
    });

  public updateLanguageInDictionary = (
    config: RequestConfigForProperties<UpdateLanguageDictionary, OnlyId>,
  ): Promise<LanguageDictionary> =>
    this.request({
      method: 'PUT',
      url: `/languageDictionary/${config.urlParameters.id}`,
      ...config,
    });

  public deleteLanguageFromDictionary = (
    config: RequestConfigForProperties<undefined, DeleteLanguageDictionary>,
  ): Promise<SuccessResult> =>
    this.request({
      method: 'DELETE',
      url: `/languageDictionary/${config.urlParameters.code}`,
      ...config,
    });

  public getDefaultMessages = (
    config: RequestConfigForProperties<undefined, GetDefaultMessages>,
  ): Promise<Record<string, string>> =>
    this.request({
      method: 'GET',
      url: `/localization/${config.urlParameters.service}`,
      ...config,
    });

  public getLocalizationMessages = (
    config: RequestConfigForProperties<undefined, GetLocalizationMessages>,
  ): Promise<Record<string, string>> =>
    this.request({
      method: 'GET',
      url: `/localization/${config.urlParameters.service}/${config.urlParameters.code}`,
      ...config,
    });

  public updateLocalizationMessages = (
    config: RequestConfigForProperties<FormData, GetLocalizationMessages>,
  ): Promise<SuccessResult> =>
    this.request({
      method: 'PUT',
      url: `/localization/${config.urlParameters.service}/${config.urlParameters.code}`,
      headers: {
        Accept: 'application/json; charset=utf-8',
      },
      ...config,
    });

  public deleteTranslation = (
    config: RequestConfigForProperties<undefined, GetLocalizationMessages>,
  ): Promise<SuccessResult> =>
    this.request({
      method: 'DELETE',
      url: `/localization/${config.urlParameters.service}/${config.urlParameters.code}`,
      ...config,
    });
}
