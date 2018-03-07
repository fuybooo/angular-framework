import { Injectable } from '@angular/core';
import {DataService} from '../core/data.service';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../core/core.service';
import {MessageService} from '../core/message.service';

const loginInfoKey = '__loginInfoKey__';
@Injectable()
export class LoginService {
  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private coreService: CoreService,
    private messageService: MessageService
  ) { }
  static saveLoginInfo(data) {
    localStorage.setItem(loginInfoKey, JSON.stringify(data));
  }
  static getLoginInfo() {
    return JSON.parse(localStorage.getItem(loginInfoKey));
  }
  static isAdmin() {
    const loginInfo = LoginService.getLoginInfo();
    return loginInfo && loginInfo.result.role === 2;
  }
  login(params) {
    return this.http.post(this.dataService.urls.login, params);
  }
}
