import { Injectable } from '@angular/core';
import {DataService} from '../../core/data.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(
    private dataService: DataService,
    private http: HttpClient
  ) { }
  getUserList(params, callback) {
    this.http.get(this.dataService.urls.user_list, this.dataService.getWholeParams(params)).subscribe((res: any) => {
      callback(res);
    });
  }
}
