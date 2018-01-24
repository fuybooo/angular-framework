import { Injectable } from '@angular/core';
import {DataService} from '../core/data.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../core/core.service';
import {HttpRes} from '../core/core.model';
import {MessageService} from '../core/message.service';

@Injectable()
export class LoginService {

  constructor(
    private dataService: DataService,
    private router: Router,
    private http: HttpClient,
    private coreService: CoreService,
    private messageService: MessageService
  ) { }
  login() {
    this.http.post(this.dataService.urls.login, {
      username: 'admin',
      password: 'adminA',
      lng: this.coreService.getLng()
    }).subscribe((res: HttpRes) => {
      if (res.code === '200') {
        console.log('登录成功!');
        this.router.navigate(['/main']);
      } else {
        this.messageService.error(res.msg);
      }
    });
  }
}
