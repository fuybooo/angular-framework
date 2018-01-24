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
    this.router.navigate(['/main']);
  }
}
