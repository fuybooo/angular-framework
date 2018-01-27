import {EventEmitter, Injectable} from '@angular/core';
import {DataService} from '../../core/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
  tableEvent = new EventEmitter();
  constructor(
    private dataService: DataService,
    private http: HttpClient
  ) { }
  saveUser(params) {
    return this.http.post(this.dataService.urls.save_user, params);
  }
  delUser(params) {
    return this.http.post(this.dataService.urls.del_user, params);
  }
}
