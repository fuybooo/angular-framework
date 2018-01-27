import { Injectable } from '@angular/core';
import {DataService} from '../core/data.service';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../core/core.service';
import {MessageService} from '../core/message.service';

@Injectable()
export class LoginService {

  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private coreService: CoreService,
    private messageService: MessageService
  ) { }
  login(params) {
    return this.http.post(this.dataService.urls.login, params);
  }
}
