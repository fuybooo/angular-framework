import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

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
  }

}
