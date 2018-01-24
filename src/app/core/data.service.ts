import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class DataService {
  urls;
  constructor() {
    let path = environment.apiPath;
    const localStorage_pathKey = '_apiPath_';
    const localStorage_apiPath = localStorage.getItem(localStorage_pathKey);
    if (environment.apiPathChangeable && localStorage && localStorage_apiPath) {
      environment.apiPath = path = localStorage_apiPath;
      console.log('apiPath changed:', localStorage_apiPath);
    }
    this.urls = {
      login: '/login',
      dashboard: '/dashboard',
      settings: '/settings'
    };
    for (const url in this.urls) {
      if (this.urls.hasOwnProperty(url)) {
        if (environment.isStatic) {
          this.urls[url] = './assets/mock' + this.urls[url] + '.json';
        } else {
          this.urls[url] = path + this.urls[url];
        }
      }
    }
  }
  /**
   * 将参数对象转化为查询参数
   */
  public getParams(paramsObject): HttpParams {
    let params = new HttpParams();
    for (const p in paramsObject) {
      if (paramsObject.hasOwnProperty(p)) {
        if (paramsObject[p] !== null) {
          let value = paramsObject[p];
          if (typeof value === 'string') {
            value = value.trim();
          }
          params = params.set(p, value);
        }
      }
    }
    return params;
  }
  /**
   * 将参数对象转化为查询参数
   */
  public getWholeParams(paramsObject) {
    return {params: this.getParams(paramsObject)};
  }
}
