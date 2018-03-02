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
  postUsers(params) {
    return this.http.post(this.dataService.urls.users, params);
  }
  saveUser(params) {
    return this.http.post(this.dataService.urls.save_user, params);
  }
  delUser(params) {
    return this.http.post(this.dataService.urls.del_user, params);
  }
  getUsers(params) {
    return this.http.get(this.dataService.urls.users, this.dataService.getWholeParams(params));
  }
}
